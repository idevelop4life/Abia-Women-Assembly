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
          
        </Routes>
      </main>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;