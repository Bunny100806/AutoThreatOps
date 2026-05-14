import React, { useEffect, useState } from "react";

const ThreatsPage = () => {

  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchThreats();

    const interval = setInterval(
      fetchThreats,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  const fetchThreats = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/threats"
      );

      const data = await response.json();

      setThreats(data);

    } catch (error) {

      console.error(
        "Failed to fetch threats:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  const getSeverityClass = (severity) => {

    if (severity === "Critical") {
      return "bg-red-700";
    }

    if (severity === "High") {
      return "bg-orange-600";
    }

    if (severity === "Medium") {
      return "bg-yellow-600";
    }

    return "bg-green-600";
  };

  if (loading) {

    return (
      <div className="text-white p-6">
        Loading stored threat history...
      </div>
    );
  }

  return (

    <div className="p-6 text-white">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Threat History
          </h1>

          <p className="text-gray-400 mt-2">
            Stored AI-analyzed security incidents from the database
          </p>

        </div>

        <button
          onClick={fetchThreats}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold transition"
        >
          Refresh
        </button>

      </div>

      {threats.length === 0 ? (

        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 text-gray-300">

          No stored threats yet.

          <p className="mt-2 text-gray-500">
            Run AI Threat Analysis once to generate and store an incident.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {threats.map((threat, index) => (

            <div
              key={threat.id || index}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg"
            >

              <div className="flex justify-between items-center mb-4">

                <div>

                  <h2 className="text-2xl font-semibold">
                    {threat.threat}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Incident ID: {threat.id}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Event ID: {threat.event_id || "4625"} | Source: {threat.source || "Windows Security Log"}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Created:{" "}
                    {threat.created_at
                      ? new Date(threat.created_at).toLocaleString()
                      : "N/A"}
                  </p>

                </div>

                <span
                  className={`
                    px-4 py-2 rounded-full text-sm font-bold
                    ${getSeverityClass(threat.severity)}
                  `}
                >
                  {threat.severity}
                </span>

              </div>

              <p className="mb-4 text-gray-300 leading-7">
                {threat.summary}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">

                <div className="bg-gray-800 p-4 rounded-lg">

                  <p className="text-gray-400">
                    Risk Score
                  </p>

                  <p className="text-2xl font-bold">
                    {threat.risk_score}
                  </p>

                </div>

                <div className="bg-gray-800 p-4 rounded-lg">

                  <p className="text-gray-400">
                    Confidence
                  </p>

                  <p className="text-2xl font-bold">
                    {threat.confidence}%
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">

                <div className="bg-gray-800 p-4 rounded-lg">

                  <p className="text-gray-400">
                    MITRE Tactic
                  </p>

                  <p className="font-semibold">
                    {threat.mitre_tactic}
                  </p>

                </div>

                <div className="bg-gray-800 p-4 rounded-lg">

                  <p className="text-gray-400">
                    MITRE Technique
                  </p>

                  <p className="font-semibold">
                    {threat.mitre_technique}
                  </p>

                </div>

              </div>

              <div className="mb-4 bg-gray-800 p-4 rounded-lg">

                <p className="text-gray-400">
                  Recommended Action
                </p>

                <p className="text-green-400 leading-7">
                  {threat.recommended_action}
                </p>

              </div>

              <div>

                <p className="text-gray-400">
                  Safety Status
                </p>

                <p
                  className={`
                    font-bold
                    ${
                      threat.safety_status === "Unsafe"
                        ? "text-red-500"
                        : threat.safety_status === "Suspicious"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  `}
                >
                  {threat.safety_status}
                </p>

              </div>

            </div>
          ))}

        </div>

      )}

    </div>
  );
};

export default ThreatsPage;