import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Navbar from "../components/Navbar/Navbar";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const showSuccessMessage = () => {
    Swal.fire({
      title: 'Signup Successful!',
      text: 'You have successfully signed up.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  };

  const submit = async () => {
    if (!Values.username || !Values.email || !Values.password || !Values.address) {
      showErrorMessage("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:1000/api/v1/sign-up", Values);
      showSuccessMessage();
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      showErrorMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white-900 flex flex-col">
      <div className="flex-grow flex items-center justify-center px-12 py-8">
        <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full sm:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-xl">Sign Up</p>
          <div className="mt-4">
            <div>
              <label htmlFor="username" className="text-zinc-400">Username</label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="username"
                name="username"
                value={Values.username}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="text-zinc-400">Email</label>
              <input
                type="email"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="xyz@gmail.com"
                name="email"
                value={Values.email}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-zinc-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="password"
                  name="password"
                  value={Values.password}
                  onChange={change}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-zinc-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="text-zinc-400">Address</label>
              <textarea
                rows="5"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="address"
                name="address"
                value={Values.address}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <button
                className={`w-full bg-blue-500 text-white font-semibold py-2 rounded 
                  ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 transition-all duration-300"}`}
                onClick={submit}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
            <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
              or
            </p>
            <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
              Already have an account? &nbsp;
              <Link to="/login" className="hover:text-blue-500">
                <u>Log In</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default SignUp;
