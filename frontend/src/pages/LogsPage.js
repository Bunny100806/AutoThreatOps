import { useEffect, useState } from "react";

export default function LogsPage() {

  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchLogs = () => {

      fetch("http://127.0.0.1:8000/threats")

        .then((res) => {

          if (!res.ok) {
            throw new Error(
              `Backend Error ${res.status}`
            );
          }

          return res.json();

        })

        .then((data) => {

          setLogs(data);

          setLoading(false);

        })

        .catch((err) => {

          console.error(err);

          setError(
            "Failed to load security logs."
          );

          setLoading(false);

        });

    };

    fetchLogs();

    const interval = setInterval(
      fetchLogs,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  const getSeverityColor = (severity) => {

    const value = String(severity || "")
      .toLowerCase();

    if (value === "critical") {
      return "text-red-500";
    }

    if (value === "high") {
      return "text-orange-400";
    }

    if (value === "medium") {
      return "text-yellow-400";
    }

    if (value === "low") {
      return "text-green-400";
    }

    return "text-gray-400";
  };

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white mb-3">
          Security Logs
        </h1>

        <p className="text-gray-400 text-lg">
          Real-time Windows Security Event Monitoring
        </p>

      </div>

      {loading && (

        <div className="bg-[#111827] border border-cyan-800 rounded-2xl p-6 mb-6 text-cyan-400">

          Loading security logs...

        </div>

      )}

      {error && (

        <div className="bg-[#111827] border border-red-800 rounded-2xl p-6 mb-6 text-red-400">

          {error}

        </div>

      )}

      {!loading && logs.length === 0 && (

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 text-gray-400">

          No security logs available yet.

        </div>

      )}

      {!loading && logs.length > 0 && (

        <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#1f2937] text-gray-300">

              <tr>

                <th className="text-left p-5">
                  ID
                </th>

                <th className="text-left p-5">
                  Threat
                </th>

                <th className="text-left p-5">
                  Event ID
                </th>

                <th className="text-left p-5">
                  Source
                </th>

                <th className="text-left p-5">
                  Severity
                </th>

                <th className="text-left p-5">
                  Risk
                </th>

                <th className="text-left p-5">
                  Confidence
                </th>

                <th className="text-left p-5">
                  Safety
                </th>

                <th className="text-left p-5">
                  Created
                </th>

              </tr>

            </thead>

            <tbody>

              {logs.map((log, index) => (

                <tr
                  key={log.id || index}
                  className="border-t border-gray-800 hover:bg-[#1a2233] transition"
                >

                  <td className="p-5 text-gray-500">
                    #{log.id || index + 1}
                  </td>

                  <td className="p-5 text-red-400 font-semibold">
                    {log.threat}
                  </td>

                  <td className="p-5 text-cyan-400 font-semibold">
                    {log.event_id || "4625"}
                  </td>

                  <td className="p-5 text-gray-300">
                    {log.source || "Windows Security Log"}
                  </td>

                  <td
                    className={`p-5 font-bold ${getSeverityColor(
                      log.severity
                    )}`}
                  >
                    {log.severity}
                  </td>

                  <td className="p-5 text-yellow-400 font-semibold">
                    {log.risk_score}
                  </td>

                  <td className="p-5 text-cyan-400 font-semibold">
                    {log.confidence}%
                  </td>

                  <td
                    className={`p-5 font-semibold ${
                      log.safety_status === "Unsafe"
                        ? "text-red-400"
                        : log.safety_status === "Suspicious"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {log.safety_status}
                  </td>

                  <td className="p-5 text-gray-400 text-sm">
                    {log.created_at
                      ? new Date(
                          log.created_at
                        ).toLocaleString()
                      : "N/A"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}