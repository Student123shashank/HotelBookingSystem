import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar2 = () => {
  const navigate = useNavigate();
  const [mobileNav, setMobileNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
    <nav className="sticky top-0 left-0 w-full bg-transparent backdrop-blur-none border-none shadow-none py-4 px-6 md:px-14 flex items-center justify-between z-50 text-white">

      <Link to="/" className="flex items-center gap-3">
        <img
          className="h-12 md:h-14 drop-shadow-lg"
          src="https://cdn-icons-png.flaticon.com/128/2948/2948035.png"
          alt="logo"
        />
        <h1 className="text-3xl font-extrabold">StayEase</h1>
      </Link>

      <div className="hidden md:flex items-center border border-white rounded-full px-4 py-2 shadow-xl w-96 bg-white text-gray-800">
        <input
          type="text"
          placeholder="Search hotels..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-pink-500 text-white rounded-full p-2 hover:bg-pink-600 transition"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="text-lg px-5 py-2 text-white hover:bg-white hover:text-indigo-500 rounded-full transition font-semibold"
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn ? (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 border border-white text-white rounded-full hover:bg-white hover:text-indigo-500 transition font-semibold"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-white text-indigo-500 rounded-full hover:bg-pink-500 hover:text-white transition font-semibold"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <Link
            to="/profile"
            className="bg-white text-indigo-500 p-2 rounded-full hover:bg-pink-500 hover:text-white transition"
          >
            <FaUser />
          </Link>
        )}
      </div>

      <button
        className="block md:hidden text-white text-3xl"
        onClick={() => setMobileNav(!mobileNav)}
      >
        {mobileNav ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-xl transform transition-transform duration-300 ease-in-out ${
          mobileNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-white"
          onClick={() => setMobileNav(false)}
        >
          <FaTimes />
        </button>
        <div className="mt-16 flex flex-col items-center gap-6 text-white">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-lg px-4 py-2 hover:bg-white hover:text-indigo-500 rounded-full transition font-semibold"
              onClick={() => setMobileNav(false)}
            >
              {item.title}
            </Link>
          ))}
          {!isLoggedIn ? (
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/login"
                className="px-5 py-2 border border-white text-white rounded-full hover:bg-white hover:text-indigo-500 transition font-semibold"
                onClick={() => setMobileNav(false)}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-white text-indigo-500 rounded-full hover:bg-pink-500 hover:text-white transition font-semibold"
                onClick={() => setMobileNav(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <Link
              to="/profile"
              className="bg-white text-indigo-500 p-2 rounded-full hover:bg-pink-500 hover:text-white transition"
              onClick={() => setMobileNav(false)}
            >
              <FaUser />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
