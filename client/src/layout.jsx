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

          {/* Protected Routes with SubHeader & SubFooter */}
          <Route
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={Counselling_Layout} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
