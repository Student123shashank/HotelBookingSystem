import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar/Navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const showSuccessMessage = () => {
    Swal.fire({
      title: "Login Successful!",
      text: "Welcome back!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      title: "Login Failed!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const handleSubmit = async () => {
    try {
      if (!credentials.username || !credentials.password) {
        showErrorMessage("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-in",
        credentials
      );

      const { id, token, role, username } = response.data;

      dispatch(authActions.login());
      dispatch(authActions.changeRole(role));
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      showSuccessMessage();

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin/add-hotel");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      showErrorMessage(
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="bg-white/80 dark:bg-gray-800/80 p-8 rounded-lg shadow-md w-full max-w-md backdrop-blur">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Hotel Booking Login
          </h2>

          <div>
            <label className="text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Log In
          </button>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
