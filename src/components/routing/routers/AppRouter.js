import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../../../contexts/UserContext";
import HomePage from "../../views/HomePage";
import Header from "../../views/Header";
import Footer from "../../views/Footer";
import Register from "../../views/Register";
import Login from "../../views/Login";
import Features from "../../views/Features";
import Testimonials from "../../views/Testimonials";
import Dashboard from "../../views/Dashboard";
// import Contact from "../../views/Contact";
import JobApplicationForm from "../../views/JobApplicationForm";
import Statistics from "../../views/Statistics";
import NotificationPreferences from '../../views/NotificationPreferences';



const AppRouter = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/features" element={<Features />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/add-job" element={<JobApplicationForm />} />
            <Route path="/notification-preferences" element={<NotificationPreferences />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
};

export default AppRouter;