from crewai import Agent, Task, Crew, LLM


llm = LLM(
    model="ollama/llama3",
    base_url="http://127.0.0.1:11434"
)


analysis_agent = Agent(
    role="Threat Analysis Agent",
    goal="Analyze cybersecurity threats from Windows security logs.",
    backstory="Expert SOC analyst specialized in Windows event log threat detection.",
    verbose=True,
    llm=llm
)


def get_threat_context(threat_text):
    threat = threat_text.lower()

    if "privilege" in threat:
        return {
            "event_id": "4672",
            "expected_tactic": "Privilege Escalation",
            "expected_technique": "T1078 - Valid Accounts",
            "summary_hint": "Special privileges were assigned to a user logon session, which may indicate privilege escalation or administrative account misuse.",
            "action_hint": "Review the privileged account, verify whether the logon was authorized, audit administrative group membership, and monitor Windows Security Event ID 4672."
        }

    if "powershell" in threat:
        return {
            "event_id": "4104",
            "expected_tactic": "Execution",
            "expected_technique": "T1059.001 - PowerShell",
            "summary_hint": "A PowerShell script execution event was detected, which may indicate script-based execution, automation abuse, or malicious command activity.",
            "action_hint": "Review the PowerShell script block, verify the executing user and process, restrict unauthorized PowerShell usage, and monitor Windows PowerShell Event ID 4104."
        }

    if "failed login" in threat or "login" in threat:
        return {
            "event_id": "4625",
            "expected_tactic": "Credential Access",
            "expected_technique": "T1110 - Brute Force",
            "summary_hint": "A failed login attempt was detected and may indicate credential guessing, brute-force activity, or unauthorized access attempts.",
            "action_hint": "Investigate the source account and IP, enforce MFA, review account lockout policy, and monitor Windows Security Event ID 4625."
        }

    return {
        "event_id": "Unknown",
        "expected_tactic": "Discovery",
        "expected_technique": "T1087 - Account Discovery",
        "summary_hint": "A suspicious Windows security event was detected and requires analyst review.",
        "action_hint": "Review the related Windows event details, validate user activity, and escalate if unauthorized behavior is confirmed."
    }


def analyze_threat(threat_text):
    context = get_threat_context(threat_text)

    task = Task(
        description=f"""
You are a cybersecurity SOC analyst.

Analyze this Windows security threat:

Threat: {threat_text}
Windows Event ID: {context["event_id"]}

Important:
- Do NOT reuse failed-login analysis unless the threat is actually a failed login.
- Match the summary, MITRE tactic, MITRE technique, and recommended action to the given threat type.
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include explanation outside JSON.

Expected threat-specific guidance:
- MITRE tactic should be: {context["expected_tactic"]}
- MITRE technique should be: {context["expected_technique"]}
- Summary should be based on: {context["summary_hint"]}
- Recommended action should be based on: {context["action_hint"]}

Return JSON exactly in this structure:

{{
  "threat": "{threat_text}",
  "severity": "High",
  "risk_score": 85,
  "summary": "{context["summary_hint"]}",
  "mitre_tactic": "{context["expected_tactic"]}",
  "mitre_technique": "{context["expected_technique"]}",
  "confidence": 90,
  "recommended_action": "{context["action_hint"]}",
  "safety_status": "Suspicious"
}}
""",
        expected_output="Valid JSON only.",
        agent=analysis_agent
    )

    crew = Crew(
        agents=[analysis_agent],
        tasks=[task],
        verbose=True
    )

    result = crew.kickoff()

    return str(result)