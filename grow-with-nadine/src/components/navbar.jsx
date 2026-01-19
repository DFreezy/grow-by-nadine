import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
 const location = useLocation();   
let isProductPage = location.pathname === "/"

    return (
    <div className="pt-14">
        <nav className="flex justify-between items-center p-5 bg-[#957F6A] text-white fixed w-full top-0 left-0 z-50 sm:flex-wrap">
            <div className="flex flex-row">
                <img src="/growbynadine.jpeg" alt="Logo" className="h-10 w-15 inline mr-3 mt-3"/>
            </div>
            <ul className="flex space-x-4 list-none">
                <a href="#about"><li>About</li></a>
                <a href="#testimonials"><li>Testimonials</li></a>
            </ul>
            <Link to={isProductPage ? "/products" : "/"}>
            <button className="bg-white text-[#957F6A] px-4 py-2 rounded-md hover:bg-gray-200 transition">
                {isProductPage ? "Order now" : "Home"}
            </button>
            </Link>
        </nav>
    </div>
    )
}