import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LandingPage() {
  return (
    <div>
    <section className="relative bg-[url('/growbynadine.jpeg')] bg-cover bg-center bg-no-repeat">
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-evenly px-6 py-16 gap-10">
        
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images (1).jpeg"
            alt="Landing Page Image"
            className="w-full max-w-sm rounded-2xl shadow-2xl"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Grow By Nadine
          </h1>

          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-[#f1e8dc]">
            Where natural care meets growth
          </h2>

          <p className="mt-6 max-w-lg mx-auto md:mx-0 text-gray-200">
            Natural, science-backed hair growth solutions designed to restore
            confidence and promote healthy hair from root to tip.
          </p>
          <Link to="/products">
            <button className="bg-white text-[#957F6A] px-4 py-2 rounded-md hover:bg-gray-200 transition mt-8" >
                Order now
            </button>
            </Link>
        </div>

      </div>
    </section>
    <section className="flex flex-row flex-wrap bg-gray-300 gap-8 py-16 px-4 mt-8">
      <div id="about" className="text-center">
        <h1 className="text-3xl font-bold text-center mb-8">About</h1>
        <p className="max-w-4xl mx-auto px-4 text-center text-gray-700">
          Hi. I am Nadine 👋. Welcome to Grow By Nadine! I started this journey out of my own struggles with hair loss and the desire to find natural, effective solutions. 
          Our products are crafted with care, using only the best ingredients to help you achieve healthy, beautiful hair. Whether you're dealing with thinning hair, breakage, 
          or just want to enhance your hair's natural growth, we're here to support you every step of the way. Thank you for being part of our community!
        </p>
      </div>
      <div className="p-10">
        <img src="/nadine.jpeg" alt="About Us" className="w-full max-w-70 max-h-70 mx-auto my-6 rounded-2xl shadow-2xl md:mx-auto"/>
      </div>
    </section>
    <section>
      <h1 className="text-3xl font-bold text-center mb-8 mt-8" id="testimonials">Testimonials</h1>
    <div>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            "I've been using Grow with Nadine for 3 months now and my hair has never looked better!"
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            "The natural ingredients really work. My hair is stronger and more vibrant than ever. Oh, and longer too 😁"
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            "I was skeptical at first, but after just a few weeks, I noticed a significant difference."
          </p>
        </div>
      </div>
      </div>
    </section>
    </div>
  );
}
                