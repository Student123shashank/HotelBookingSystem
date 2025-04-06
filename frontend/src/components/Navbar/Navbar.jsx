import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
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
    <nav className="sticky top-0 left-0 w-full bg-white shadow-md py-3 px-6 md:px-14 flex items-center justify-between z-50">
      <Link to="/" className="flex items-center gap-2">
        <img
          className="h-10 md:h-12"
          src="https://cdn-icons-png.flaticon.com/128/2948/2948035.png"
          alt="logo"
        />
        <h1 className="text-2xl font-bold text-indigo-700">StayEase</h1>
      </Link>

      {/* Search Bar */}
      <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-xl w-96 bg-gray-100">
        <input
          type="text"
          placeholder="Search hotels..."
          className="flex-1 bg-transparent outline-none text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="text-gray-700 text-lg px-4 py-2 hover:bg-gray-200 rounded-full transition"
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn ? (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 border border-indigo-400 text-indigo-400 rounded-full hover:bg-indigo-400 hover:text-white transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-indigo-400 text-white rounded-full hover:bg-indigo-500 transition"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <Link
            to="/profile"
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
          >
            <FaUser />
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="block md:hidden text-gray-700 text-3xl"
        onClick={() => setMobileNav(!mobileNav)}
      >
        {mobileNav ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
