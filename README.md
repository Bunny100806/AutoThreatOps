# 🛡️ AutoThreatOps
## 🤖 A Multi-Agent LLM Framework for Safety-Constrained Cyber Defense Automation

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![CrewAI](https://img.shields.io/badge/CrewAI-Multi--Agent-orange?style=for-the-badge)
![Ollama](https://img.shields.io/badge/Ollama-Llama3-purple?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightgrey?style=for-the-badge&logo=sqlite)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

---

## 🚀 Project Overview

AutoThreatOps is an AI-powered Security Operations Center (SOC) platform that combines:

🧠 Large Language Models (LLMs)

🤖 Multi-Agent Artificial Intelligence

🛡️ Cyber Threat Intelligence

📊 Security Analytics

⚡ Real-Time Windows Event Monitoring

The framework automatically collects Windows security events, analyzes threats using multiple AI agents, assigns MITRE ATT&CK mappings, generates risk scores, and provides actionable response recommendations through an interactive SOC dashboard.

---

## 🎯 Research Objectives

Modern Security Operations Centers face:

🚨 Alert Overload

⏳ Slow Incident Response

😓 Analyst Fatigue

❌ False Positives

🔍 Complex Threat Investigation

AutoThreatOps addresses these challenges through AI-driven cybersecurity automation and intelligent multi-agent collaboration.

---

## 🏗️ System Architecture

### 🔎 Threat Analysis Agent
- Analyzes security events
- Identifies suspicious behavior
- Generates threat summaries

### ⚠️ Risk Assessment Agent
- Evaluates severity levels
- Calculates risk scores
- Prioritizes incidents

### ✅ Verification Agent
- Validates AI-generated outputs
- Improves reliability
- Reduces hallucinations

### 🛠️ Response Planning Agent
- Generates mitigation recommendations
- Suggests response actions
- Supports security analysts

---

## ⚙️ Technology Stack

| Layer | Technology |
|---------|------------|
| 🖥️ Frontend | ReactJS |
| 🔗 Backend | FastAPI |
| 🤖 AI Framework | CrewAI |
| 🧠 LLM | LLaMA 3 |
| 🚀 Runtime | Ollama |
| 🗄️ Database | SQLite |
| 📈 Visualization | Recharts |
| 📋 Log Source | Windows Event Logs |

---

## ✨ Key Features

✅ Real-Time Threat Monitoring

✅ Multi-Agent AI Analysis

✅ MITRE ATT&CK Mapping

✅ Threat Verification

✅ Risk Scoring

✅ Confidence Scoring

✅ Threat Intelligence Storage

✅ Security Analytics Dashboard

✅ Threat History Management

✅ Automated Recommendations

---

## 🚨 Example Threats Detected

### 🔑 Failed Login Attempt
- Event ID: 4625
- Severity: High
- MITRE: T1110 - Brute Force

### 🔓 Privilege Escalation Indicator
- Event ID: 4672
- Severity: High
- MITRE: T1078 - Valid Accounts

### 💻 Suspicious PowerShell Execution
- Event ID: 4104
- Severity: High
- MITRE: T1059.001 - PowerShell

---

## 📂 Project Structure

```text
AutoThreatOps
│
├── backend
│   ├── main.py
│   ├── ai_agents.py
│   ├── database.py
│   ├── models.py
│   ├── windows_logs.py
│   └── autothreatops.db
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── README.md
└── requirements.txt
```

---

## ▶️ Run Locally

### 1️⃣ Start Ollama

```bash
ollama run llama3
```

### 2️⃣ Start Backend

```bash
cd backend

.\venv\Scripts\activate

uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

### 3️⃣ Start Frontend

```bash
cd frontend

npm install

npm start
```

Frontend URL:

```text
http://localhost:3000
```

---

## 📊 Research Outcomes

The proposed framework successfully:

📌 Collected Windows Security Events

📌 Performed AI-Based Threat Analysis

📌 Generated MITRE ATT&CK Mappings

📌 Assigned Risk & Confidence Scores

📌 Produced Security Recommendations

📌 Stored Threat Intelligence in SQLite

📌 Visualized Results through an Interactive SOC Dashboard

---

## 🎓 Academic Project

### 🏛️ Vistula University
**Akademia Finansów i Biznesu Vistula**

📍 Warsaw, Poland

**Department of Computer Science Engineering**

---

## 👨‍💻 Authors

### 👨‍🎓 Sai Charitharth Nadigoti
**B.Sc. Computer Engineering**

### 👨‍🎓 Ayan Shaikh
**B.Sc. Computer Engineering**

🎓 **Vistula University**  
*(Akademia Finansów i Biznesu Vistula)*

📍 **Warsaw, Poland**

---

## 🏆 Project Status

🟢 Research Completed

🟢 System Implemented

🟢 Dashboard Operational

🟢 Multi-Agent Integration Complete

🟢 Local LLM Deployment Complete

🟢 Documentation Complete

---

## 📜 License

This project was developed for academic research and educational purposes.

© 2026 AutoThreatOps Research Team