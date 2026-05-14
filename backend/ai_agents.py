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


def analyze_threat(threat_text):

    task = Task(
        description=f"""
Analyze this Windows security threat:

Threat: {threat_text}

Return ONLY valid JSON.

Use this structure with realistic values:

{{
  "threat": "{threat_text}",
  "severity": "High",
  "risk_score": 85,
  "summary": "A failed login attempt was detected and may indicate credential guessing or unauthorized access attempts.",
  "mitre_tactic": "Credential Access",
  "mitre_technique": "T1110 - Brute Force",
  "confidence": 90,
  "recommended_action": "Investigate the source account and IP, enforce MFA, and monitor Windows Security Event ID 4625.",
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