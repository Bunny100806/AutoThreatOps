export default function About() {
  return (
    <div className="min-h-screen bg-black text-white p-20">

      <h1 className="text-6xl font-bold mb-10">
        About AutoThreatOps
      </h1>

      <p className="text-xl text-gray-400 leading-10 max-w-5xl">
        AutoThreatOps is a multi-agent LLM framework designed
        for safety-constrained cyber defense automation.

        The system monitors Windows security events,
        analyzes cybersecurity threats using AI agents,
        performs risk assessment, verifies threats,
        and recommends secure mitigation actions.

        The framework integrates:
        Alert Analysis Agents,
        Verification Agents,
        Risk Assessment Agents,
        and Response Planning Agents
        for intelligent SOC automation.
      </p>

    </div>
  );
}