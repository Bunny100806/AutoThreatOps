AutoThreatOps: A Multi-Agent LLM Framework for Safety-Constrained Cyber Defense Automation
Overview

AutoThreatOps is an AI-powered SOC (Security Operations Center) platform that uses CrewAI multi-agent orchestration and LLM-driven cybersecurity analysis to automate Windows threat detection, risk assessment, incident response recommendations, and analytics visualization.

The platform continuously analyzes Windows Security Events, generates AI threat intelligence using Llama3 via Ollama, stores incidents in SQLite, and visualizes them through a modern React dashboard.

Features
AI-Powered Threat Analysis
CrewAI Multi-Agent Architecture
Windows Security Event Monitoring
MITRE ATT&CK Mapping
Risk Scoring System
Threat Severity Classification
Threat History Storage
Real-Time Security Analytics
Interactive React Dashboard
Login & Registration System
Brute Force Detection
SQLite Threat Database
Ollama + Llama3 Integration
FastAPI Backend APIs
Tech Stack
Backend
FastAPI
Python
CrewAI
Ollama
Llama3
SQLAlchemy
SQLite
Frontend
React.js
Tailwind CSS
Recharts
System Architecture
Windows Security Logs
        ↓
CrewAI Agents
        ↓
Llama3 (Ollama)
        ↓
Threat Analysis Engine
        ↓
SQLite Database
        ↓
React Dashboard
Project Structure
AutoThreatOps/
│
├── backend/
│   ├── main.py
│   ├── ai_agents.py
│   ├── models.py
│   ├── database.py
│   ├── security.py
│   ├── auth.py
│   ├── windows_logs.py
│   ├── requirements.txt
│   └── autothreatops.db
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── docs/
├── datasets/
└── README.md
Installation
1. Clone Repository
git clone <your-repo-url>
cd AutoThreatOps
2. Backend Setup
cd backend
python -m venv venv
Activate Virtual Environment
Windows
venv\Scripts\activate
Install Dependencies
pip install -r requirements.txt
3. Install Ollama

Download:

https://ollama.com/download
4. Pull Llama3 Model
ollama pull llama3
5. Start Ollama
ollama serve

If port 11434 is already running, Ollama is already active.

6. Start Backend Server
uvicorn main:app --reload

Backend URL:

http://127.0.0.1:8000
7. Frontend Setup
cd frontend
npm install
npm start

Frontend URL:

http://localhost:3000
API Endpoints
Health Check
GET /health
Run AI Threat Analysis
GET /analyze
Fetch Stored Threat History
GET /threats
Analytics Dashboard Data
GET /analytics
Register User
POST /register
Login User
POST /login
AI Threat Output Example
{
  "threat": "Failed Login Attempt",
  "severity": "High",
  "risk_score": 87,
  "summary": "Multiple failed authentication attempts detected.",
  "mitre_tactic": "Credential Access",
  "mitre_technique": "T1110 - Brute Force",
  "confidence": 95,
  "recommended_action": "Investigate source IP and enforce MFA.",
  "safety_status": "Suspicious"
}
Dashboard Features
Threat Monitoring
Threat History
Real-Time Analytics
Severity Distribution
Threat Timeline
Agent Status Monitoring
Security Logs
AI Recommendations
MITRE ATT&CK Mapping
Technique	Description
T1110	Brute Force
T1078	Valid Accounts
T1059	Command Execution
Future Enhancements
SIEM Integration
Live Windows Event Streaming
JWT Authentication
Role-Based Access Control
Docker Deployment
Kubernetes Deployment
Cloud Threat Intelligence
Malware Sandbox Integration
Email Alerting
SOC Automation Workflows
Authors

Developed as a Multi-Agent AI Cyber Defense Framework using CrewAI and LLM-powered security automation.

License

MIT License