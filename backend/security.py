failed_attempts = {}

def track_failed_login(username):

    if username not in failed_attempts:
        failed_attempts[username] = 0

    failed_attempts[username] += 1

    return failed_attempts[username]

def reset_failed_attempts(username):

    failed_attempts[username] = 0

def detect_bruteforce(username):

    attempts = failed_attempts.get(username, 0)

    return attempts >= 3