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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userImage, setUserImage] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:9000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      console.log("parseRes", parseRes);

      setUserImage(parseRes.user.profile_picture);
      setUserInfo(parseRes.user);
      console.log("profile pic", parseRes.user.profile_picture);
      if (parseRes.verified === true) {
        console.log("true");
        await setIsAuthenticated(true);
      } else {
        console.log("false");
        await setIsAuthenticated(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar userImage={userImage} isAuthenticated={isAuthenticated} />

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
                isAuthenticated ? (
                  <UpcomingEvent />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/EventsGallery"
              element={
                isAuthenticated ? (
                  <EventsGallery />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/EventDetail/:id"
              element={
                isAuthenticated ? <EventDetail /> : <Navigate to="/" replace />
              }
            />
            <Route path="/BenefitProgramSub" element={<BenefitProgramSub />} />
            <Route
              path="/PaymentPage"
              element={
                isAuthenticated ? <PaymentPage /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/MakeDonation"
              element={
                isAuthenticated ? <MakeDonation /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/MyDonations"
              element={
                isAuthenticated ? <MyDonation /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/MyDashboard"
              element={
                isAuthenticated ? (
                  <MyDashboard userImage={userImage} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/UpdateProfile"
              element={
                isAuthenticated ? (
                  <UpdateProfile userImage={userImage} userInfo={userInfo} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/BenefitPrograms"
              element={
                isAuthenticated ? (
                  <BenefitPrograms />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/EmpowermentPrograms"
              element={
                isAuthenticated ? (
                  <EmpowermentPrograms />
                ) : (
                  <Navigate to="/" replace />
                )
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
