import React from "react";

function StatsCards() {

  const stats = [
    {
      title: "Critical Threats",
      value: "12",
      color: "text-red-500",
    },

    {
      title: "Verified Alerts",
      value: "28",
      color: "text-green-500",
    },

    {
      title: "Agents Active",
      value: "4",
      color: "text-blue-500",
    },

    {
      title: "Security Score",
      value: "92%",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">

      {stats.map((item, index) => (

        <div
          key={index}
          className="bg-[#151922] border border-gray-800 rounded-2xl p-6"
        >

          <p className="text-gray-400 mb-3">
            {item.title}
          </p>

          <h2 className={`text-4xl font-bold ${item.color}`}>
            {item.value}
          </h2>

        </div>
      ))}
    </div>
  );
}

export default StatsCards;