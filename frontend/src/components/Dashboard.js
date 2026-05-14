import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCards from "./StatsCards";
import AgentPanel from "./AgentPanel";
import ThreatChart from "./ThreatChart";

import AnalyticsPage from "../pages/AnalyticsPage";
import ThreatsPage from "../pages/ThreatsPage";
import LogsPage from "../pages/LogsPage";
import AgentsPage from "../pages/AgentsPage";

function Dashboard() {

  const [alerts, setAlerts] = useState([]);

  const [activePage, setActivePage] = useState("dashboard");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // NORMALIZE API RESPONSE
  // =========================

  const normalizeAnalysis = (data) => {

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.alerts)) {
      return data.alerts;
    }

    if (Array.isArray(data.threats)) {
      return data.threats;
    }

    return [];
  };

  // =========================
  // FETCH STORED THREATS
  // =========================

  const fetchHistory = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/threats"
      );

      if (!response.ok) {
        throw new Error(
          `Backend returned ${response.status}`
        );
      }

      const data = await response.json();

      setAlerts(normalizeAnalysis(data));

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Could not load stored threat history."
      );
    }
  };

  // =========================
  // RUN AI ANALYSIS
  // =========================

  const runAIAnalysis = async () => {

    if (loading) return;

    try {

      setLoading(true);

      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/analyze"
      );

      if (!response.ok) {

        if (response.status === 429) {

          throw new Error(
            "AI analysis already running."
          );
        }

        throw new Error(
          `Backend returned ${response.status}`
        );
      }

      await response.json();

      await fetchHistory();

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Backend not reachable."
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    fetchHistory();

    const interval = setInterval(
      fetchHistory,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  // =========================
  // SEVERITY COLORS
  // =========================

  const getSeverityStyle = (severity) => {

    const value = String(severity || "")
      .toLowerCase();

    if (value === "critical") {
      return "text-red-400 border-red-700 bg-red-500/10";
    }

    if (value === "high") {
      return "text-orange-400 border-orange-700 bg-orange-500/10";
    }

    if (value === "medium") {
      return "text-yellow-400 border-yellow-700 bg-yellow-500/10";
    }

    if (value === "low") {
      return "text-green-400 border-green-700 bg-green-500/10";
    }

    return "text-gray-400 border-gray-700 bg-gray-500/10";
  };

  // =========================
  // RUN BUTTON
  // =========================

  const renderRunButton = () => (

    <button
      onClick={runAIAnalysis}
      disabled={loading}
      className="
        bg-red-600
        hover:bg-red-700
        disabled:bg-gray-700
        disabled:cursor-not-allowed
        text-white
        px-6
        py-3
        rounded-xl
        mb-6
        font-semibold
        transition
      "
    >

      {loading
        ? "Analyzing..."
        : "Run AI Threat Analysis"}

    </button>
  );

  // =========================
  // THREAT CARDS
  // =========================

  const renderThreatCards = () => (

    <div className="space-y-6">

      {alerts.length === 0 &&
        !loading &&
        !error && (

        <div className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-6
          text-gray-400
        ">

          No stored threat history yet.

        </div>
      )}

      {alerts.slice(0, 5).map((alert, index) => (

        <div
          key={alert.id || index}
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-6
            shadow-xl
          "
        >

          <div className="
            flex
            items-start
            justify-between
            gap-4
            mb-5
          ">

            <div>

              <h2 className="
                text-3xl
                font-bold
                text-red-500
                mb-2
              ">
                {alert.threat}
              </h2>

              <p className="text-sm text-gray-500">
                Incident ID: {alert.id || "N/A"}
              </p>

            </div>

            <div
              className={`
                px-4
                py-2
                rounded-xl
                border
                text-sm
                font-semibold
                ${getSeverityStyle(alert.severity)}
              `}
            >

              {alert.severity} Severity

            </div>

          </div>

          <p className="
            text-gray-300
            mb-6
            whitespace-pre-wrap
            leading-relaxed
          ">
            {alert.summary}
          </p>

          <div className="
            grid
            grid-cols-3
            gap-4
            mb-6
          ">

            <div className="
              bg-[#0f172a]
              border
              border-gray-800
              px-4
              py-3
              rounded-xl
            ">

              <p className="text-gray-500 text-sm">
                Risk Score
              </p>

              <p className="text-white font-semibold">
                {alert.risk_score}
              </p>

            </div>

            <div className="
              bg-[#0f172a]
              border
              border-gray-800
              px-4
              py-3
              rounded-xl
            ">

              <p className="text-gray-500 text-sm">
                Confidence
              </p>

              <p className="text-white font-semibold">
                {alert.confidence}%
              </p>

            </div>

            <div className="
              bg-[#0f172a]
              border
              border-gray-800
              px-4
              py-3
              rounded-xl
            ">

              <p className="text-gray-500 text-sm">
                Safety Status
              </p>

              <p className="text-white font-semibold">
                {alert.safety_status}
              </p>

            </div>

          </div>

          <div className="mb-6">

            <h3 className="
              text-white
              font-semibold
              mb-3
            ">
              MITRE ATT&CK Mapping
            </h3>

            <div className="flex flex-wrap gap-3">

              <span className="
                bg-red-500/10
                border
                border-red-800
                text-red-300
                px-4
                py-2
                rounded-xl
                text-sm
              ">
                {alert.mitre_tactic}
              </span>

              <span className="
                bg-red-500/10
                border
                border-red-800
                text-red-300
                px-4
                py-2
                rounded-xl
                text-sm
              ">
                {alert.mitre_technique}
              </span>

            </div>

          </div>

          <div className="
            bg-yellow-500/10
            border
            border-yellow-800
            rounded-xl
            p-4
          ">

            <p className="
              text-yellow-400
              font-semibold
              mb-1
            ">
              Recommended Action
            </p>

            <p className="text-gray-300">
              {alert.recommended_action}
            </p>

          </div>

        </div>
      ))}

    </div>
  );

  // =========================
  // MAIN UI
  // =========================

  return (

    <div className="
      bg-black
      min-h-screen
      flex
      text-white
    ">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="ml-72 flex-1 p-8">

        <Navbar />

        {/* DASHBOARD */}

        {activePage === "dashboard" && (

          <>

            <StatsCards />

            <div className="mb-8">
              <ThreatChart />
            </div>

            {renderRunButton()}

            {loading && (

              <div className="
                bg-[#111827]
                border
                border-cyan-800
                rounded-2xl
                p-6
                mb-6
                text-cyan-400
              ">

                AI agents are analyzing
                Windows security logs...

              </div>
            )}

            {error && (

              <div className="
                bg-[#111827]
                border
                border-red-800
                rounded-2xl
                p-6
                mb-6
                text-red-400
              ">

                {error}

              </div>
            )}

            <div className="
              grid
              grid-cols-3
              gap-6
            ">

              <div className="col-span-2">
                {renderThreatCards()}
              </div>

              <AgentPanel />

            </div>

          </>
        )}

        {/* THREATS */}

        {activePage === "threats" && (
          <ThreatsPage />
        )}

        {/* ANALYTICS */}

        {activePage === "analytics" && (
          <AnalyticsPage />
        )}

        {/* LOGS */}

        {activePage === "logs" && (
          <LogsPage />
        )}

        {/* AGENTS */}

        {activePage === "agents" && (
          <AgentsPage />
        )}

        {/* SETTINGS */}

        {activePage === "settings" && (

          <div>

            <h1 className="
              text-5xl
              font-bold
              mb-8
            ">
              Settings
            </h1>

            <div className="
              grid
              grid-cols-2
              gap-8
            ">

              <div className="
                bg-[#111827]
                border
                border-gray-800
                rounded-2xl
                p-6
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-6
                ">
                  AI Configuration
                </h2>

                <div className="space-y-4">

                  <div className="
                    bg-[#0f172a]
                    border
                    border-gray-700
                    rounded-xl
                    p-4
                  ">

                    <p className="text-gray-400">
                      AI Model
                    </p>

                    <p className="font-bold">
                      llama3
                    </p>

                  </div>

                  <div className="
                    bg-[#0f172a]
                    border
                    border-gray-700
                    rounded-xl
                    p-4
                  ">

                    <p className="text-gray-400">
                      Provider
                    </p>

                    <p className="font-bold">
                      Ollama
                    </p>

                  </div>

                </div>

              </div>

              <div className="
                bg-[#111827]
                border
                border-gray-800
                rounded-2xl
                p-6
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-6
                ">
                  System Status
                </h2>

                <div className="space-y-4">

                  <div className="
                    bg-[#0f172a]
                    border
                    border-gray-700
                    rounded-xl
                    p-4
                    flex
                    justify-between
                  ">

                    <span>
                      Backend API
                    </span>

                    <span className="text-green-400 font-bold">
                      Online
                    </span>

                  </div>

                  <div className="
                    bg-[#0f172a]
                    border
                    border-gray-700
                    rounded-xl
                    p-4
                    flex
                    justify-between
                  ">

                    <span>
                      CrewAI
                    </span>

                    <span className="text-green-400 font-bold">
                      Running
                    </span>

                  </div>

                  <div className="
                    bg-[#0f172a]
                    border
                    border-gray-700
                    rounded-xl
                    p-4
                    flex
                    justify-between
                  ">

                    <span>
                      Threat Monitoring
                    </span>

                    <span className="text-green-400 font-bold">
                      Active
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;