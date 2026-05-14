import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Security Operations Center
        </h1>

        <p className="text-gray-400 mt-2">
          Real-time AI-powered cyber defense monitoring
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 bg-[#151922] px-4 py-2 rounded-lg border border-gray-800">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

          <span className="text-green-400">
            LIVE
          </span>
        </div>

        <div className="bg-[#151922] px-4 py-2 rounded-lg border border-gray-800 text-white">
          Admin
        </div>

      </div>
    </div>
  );
}

export default Navbar;