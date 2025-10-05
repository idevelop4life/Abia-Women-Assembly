// src/Components/Navbar/Navbar.js
import React from 'react';

export default function Navbar() {
  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen fixed left-0 top-0">
      {/* Logo/Brand */}
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold text-blue-400">Abia Women Assembly</h1>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          <li>
            <a 
              href="#dashboard" 
              className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <span>📊</span>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a 
              href="#members" 
              className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <span>👥</span>
              <span className="ml-3">Assist Application</span>
            </a>
          </li>
          <li>
            <a 
              href="#events" 
              className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <span>📅</span>
              <span className="ml-3">Report Issue</span>
            </a>
          </li>
          <li>
            <a 
              href="#reports" 
              className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <span>📈</span>
              <span className="ml-3">My Timesheet</span>
            </a>
          </li>
          <li>
            <a 
              href="#settings" 
              className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <span>⚙️</span>
              <span className="ml-3">Track Engagement</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* User Profile at Bottom */}
      <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
        <div className="flex items-center">
          <div className="bg-slate-600 rounded-full w-10 h-10 flex items-center justify-center">
            <span className="font-bold">A</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}