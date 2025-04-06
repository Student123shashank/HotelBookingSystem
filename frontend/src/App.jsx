import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { authActions } from "./store/auth";

import Home from "./pages/Home";
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

import AdminRoute from "./routes/AdminRoutes";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddHotel from "./pages/admin/AddHotel";
import ManageHotel from "./pages/admin/ManageHotels";
import ManageUsers from "./pages/admin/ManageUsers";
import ViewBookings from "./pages/admin/ViewBookings";
import ViewReviews from "./pages/admin/ViewReviews";

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
    <>
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-hotel"
          element={
            <AdminRoute>
              <AdminLayout>
                <AddHotel />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-hotels"
          element={
            <AdminRoute>
              <AdminLayout>
                <ManageHotel />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <AdminRoute>
              <AdminLayout>
                <ManageUsers />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/view-bookings"
          element={
            <AdminRoute>
              <AdminLayout>
                <ViewBookings />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/view-reviews"
          element={
            <AdminRoute>
              <AdminLayout>
                <ViewReviews />
              </AdminLayout>
            </AdminRoute>
          }
        />

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/all-hotel" element={<AllHotels />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/view-hotel-details/:id" element={<ViewHotelDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/buy-hotel/:id" element={<BuyHotel />} />

        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} />
          <Route path="bookingHistory" element={<UserBookingHistory />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-review/:hotelId" element={<AddReview />} />
        </Route>

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
