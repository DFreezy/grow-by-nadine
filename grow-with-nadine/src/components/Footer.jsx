import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#957F6A] text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; {new Date("2024-01-01").getFullYear()} Grow By Nadine. All rights reserved.</p>
        <p>Call us: (+27) 731577339</p>
        <p>Email: info@growbynadine.com</p>
      </div>
    </footer>
  );
}