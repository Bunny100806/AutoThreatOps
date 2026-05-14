from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


# =========================
# USER TABLE
# =========================

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True, index=True)

    email = Column(String, unique=True, index=True)

    password = Column(String)


# =========================
# THREAT LOG TABLE
# =========================

class ThreatLog(Base):

    __tablename__ = "threat_logs"

    id = Column(Integer, primary_key=True, index=True)

    threat = Column(String, index=True)

    severity = Column(String, index=True)

    risk_score = Column(Integer)

    summary = Column(Text)

    mitre_tactic = Column(String)

    mitre_technique = Column(String)

    confidence = Column(Integer)

    recommended_action = Column(Text)

    safety_status = Column(String)

    source = Column(String, default="Windows Security Log")

    event_id = Column(String, default="4625")

    created_at = Column(DateTime, default=datetime.utcnow)