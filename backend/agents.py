class AlertAnalysisAgent:

    def analyze(self, alert):

        threat = alert["threat"]

        if "Brute Force" in threat:
            risk = "High"

        elif "SQL Injection" in threat:
            risk = "Critical"

        elif "Port Scanning" in threat:
            risk = "Medium"

        else:
            risk = "Low"

        return {
            "id": alert["id"],
            "threat": threat,
            "risk_score": risk,
            "analysis": f"{threat} detected and analyzed successfully."
        }


class RiskAssessmentAgent:

    def assess(self, analyzed_alert):

        risk = analyzed_alert["risk_score"]

        if risk == "Critical":
            severity = 95

        elif risk == "High":
            severity = 80

        elif risk == "Medium":
            severity = 60

        else:
            severity = 30

        analyzed_alert["severity_score"] = severity

        return analyzed_alert


class VerificationAgent:

    def verify(self, assessed_alert):

        trusted_threats = [
            "Brute Force Attack",
            "SQL Injection Attempt",
            "Port Scanning Activity"
        ]

        if assessed_alert["threat"] in trusted_threats:

            assessed_alert["verification_status"] = "Verified"

        else:

            assessed_alert["verification_status"] = "Suspicious"

        return assessed_alert
    
    
class ResponsePlanningAgent:

     def respond(self, verified_alert):

        threat = verified_alert["threat"]

        if threat == "Brute Force Attack":

            action = "Block suspicious IP address and enable account lockout."

        elif threat == "SQL Injection Attempt":

            action = "Filter malicious queries and secure database endpoints."

        elif threat == "Port Scanning Activity":

            action = "Monitor scanning source and restrict suspicious traffic."

        else:

            action = "Escalate threat to security analyst."

        verified_alert["recommended_action"] = action

        return verified_alert
     
class SafetyController:

    def validate(self, response_alert):

        dangerous_keywords = [
            "delete",
            "shutdown",
            "format",
            "destroy"
        ]

        action = response_alert["recommended_action"].lower()

        unsafe = False

        for keyword in dangerous_keywords:

            if keyword in action:
                unsafe = True

        if unsafe:

            response_alert["safety_status"] = "Blocked Unsafe Action"

        else:

            response_alert["safety_status"] = "Safe"

        return response_alert