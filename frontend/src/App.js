import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./data/ProtectRoute";
//! --------------------!dashboard Admin -------------------------------------
import DashoboardAdmin from "./pages/Dashboard/DashoboardAdmin";
import MainBody from "./pages/Dashboard/MainBody";
import UserBody from "./pages/Dashboard/UserBody";
import HousesBody from "./pages/Dashboard/HousesBody";
import HouseProperty from "./pages/Dashboard/HouseProperty";
import RealEstate from "./pages/Dashboard/RealEstate";
import RealEstateProperty from "./pages/Dashboard/RealEstateProperty";
import ProfilePage from "./pages/Dashboard/ProfilePage";
//! --------------------!dashboard Agent -------------------------------------
import DashoboardAgnet from "./pages/Agent_DashBoard/DashoboardAdmin";
import MainBodyAgent from "./pages/Agent_DashBoard/MainBody";
import HousesBodyAgent from "./pages/Agent_DashBoard/HousesBody";
import HousePropertyAgent from "./pages/Agent_DashBoard/HouseProperty";
import RealEstateAgent from "./pages/Agent_DashBoard/RealEstate";
import RealEstatePropertyAgent from "./pages/Agent_DashBoard/RealEstateProperty";
import ProfilePageAgent from "./pages/Agent_DashBoard/ProfilePage";
//! --------------------! website  pages ---------------------------------------
import PropertiesPage from "./pages/PropertiesPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {" ------------------ website  pages  -------------------------"}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword />}
        />
        <Route path="/" element={<PropertiesPage />} />
        <Route path="*" element={<NotFound />} />
        {" ------------------ Admin DashBoard -------------------------"}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashoboardAdmin />
            </ProtectedRoute>
          }
        >
          <Route path="profilePage" element={<ProfilePage />} />
          <Route path="mainBody" element={<MainBody />} />
          <Route path="userBody" element={<UserBody />} />
          <Route path="housesBody" element={<HousesBody />} />{" "}
          <Route path="house/:id" element={<HouseProperty />} />
          <Route path="realEstate" element={<RealEstate />} />
          <Route path="realEstate/:id" element={<RealEstateProperty />} />
        </Route>
        {" ------------------ Agent DashBoard -------------------------"}
        <Route
          path="/dashboardAgent"
          element={
            <ProtectedRoute>
              <DashoboardAgnet />
            </ProtectedRoute>
          }
        >
          <Route path="ProfilePageAgent" element={<ProfilePageAgent />} />
          <Route path="MainBodyAgent" element={<MainBodyAgent />} />
          <Route path="HousesBodyAgent" element={<HousesBodyAgent />} />{" "}
          <Route
            path="HousePropertyAgent/:id"
            element={<HousePropertyAgent />}
          />
          <Route path="RealEstateAgent" element={<RealEstateAgent />} />
          <Route
            path="RealEstatePropertyAgent/:id"
            element={<RealEstatePropertyAgent />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
