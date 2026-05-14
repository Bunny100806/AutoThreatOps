import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Dashboard from "./components/Dashboard";

function App() {

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;