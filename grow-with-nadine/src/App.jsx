import React, { useState } from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/products.jsx";  
import LandingPage from "./pages/landingpage.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import Notify from "./pages/notify.jsx";
import Cancel from "./pages/cancel.jsx";
import Success from "./pages/success.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/notify" element={<Notify />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/success" element={<Success />} />
        </Routes>
        <Footer />
      </BrowserRouter>
</div>
  )
}

export default App;


