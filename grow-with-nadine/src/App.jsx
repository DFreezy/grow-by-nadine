import React, { useState } from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/products.jsx";  
import LandingPage from "./pages/landingpage.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        <Footer />
      </BrowserRouter>
</div>
  )
}

export default App;


