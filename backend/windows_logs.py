import win32evtlog


# =========================
# WINDOWS EVENT DEFINITIONS
# =========================

EVENT_MAP = {
    4625: {
        "threat": "Failed Login Attempt",
        "severity": "High",
        "source": "Windows Security Log",
        "mitre_tactic": "Credential Access",
        "mitre_technique": "T1110 - Brute Force",
    },
    4624: {
        "threat": "Successful Login Activity",
        "severity": "Low",
        "source": "Windows Security Log",
        "mitre_tactic": "Initial Access",
        "mitre_technique": "T1078 - Valid Accounts",
    },
    4672: {
        "threat": "Privilege Escalation Indicator",
        "severity": "High",
        "source": "Windows Security Log",
        "mitre_tactic": "Privilege Escalation",
        "mitre_technique": "T1068 - Exploitation for Privilege Escalation",
    },
    4740: {
        "threat": "Account Lockout Detected",
        "severity": "Medium",
        "source": "Windows Security Log",
        "mitre_tactic": "Credential Access",
        "mitre_technique": "T1110 - Brute Force",
    },
    4720: {
        "threat": "New User Account Created",
        "severity": "Medium",
        "source": "Windows Security Log",
        "mitre_tactic": "Persistence",
        "mitre_technique": "T1136 - Create Account",
    },
    4688: {
        "threat": "Suspicious Process Execution",
        "severity": "Medium",
        "source": "Windows Security Log",
        "mitre_tactic": "Execution",
        "mitre_technique": "T1059 - Command and Scripting Interpreter",
    },
}


POWERSHELL_EVENT_MAP = {
    4104: {
        "threat": "Suspicious PowerShell Script Execution",
        "severity": "High",
        "source": "Windows PowerShell Operational Log",
        "mitre_tactic": "Execution",
        "mitre_technique": "T1059.001 - PowerShell",
    }
}


# =========================
# READ EVENT LOG
# =========================

def read_event_log(log_type, event_map, max_events=10):

    server = "localhost"

    alerts = []

    try:
        hand = win32evtlog.OpenEventLog(
            server,
            log_type
        )

        flags = (
            win32evtlog.EVENTLOG_BACKWARDS_READ |
            win32evtlog.EVENTLOG_SEQUENTIAL_READ
        )

        while True:

            events = win32evtlog.ReadEventLog(
                hand,
                flags,
                0
            )

            if not events:
                break

            for event in events:

                event_id = event.EventID & 0xFFFF

                if event_id in event_map:

                    rule = event_map[event_id]

                    alerts.append(
                        {
                            "id": event.RecordNumber,
                            "event_id": str(event_id),
                            "threat": rule["threat"],
                            "severity": rule["severity"],
                            "source": rule["source"],
                            "mitre_tactic": rule["mitre_tactic"],
                            "mitre_technique": rule["mitre_technique"],
                            "status": "Detected",
                        }
                    )

                    if len(alerts) >= max_events:
                        win32evtlog.CloseEventLog(hand)
                        return alerts

        win32evtlog.CloseEventLog(hand)

    except Exception as e:

        print(
            f"[Log Read Warning] Could not read {log_type}: {e}"
        )

    return alerts


# =========================
# MAIN LOG READER
# =========================

def read_security_logs():

    alerts = []

    security_alerts = read_event_log(
        "Security",
        EVENT_MAP,
        max_events=10
    )

    alerts.extend(security_alerts)

    powershell_alerts = read_event_log(
        "Microsoft-Windows-PowerShell/Operational",
        POWERSHELL_EVENT_MAP,
        max_events=5
    )

    alerts.extend(powershell_alerts)

    # Safety fallback for demo/testing if no logs are accessible
    if not alerts:

        alerts = [
            {
                "id": 1,
                "event_id": "4625",
                "threat": "Failed Login Attempt",
                "severity": "High",
                "source": "Windows Security Log",
                "mitre_tactic": "Credential Access",
                "mitre_technique": "T1110 - Brute Force",
                "status": "Fallback Demo Event",
            },
            {
                "id": 2,
                "event_id": "4672",
                "threat": "Privilege Escalation Indicator",
                "severity": "High",
                "source": "Windows Security Log",
                "mitre_tactic": "Privilege Escalation",
                "mitre_technique": "T1068 - Exploitation for Privilege Escalation",
                "status": "Fallback Demo Event",
            },
            {
                "id": 3,
                "event_id": "4104",
                "threat": "Suspicious PowerShell Script Execution",
                "severity": "High",
                "source": "Windows PowerShell Operational Log",
                "mitre_tactic": "Execution",
                "mitre_technique": "T1059.001 - PowerShell",
                "status": "Fallback Demo Event",
            },
        ]

    return alerts