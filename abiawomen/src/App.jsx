import Hero from './Component/Hero/Hero';
import Information from './Component/Information/Information';
import Touch from './Component/Touch/Touch';
import Footer from './Component/Footer/Footer';
import React from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import AboutPage from './Component/AboutPage/AboutPage';
import {BrowserRouter} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ServicesPage from './Component/ServicesPage/ServicesPage';
import Contact from './Component/Contact/Contact';
import UpcomingEvent from './Component/UpcomingEvent/UpcomingEvent';
import EventsGallery from './Component/EventsGallery/EventsGallery';
import SignIn from './Component/SignIn/SignIn';
import Login from './Component/LogIn/Login';
import MyDonation from './Component/MyDonation/MyDonation';
import MyDashboard from './Component/MyDashboard/MyDashboard'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <main className="main-content">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <Hero />
              <Information />
              <Touch />
            </>
          } />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/UpcomingEvent" element={<UpcomingEvent/>} />
          <Route path="/EventsGallery" element={<EventsGallery/>} />
          <Route path="/MyDonations" element={<MyDonation/>}/>
          <Route path="/MyDashboard" element={<MyDashboard/>} />
          <Route path='/Sign In' element={<SignIn/>} />
          <Route path='/LogIn' element={<Login/>}/>
          
        </Routes>
      </main>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;