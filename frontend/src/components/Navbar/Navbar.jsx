import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaMoon, FaSun, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileNav, setMobileNav] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    window.dispatchEvent(new Event("dark-mode-change"));
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Hotels", path: "/all-hotel" },
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white px-6 py-4 md:px-14 shadow-lg">
      <Link to="/" className="flex items-center gap-3">
        <img
          className="h-10 md:h-12"
          src="https://cdn-icons-png.flaticon.com/128/2948/2948035.png"
          alt="logo"
        />
        <h1
          className="text-xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-600 to-blue-900 bg-clip-text text-transparent"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          StayEase
        </h1>
      </Link>

      <div className="hidden md:flex items-center">
        <input
          type="text"
          placeholder="Search hotels..."
          className="w-56 md:w-80 px-4 py-2 rounded-l-full bg-white text-black focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="px-5 py-2 bg-gray-900 text-white rounded-r-full hover:bg-yellow-500 transition duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((item, index) =>
          !item.auth || isLoggedIn ? (
            <Link
              key={index}
              to={item.path}
              className="text-sm md:text-lg px-4 py-2 hover:bg-yellow-400 rounded-md transition duration-300 font-medium"
            >
              {item.title}
            </Link>
          ) : null
        )}

        <button
          className="text-white text-2xl hover:text-yellow-400 transition duration-300"
          onClick={toggleDarkMode}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {!isLoggedIn ? (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 border border-white rounded-md hover:bg-white hover:text-black transition duration-300 font-medium"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-white text-indigo-700 font-semibold rounded-md hover:bg-yellow-400 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <Link
            to="/profile"
            className="text-white text-2xl hover:text-yellow-400 transition duration-300"
          >
            <FaUser />
          </Link>
        )}
      </div>

      <button
        className="block md:hidden text-white text-3xl hover:text-yellow-400 transition duration-300"
        onClick={() => setMobileNav(!mobileNav)}
      >
        {mobileNav ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
