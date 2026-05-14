import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e"
];

export default function AnalyticsPage() {

  const [timeline, setTimeline] = useState([]);
  const [severity, setSeverity] = useState([]);
  const [totalThreats, setTotalThreats] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAnalytics = () => {

      fetch("http://127.0.0.1:8000/analytics")
        .then((res) => res.json())
        .then((data) => {

          setTimeline(data.timeline || []);
          setSeverity(data.severity || []);
          setTotalThreats(data.total_threats || 0);
          setLoading(false);

        })
        .catch((error) => {

          console.error("Analytics fetch failed:", error);
          setLoading(false);

        });

    };

    fetchAnalytics();

    const interval = setInterval(
      fetchAnalytics,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  const highThreats =
    severity.find((item) => item.name === "High")?.value || 0;

  const criticalThreats =
    severity.find((item) => item.name === "Critical")?.value || 0;

  const latestTime =
    timeline.length > 0
      ? timeline[timeline.length - 1].time
      : "N/A";

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white mb-3">
          Security Analytics
        </h1>

        <p className="text-gray-400 text-lg">
          Real-time analytics from stored AI threat intelligence
        </p>

      </div>

      {loading ? (

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-10 text-center text-white">
          Loading analytics...
        </div>

      ) : (

        <>

          <div className="grid grid-cols-4 gap-6 mb-8">

            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

              <h2 className="text-gray-400 mb-4">
                Total Threats
              </h2>

              <p className="text-5xl font-bold text-red-500">
                {totalThreats}
              </p>

            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

              <h2 className="text-gray-400 mb-4">
                Critical
              </h2>

              <p className="text-5xl font-bold text-red-400">
                {criticalThreats}
              </p>

            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

              <h2 className="text-gray-400 mb-4">
                High Severity
              </h2>

              <p className="text-5xl font-bold text-orange-400">
                {highThreats}
              </p>

            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

              <h2 className="text-gray-400 mb-4">
                Latest Event
              </h2>

              <p className="text-3xl font-bold text-green-400">
                {latestTime}
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">

            <div className="bg-[#111827] rounded-3xl p-6 border border-gray-800">

              <h2 className="text-2xl font-bold text-white mb-6">
                Threat Activity Timeline
              </h2>

              <ResponsiveContainer width="100%" height={300}>

                <LineChart data={timeline}>

                  <Line
                    type="monotone"
                    dataKey="threats"
                    stroke="#ef4444"
                    strokeWidth={3}
                  />

                  <CartesianGrid stroke="#333" />

                  <XAxis
                    dataKey="time"
                    stroke="#9ca3af"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis stroke="#9ca3af" />

                  <Tooltip />

                </LineChart>

              </ResponsiveContainer>

            </div>

            <div className="bg-[#111827] rounded-3xl p-6 border border-gray-800">

              <h2 className="text-2xl font-bold text-white mb-6">
                Severity Distribution
              </h2>

              <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                  <Pie
                    data={severity}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {severity.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="bg-[#111827] rounded-3xl p-6 border border-gray-800">

            <h2 className="text-2xl font-bold text-white mb-6">
              Severity Bar Analysis
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={severity}>

                <CartesianGrid stroke="#333" />

                <XAxis dataKey="name" stroke="#9ca3af" />

                <YAxis stroke="#9ca3af" />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#ef4444"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </>

      )}

    </div>
  );
}