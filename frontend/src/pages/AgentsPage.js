export default function AgentsPage() {

  const agents = [

    {
      name: "Alert Analysis Agent",
      status: "Active",
      description:
      "Analyzes Windows Security Logs and identifies suspicious activity.",
      color: "text-red-400"
    },

    {
      name: "Risk Assessment Agent",
      status: "Active",
      description:
      "Calculates severity levels and evaluates cyber attack risk scores.",
      color: "text-yellow-400"
    },

    {
      name: "Verification Agent",
      status: "Active",
      description:
      "Validates detected threats to reduce false positives.",
      color: "text-green-400"
    },

    {
      name: "Response Planning Agent",
      status: "Active",
      description:
      "Generates recommended mitigation and incident response actions.",
      color: "text-blue-400"
    }

  ];

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white mb-3">
          AI Agents Monitoring
        </h1>

        <p className="text-gray-400 text-lg">
          Multi-agent cybersecurity orchestration and defense automation
        </p>

      </div>

      <div className="grid grid-cols-2 gap-8">

        {agents.map((agent, index) => (

          <div
            key={index}
            className="bg-[#111827] border border-gray-800 rounded-3xl p-8"
          >

            <div className="flex justify-between items-center mb-6">

              <h2 className={`text-2xl font-bold ${agent.color}`}>
                {agent.name}
              </h2>

              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
                {agent.status}
              </span>

            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {agent.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}