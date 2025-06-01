import { useState, useRef, useEffect } from 'react';

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <img
          src="https://randomuser.me/api/portraits/women/42.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ">
          <a href="MyDonations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            My Donations
          </a>
          <a href="MyDashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            My Dashboard
          </a>
          <a href="UpdateProfile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            Update Profile
          </a>
          <a href="BenefitPrograms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Benefit Programs
          </a>
          <a href="EmpowermentPrograms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Empowerment Programs
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Log out
          </a>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;