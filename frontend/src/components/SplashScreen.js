import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {

  useEffect(() => {

    const timer = setTimeout(() => {
      onFinish();
    }, 4000);

    return () => clearTimeout(timer);

  }, [onFinish]);

  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center overflow-hidden">

      {/* Animated Glow */}
      <div className="absolute w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">

        <div className="w-32 h-32 rounded-full bg-red-600 flex items-center justify-center text-6xl font-bold shadow-2xl">
          A
        </div>

        <h1 className="mt-10 text-6xl font-bold text-white tracking-widest">
          AutoThreatOps
        </h1>

        <p className="mt-6 text-gray-400 text-xl tracking-wide">
          Multi-Agent AI Cyber Defense Platform
        </p>

        {/* Loading Bar */}
        <div className="mt-12 w-96 h-3 bg-zinc-800 rounded-full overflow-hidden">

          <div className="h-full bg-red-600 animate-[loading_4s_linear_forwards]"></div>

        </div>

      </div>

      <style>
        {`
          @keyframes loading {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>

    </div>
  );
}