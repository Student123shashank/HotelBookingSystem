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
    <>
      <nav className="z-50 relative flex bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 md:px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-8 md:h-10 me-2"
            src="https://cdn-icons-png.flaticon.com/128/2948/2948035.png"
            alt="logo"
          />
          <h1 className="text-lg md:text-2xl font-semibold">HotelBooking</h1>
        </Link>


        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search hotels..."
            className="w-48 md:w-72 px-4 py-2 rounded-l-full bg-white text-black focus:ring-2 focus:ring-blue-500 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-r-full hover:bg-yellow-500 transition"
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
                className="text-sm md:text-base px-3 py-2 hover:bg-yellow-400 rounded transition"
              >
                {item.title}
              </Link>
            ) : null
          )}


          <button className="text-white text-xl" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>


          {!isLoggedIn ? (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-yellow-400 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <Link to="/profile" className="text-white text-xl hover:text-yellow-400 transition">
              <FaUser />
            </Link>
          )}
        </div>


        <button className="block md:hidden text-white text-2xl" onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
