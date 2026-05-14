import React from "react";

function AgentPanel() {

  const agents = [
    "Alert Analysis Agent",
    "Risk Assessment Agent",
    "Verification Agent",
    "Response Planning Agent",
  ];

  return (
    <div className="bg-[#151922] border border-gray-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        AI Agents
      </h2>

      <div className="space-y-4">

        {agents.map((agent, index) => (

          <div
            key={index}
            className="flex justify-between items-center bg-[#0f141d] p-4 rounded-xl"
          >

            <span className="text-white">
              {agent}
            </span>

            <span className="text-green-400">
              Active
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentPanel;