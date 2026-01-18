import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#957F6A] text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Grow By Nadine. All rights reserved.</p>
        <p>Call us: (123) 456-7890</p>
        <p>Email: info@growbynadine.com</p>
      </div>
    </footer>
  );
}