import asyncio
import json
import re
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from windows_logs import read_security_logs
from database import SessionLocal, engine
from models import Base, User, ThreatLog
from auth import hash_password, verify_password
from ai_agents import analyze_threat

from security import (
    track_failed_login,
    reset_failed_attempts,
    detect_bruteforce,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AutoThreatOps API")

analysis_lock = asyncio.Lock()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


def extract_json_from_ai(text: str):
    try:
        return json.loads(text)
    except Exception:
        pass

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        try:
            return json.loads(match.group(0))
        except Exception:
            pass

    return {
        "threat": "Unknown Threat",
        "severity": "High",
        "risk_score": 75,
        "summary": text,
        "mitre_tactic": "Credential Access",
        "mitre_technique": "T1110 - Brute Force",
        "confidence": 70,
        "recommended_action": "Investigate suspicious activity and apply defensive controls.",
        "safety_status": "Suspicious",
    }


def normalize_int(value, default=0):
    try:
        return int(value)
    except Exception:
        return default


def normalize_severity(value):
    severity = str(value or "High").strip().capitalize()

    if severity not in ["Low", "Medium", "High", "Critical"]:
        return "High"

    return severity


def threat_to_dict(threat):
    return {
        "id": threat.id,
        "threat": threat.threat,
        "summary": threat.summary,
        "analysis": threat.summary,
        "severity": threat.severity,
        "risk_score": threat.risk_score,
        "verification_status": "Verified",
        "recommended_action": threat.recommended_action,
        "safety_status": threat.safety_status,
        "mitre_tactic": threat.mitre_tactic,
        "mitre_technique": threat.mitre_technique,
        "confidence": threat.confidence,
        "source": threat.source,
        "event_id": threat.event_id,
        "created_at": (
            threat.created_at.isoformat()
            if threat.created_at
            else None
        ),
    }


@app.get("/")
def home():
    return {
        "message": "AutoThreatOps Backend Running",
        "status": "online",
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "AutoThreatOps",
        "model": "llama3",
        "database": "sqlite",
        "monitoring": "windows-security-events",
    }


@app.get("/analyze")
async def analyze():
    if analysis_lock.locked():
        raise HTTPException(
            status_code=429,
            detail="AI analysis already running. Please wait.",
        )

    async with analysis_lock:
        db = SessionLocal()

        try:
            alerts = read_security_logs()

            # Analyze up to 5 detected event categories.
            alerts = alerts[:5]

            results = []

            for alert in alerts:
                threat_name = alert.get(
                    "threat",
                    "Unknown Threat",
                )

                source = alert.get(
                    "source",
                    "Windows Security Log",
                )

                event_id = str(
                    alert.get(
                        "event_id",
                        "Unknown",
                    )
                )

                raw_ai_result = await asyncio.wait_for(
                    asyncio.to_thread(
                        analyze_threat,
                        threat_name,
                    ),
                    timeout=240,
                )

                parsed_ai = extract_json_from_ai(
                    str(raw_ai_result)
                )

                risk_score = normalize_int(
                    parsed_ai.get("risk_score"),
                    75,
                )

                confidence = normalize_int(
                    parsed_ai.get("confidence"),
                    70,
                )

                severity = normalize_severity(
                    parsed_ai.get(
                        "severity",
                        alert.get("severity", "High"),
                    )
                )

                threat_log = ThreatLog(
                    threat=threat_name,
                    severity=severity,
                    risk_score=risk_score,
                    summary=parsed_ai.get(
                        "summary",
                        "No AI summary available.",
                    ),
                    mitre_tactic=parsed_ai.get(
                        "mitre_tactic",
                        alert.get(
                            "mitre_tactic",
                            "Credential Access",
                        ),
                    ),
                    mitre_technique=parsed_ai.get(
                        "mitre_technique",
                        alert.get(
                            "mitre_technique",
                            "T1110 - Brute Force",
                        ),
                    ),
                    confidence=confidence,
                    recommended_action=parsed_ai.get(
                        "recommended_action",
                        "Investigate suspicious activity and apply defensive controls.",
                    ),
                    safety_status=parsed_ai.get(
                        "safety_status",
                        "Suspicious",
                    ),
                    source=source,
                    event_id=event_id,
                    created_at=datetime.now(),
                )

                db.add(threat_log)
                db.commit()
                db.refresh(threat_log)

                results.append(
                    threat_to_dict(threat_log)
                )

            return results

        except asyncio.TimeoutError:
            raise HTTPException(
                status_code=504,
                detail="AI analysis timed out.",
            )

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"AI analysis failed: {str(e)}",
            )

        finally:
            db.close()


@app.get("/threats")
def get_threats():
    db = SessionLocal()

    try:
        threats = (
            db.query(ThreatLog)
            .order_by(ThreatLog.id.desc())
            .all()
        )

        return [
            threat_to_dict(threat)
            for threat in threats
        ]

    finally:
        db.close()


@app.get("/analytics")
def analytics():
    db = SessionLocal()

    try:
        threats = (
            db.query(ThreatLog)
            .order_by(ThreatLog.id.asc())
            .all()
        )

        total_threats = len(threats)

        severity_counts = {
            "Critical": 0,
            "High": 0,
            "Medium": 0,
            "Low": 0,
        }

        for threat in threats:
            severity = normalize_severity(
                threat.severity
            )

            severity_counts[severity] += 1

        timeline = []

        for index, threat in enumerate(threats):
            timeline.append(
                {
                    "time": (
                        threat.created_at.strftime("%I:%M:%S %p")
                        if threat.created_at
                        else f"{index + 1}"
                    ),
                    "threats": index + 1,
                }
            )

        return {
            "total_threats": total_threats,
            "severity": [
                {
                    "name": "Critical",
                    "value": severity_counts["Critical"],
                },
                {
                    "name": "High",
                    "value": severity_counts["High"],
                },
                {
                    "name": "Medium",
                    "value": severity_counts["Medium"],
                },
                {
                    "name": "Low",
                    "value": severity_counts["Low"],
                },
            ],
            "timeline": timeline,
        }

    finally:
        db.close()


@app.post("/register")
def register(data: RegisterRequest):
    db = SessionLocal()

    try:
        existing_user = (
            db.query(User)
            .filter(User.username == data.username)
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Username already exists",
            )

        new_user = User(
            username=data.username,
            email=data.email,
            password=hash_password(data.password),
        )

        db.add(new_user)
        db.commit()

        return {
            "message": "User registered successfully",
        }

    finally:
        db.close()


@app.post("/login")
def login(data: LoginRequest):
    db = SessionLocal()

    try:
        user = (
            db.query(User)
            .filter(User.username == data.username)
            .first()
        )

        if not user:
            attempts = track_failed_login(
                data.username
            )

            raise HTTPException(
                status_code=401,
                detail=f"Invalid username | Attempts: {attempts}",
            )

        valid_password = verify_password(
            data.password,
            user.password,
        )

        if not valid_password:
            attempts = track_failed_login(
                data.username
            )

            if detect_bruteforce(
                data.username
            ):
                raise HTTPException(
                    status_code=403,
                    detail="Brute force attack detected",
                )

            raise HTTPException(
                status_code=401,
                detail=f"Invalid password | Attempts: {attempts}",
            )

        reset_failed_attempts(
            data.username
        )

        return {
            "message": "Login successful",
            "username": user.username,
        }

    finally:
        db.close()