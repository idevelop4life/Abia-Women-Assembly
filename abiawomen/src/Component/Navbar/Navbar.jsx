import React, { useEffect } from "react";
import logo from "../../assets/Logo.png";
import UserDropdown from "../UserDropdown/UserDropdown";
import { Link } from "react-router-dom";
import EventDropDown from "../EventDropDown/EventDropDown";

function SignedInFeature({ isSignedIn, onLogout, userImage }) {
  if (isSignedIn) {
    return <UserDropdown onLogout={onLogout} userImage={userImage} />;
  }
  return (
    <button className="md:hidden text-gray-800 hover:text-blue-500">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}

export default function Navbar({ userImage, isAuthenticated }) {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsSignedIn(false);
  };

  return (
    <div>
      <nav className="bg-green-800 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="#" className="flex items-center">
            <img src={logo} alt="Company Logo" className="w-14 h-14 ml-4" />
          </a>

          <ul className="hidden md:flex space-x-6">
            <li>
              <a
                href="#"
                className="text-white hover:text-blue-500 transition-colors"
              >
                <Link to="/">Home</Link>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-blue-500 transition-colors"
              >
                <Link to="/About">About</Link>
              </a>
            </li>
            {!isAuthenticated && (
              <EventDropDown isAuthenticated={isAuthenticated} />

            )}
            
            <li>
              <a
                href="#"
                className="text-white hover:text-blue-500 transition-colors"
              >
                <Link to="/Contact">Contact</Link>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 mr-4">
          {!isAuthenticated && (
            <button className="bg-[#FBD33D] text-black px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              <Link to="/Register">Sign In</Link>
            </button>
          )}
          <SignedInFeature
            isSignedIn={isSignedIn}
            onLogout={handleLogout}
            userImage={userImage}
          />
        </div>
      </nav>
    </div>
  );
}
