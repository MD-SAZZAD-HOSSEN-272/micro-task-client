import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-center sm:text-left">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Brand / Logo */}
        <div>
          <Link to="/" className="text-xl font-bold text-blue-600">
          MicroTasker
        </Link>
          <p className="text-sm mt-2">
            Empowering task management and user collaboration.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/tasks" className="hover:underline">Tasks</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@yourapp.com</p>
          <p className="text-sm">Phone: +880-1234-567890</p>
          <div className="flex space-x-4 mt-3 justify-center sm:justify-start">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
          </div>
        </div>

      </div>

      <div className="text-center py-4 border-t border-gray-300 text-sm">
        &copy; {new Date().getFullYear()} YourAppName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
