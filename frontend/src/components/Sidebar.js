import React from "react";
import {
  LayoutDashboard,
  ShieldAlert,
  Bot,
  BarChart3,
  FileWarning,
  Settings,
  Activity,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      id: "threats",
      label: "Threats",
      icon: <ShieldAlert size={22} />,
    },
    {
      id: "agents",
      label: "Agents",
      icon: <Bot size={22} />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={22} />,
    },
    {
      id: "logs",
      label: "Logs",
      icon: <FileWarning size={22} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={22} />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-[#050816] border-r border-gray-800 flex flex-col justify-between shadow-2xl z-50">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="flex items-center gap-4 px-8 py-10 border-b border-gray-800">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
            A
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              AutoThreatOps
            </h1>

            <p className="text-sm text-gray-400">
              AI SOC Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-5 py-8 space-y-3">

          {menuItems.map((item) => {
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-left
                  
                  ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                      : "text-gray-400 hover:bg-[#0d1324] hover:text-white"
                  }
                `}
              >
                <span>{item.icon}</span>

                <span className="text-[17px] font-medium tracking-wide">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Card */}
      <div className="p-6">

        <div className="bg-[#0d1324] border border-gray-800 rounded-3xl p-5">

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
              <Activity size={22} />
            </div>

            <div>
              <h2 className="text-white font-semibold">
                System Status
              </h2>

              <p className="text-sm text-gray-400">
                Threat Engine Online
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-400">LLM Runtime</span>
              <span className="text-green-400 font-medium">
                Connected
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">CrewAI Agents</span>
              <span className="text-green-400 font-medium">
                Active
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Backend API</span>
              <span className="text-yellow-400 font-medium">
                Monitoring
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;