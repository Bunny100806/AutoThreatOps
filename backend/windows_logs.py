import win32evtlog

def read_security_logs():

    server = 'localhost'
    log_type = 'Security'

    hand = win32evtlog.OpenEventLog(server, log_type)

    flags = (
        win32evtlog.EVENTLOG_BACKWARDS_READ |
        win32evtlog.EVENTLOG_SEQUENTIAL_READ
    )

    alerts = []

    total = 0

    while True:

        events = win32evtlog.ReadEventLog(hand, flags, 0)

        if not events:
            break

        for event in events:

            event_id = event.EventID & 0xFFFF

            if event_id == 4625:

                alerts.append({
                    "id": event.RecordNumber,
                    "threat": "Failed Login Attempt",
                    "severity": "High",
                    "source": "Windows Security Log",
                    "status": "Detected"
                })

                total += 1

                if total >= 10:
                    return alerts

    return alerts