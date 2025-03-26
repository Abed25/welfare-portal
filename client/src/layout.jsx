import React from "react";
import { Routes, Route } from "react-router-dom";
import "./general_styles/layout.css";
import Landing from "./general_pages/landing";
import Head from "./general_components/head";
import Footer from "./general_components/footer";
import Counselling_Layout from "./counsellors/pages/layout";
import NotFound from "./general_pages/NotFound";
import Login from "./general_pages/login";
import SignUp from "./general_pages/register";
import ProtectedRoute from "./general_components/ProtectedRoute";
import ProtectedLayout from "./general_components/protectedLayout";
import Test from "./general_pages/Test";
import CounsellorDashboard from "./general_pages/counsellorDashboard";
import StudentDashboard from "./general_pages/studentDashboard";
import Home from "./general_pages/Home";

export default function Layout() {
  return (
    <div className="layout">
      <Head />
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/test" element={<Test />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["student", "counsellor"]}>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/Counselling" element={<Counselling_Layout />}></Route>
            <Route path="/home" element={<Home />} />
          </Route>

          {/* Counsellor-only Routes */}
          <Route
            path="/counsellor-dashboard"
            element={
              <ProtectedRoute allowedRoles={["counsellor"]}>
                <CounsellorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Student-only Routes */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        ;
      </div>
      <Footer />
    </div>
  );
}
