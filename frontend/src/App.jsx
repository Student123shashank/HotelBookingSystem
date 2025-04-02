import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { authActions } from "./store/auth";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllHotels from "./pages/AllHotels";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ViewHotelDetails from "./components/ViewHotelDetails/ViewHotelDetails";
import Favourites from "./components/Profile/Favourites";
import Settings from "./components/Profile/Settings";
import UserBookingHistory from "./components/Profile/UserBookingHistory";
import SearchResults from "./pages/SearchResults";
import BuyHotel from "./components/BuyHotel/BuyHotel";
import AddReview from "./pages/AddReview";

const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (userId && token && role) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(role));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      // just a comment
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-hotel" element={<AllHotels />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/view-hotel-details/:id" element={<ViewHotelDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/buy-hotel/:id" element={<BuyHotel />} />

        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} />
          <Route
            path="/profile/bookingHistory"
            element={<UserBookingHistory />}
          />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="add-review/:hotelId" element={<AddReview />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
