import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ThreatChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchAnalytics = () => {

      fetch("http://127.0.0.1:8000/analytics")
        .then((res) => res.json())
        .then((result) => {

          setData(result.timeline || []);

        })
        .catch((err) => {

          console.error(
            "Failed to load analytics:",
            err
          );

        });

    };

    fetchAnalytics();

    const interval = setInterval(
      fetchAnalytics,
      5000
    );

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="bg-[#151922] border border-gray-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Threat Activity Timeline
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid stroke="#1f2937" />

          <XAxis
            dataKey="time"
            stroke="#9ca3af"
          />

          <YAxis stroke="#9ca3af" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#cf3b3b"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ThreatChart;