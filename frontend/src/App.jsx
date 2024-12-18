import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminHeader from "./admin/components/Header";
import AdminFooter from "./admin/components/Footer";

// Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetNewPassword from "./pages/auth/ResetNewPassword";
import Dashboard from "./pages/Dashboard";
import SingleAuctionDetail from "./pages/SingleAuctionDetail";
import UserProfile from "./pages/UserProfile";
import EditAuction from "./pages/EditAuction";
import UploadItem from "./pages/UploadItem";
import PaymentSuccess from "./pages/PaymentSuccess";
import ErrorPage from "./pages/ErrorPage";

// Admin Pages
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/Admin";

// Protected Routes
import Protected, { PublicRoute, SellerRoutes, AdminRoutes } from "./auth/Protected";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // If there's no user, redirect to login page
    if (!user) {
      window.location.href = '/login'; // This will redirect to the login page directly.
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        {/* Conditional Headers */}
        {user && user.userType === "admin" ? <AdminHeader /> : <Header />}

        {/* App Routes */}
        <Routes>
          {/* Redirect root path to login page */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* General Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/single-auction-detail/:id"
            element={<SingleAuctionDetail />}
          />
          <Route path="*" element={<ErrorPage />} />

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route
              path="/reset-password/:id/:token"
              element={<ResetNewPassword />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<Protected />}>
            <Route path="/user-profile/*" element={<UserProfile />} />
            <Route path="/edit-auction/:id" element={<EditAuction />} />
            <Route path="/success/:id" element={<PaymentSuccess />} />

            {/* Seller-Specific Routes */}
            <Route element={<SellerRoutes />}>
              <Route path="/create-auction" element={<UploadItem />} />
            </Route>
          </Route>

          {/* Admin-Specific Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>

        {/* Conditional Footers */}
        {user && user.userType === "admin" ? <AdminFooter /> : <Footer />}
      </BrowserRouter>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
};

export default App;
