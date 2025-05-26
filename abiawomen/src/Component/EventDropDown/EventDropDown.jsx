import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EventDropDown() {
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
        className="px-4 text-white "
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <Link to="/UpcomingEvent">Events</Link>
        
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a href="/UpcomingEvent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Upcoming Events
          </a>
          <a href="/EventsGallery" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <Link to="/EventsGallery">Events Gallery</Link>
            
          </a>
          
        </div>
      )}
    </div>
  );
}