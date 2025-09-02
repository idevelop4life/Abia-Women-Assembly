import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Make sure to import UpdateProfile
import UpdateProfile from "../UpdateProfile/UpdateProfile";
function UserDropdown({ onLogout, userImage, userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <img
          src={userImage}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a
            href="/MyDonations"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            My Donations
          </a>
          <a
            href="/MyDashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            My Dashboard
          </a>

          {/* ✅ Fixed: Use button instead of <a> to avoid navigation */}
          <button
            type="button"
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setShow(true)} // ✅ Opens modal
          >
            Update Profile
          </button>

          {show && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    {/* Full-screen container */}
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center transition"
        onClick={() => setShow(false)}
        aria-label="Close modal"
      >
        ✕
      </button>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-50">
        <UpdateProfile
          userImage={userImage}
          userInfo={userInfo}
          onClose={() => setShow(false)}
        />
      </div>
    </div>
  </div>
)}

          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/BenefitPrograms")}
          >
            Benefit Programs
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/EmpowermentPrograms")}
          >
            Empowerment Programs
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;