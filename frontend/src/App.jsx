/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { SignUp } from "./Pages/Auth/SighnUp";
import { LogIn } from "./Pages/Auth/LogIn";
import { PatientProfile } from "./Pages/Patient/PatientProfile";
import { EditProfile } from "./components/EditProfile";
import { SavedServices } from "./components/SavedServices";
import MyReviews from "./components/MyReviews";
import { SideBarMobile } from "./components/SideBarMobile";
import { SignUpHospital } from "./Pages/Auth/SignUpHospital";
import { DashBoard } from "./Pages/Hospital/DashBoard";
import { MainSectionAtDashBoard } from "./components/MainSectionAtDashBoard";
import { EditHospitalProfile } from "./components/EditHospitalProfile";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { ServiceCard } from "./components/ServiceCard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HospitalReviews from "./components/HospitalReviews";
import { HospitalsList } from "./Pages/Hospital/HospitalsList";
import { ServicesPage } from "./Pages/Home/ServicesPage";
import { About } from "./Pages/Home/About";
import { EmergencyPage } from "./Pages/Home/EmergencyPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/emergency"
          element={
            <MainLayout>
              <EmergencyPage />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <ServicesPage />
            </MainLayout>
          }
        />
        <Route
          path="/hospitals"
          element={
            <MainLayout>
              <HospitalsList />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/service-details/:id"
          element={
            <MainLayout>
              <ServiceCard />
            </MainLayout>
          }
        />
        <Route
          path="/SignUp-Hospital"
          element={
            <MainLayout>
              <SignUpHospital />
            </MainLayout>
          }
        />
        <Route
          path="/SignUp"
          element={
            <MainLayout>
              <SignUp />
            </MainLayout>
          }
        />

        <Route
          path="/LogIn"
          element={
            <MainLayout>
              <LogIn />
            </MainLayout>
          }
        />

        {/* Patient Routes - Protected (role 0 = Patient) */}
        <Route
          path="/PatientProfile"
          element={
            <MainLayout>
              <ProtectedRoute requiredRole={0}>
                <PatientProfile />
              </ProtectedRoute>
            </MainLayout>
          }
        >
          <Route index element={<EditProfile />} />
          <Route path="savedServices" element={<SavedServices />} />
          <Route path="myReviews" element={<MyReviews />} />
        </Route>

        {/* Hospital Routes - Protected (role 1 = Hospital) */}
        <Route
          path="/Hospital-DashBoard"
          element={
            <DashboardLayout>
              <ProtectedRoute requiredRole={1}>
                <DashBoard />
              </ProtectedRoute>
            </DashboardLayout>
          }
        >
          <Route index element={<MainSectionAtDashBoard />} />
          <Route path="update-profile" element={<EditHospitalProfile />} />
          <Route path="reviews" element={<HospitalReviews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
