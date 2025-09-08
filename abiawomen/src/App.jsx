import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Hero from "./Component/Hero/Hero";
import Information from "./Component/Information/Information";
import Touch from "./Component/Touch/Touch";
import Footer from "./Component/Footer/Footer";
import Navbar from "./Component/Navbar/Navbar";
import AboutPage from "./Component/AboutPage/AboutPage";
import ServicesPage from "./Component/ServicesPage/ServicesPage";
import Contact from "./Component/Contact/Contact";
import UpcomingEvent from "./Component/UpcomingEvent/UpcomingEvent";
import EventsGallery from "./Component/EventsGallery/EventsGallery";
import Login from "./Component/LogIn/Login";
import MyDonation from "./Component/MyDonation/MyDonation";
import MyDashboard from "./Component/MyDashboard/MyDashboard";
import UpdateProfile from "./Component/UpdateProfile/UpdateProfile";
import BenefitPrograms from "./Component/BenefitPrograms/BenefitPrograms";
import EmpowermentPrograms from "./Component/EmpowermentPrograms/EmpowermentPrograms";
import Register from "./Component/Register/Register";
import { MakeDonation } from "./Component/MakeDonation/MakeDonation";
import "./App.css";
import { EventDetail } from "./Component/EventsDetail/EventDetail";
import { BenefitProgramSub } from "./Component/BenefitProgramSub/BenefitProgramSub";
import { PaymentPage } from "./Component/PaymentPage/PaymentPage";
import { EmpowermentProgramApp } from "./Component/EmpowermentProgramApp/EmpowermentProgramApp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [userImage, setUserImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const checkAuthenticated = async () => {
    console.log("🔍 Starting authentication check...");
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          token: token 
        },
      });

      
      if (!res.ok) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const parseRes = await res.json();
      console.log("🔍 Authentication response:", parseRes);

      if (parseRes.user) {
        setUserImage(parseRes.user.profile_picture || null);
        setUserInfo(parseRes.user);
      }
      
      const isVerified = parseRes.verified === true;
      console.log("verified",isVerified)
      
      setIsAuthenticated(isVerified);
      setIsLoading(false);
      
    } catch (err) {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  useEffect(() => {
    console.log("🔄 Authentication state changed:", isAuthenticated);
  }, [isAuthenticated]);

  const ProtectedRoute = ({ children, routeName }) => {
    
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div>Loading...</div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };
  console.log("User Image:", userImage);
  console.log("User Info:", userInfo);


  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar userImage={userImage} isAuthenticated={isAuthenticated} userInfo={userInfo} />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Information />
                  <Touch />
                </>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/Services" element={<ServicesPage />} />
            <Route path="/Contact" element={<Contact />} />

            <Route
              path="/UpcomingEvent"
              element={
                <ProtectedRoute routeName="UpcomingEvent">
                  <UpcomingEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/EventsGallery"
              element={
                <ProtectedRoute routeName="EventsGallery">
                  <EventsGallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/EventDetail/:id"
              element={
                <ProtectedRoute routeName="EventDetail">
                  <EventDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/BenefitProgramSub" element={<BenefitProgramSub />} />
            <Route
              path="/PaymentPage"
              element={
                <ProtectedRoute routeName="PaymentPage">
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MakeDonation"
              element={
                <ProtectedRoute routeName="MakeDonation">
                  <MakeDonation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MyDonations"
              element={
                <ProtectedRoute routeName="MyDonations">
                  <MyDonation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MyDashboard"
              element={
                <ProtectedRoute routeName="MyDashboard">
                  <MyDashboard userImage={userImage} userInfo={userInfo} />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/UpdateProfile"
              element={
                <ProtectedRoute routeName="UpdateProfile">
                  <UpdateProfile userImage={userImage} userInfo={userInfo} />
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="/BenefitPrograms"
              element={
                <ProtectedRoute routeName="BenefitPrograms">
                  <BenefitPrograms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/EmpowermentPrograms"
              element={
                <ProtectedRoute routeName="EmpowermentPrograms">
                  <EmpowermentPrograms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/empowerment-program-app"
              element={
                <ProtectedRoute routeName="EmpowermentProgramApp">
                  <EmpowermentProgramApp />
                </ProtectedRoute>
              }
            />
            <Route path="/Register" element={<Register />} />
            <Route path="/LogIn" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;