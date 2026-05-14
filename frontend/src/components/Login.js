import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem(
        "user",
        data.username
      );

      navigate("/dashboard");

    } else {

      alert(data.detail);

    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-[#151922] border border-gray-800 rounded-3xl p-10 w-[450px]">

        <h1 className="text-4xl font-bold text-white mb-8">
          Login
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-5 p-4 rounded-xl bg-[#0f141d] border border-gray-700 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 p-4 rounded-xl bg-[#0f141d] border border-gray-700 text-white"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 transition p-4 rounded-xl text-white font-bold"
        >
          Login
        </button>

        <div className="flex justify-between mt-6">

          <Link
            to="/register"
            className="text-gray-400 hover:text-red-500"
          >
            Register
          </Link>

          <Link
            to="/about"
            className="text-gray-400 hover:text-red-500"
          >
            About
          </Link>

        </div>

      </div>
    </div>
  );
}