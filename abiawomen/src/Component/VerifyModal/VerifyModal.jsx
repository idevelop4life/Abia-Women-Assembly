import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';



const VerifyModal = ({ onClose }) => {
    const navigate = useNavigate();

   const handleClick = () => {
    navigate('/MakeDonation'); // change to your desired path
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
  <div className="bg-white w-full h-full p-20 overflow-auto">
    
    {/* Back Arrow */}
    <div className="flex items-start mb-6">
      <ArrowLeftIcon
        className="h-6 w-6 text-gray-700 cursor-pointer"
        onClick={onClose}
      />
    </div>

    {/* Centered Large Red Bell */}
    <div className="flex justify-center mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="red"
        viewBox="0 0 24 24"
        className="h-20 w-20"
      >
        <path d="M12 2a7 7 0 0 0-7 7c0 3.93-1.55 5.62-2.25 6.25A1 1 0 0 0 3 17h18a1 1 0 0 0 .75-1.75C20.55 14.62 19 12.93 19 9a7 7 0 0 0-7-7zm0 20a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z" />
      </svg>
    </div>

    <h2 className="text-xl font-bold mb-4 text-center">Set Into Impact</h2>
    <p className="text-center">Activate Your Membership.</p>
    <p className="text-center mb-6">
      Become a Paid Member to unlock exclusive benefits, access impact-driven programs, and actively support lasting change in our community.
    </p>

    <div className="flex justify-center">
      <button
        className="bg-red-500 text-white px-20 py-2 rounded hover:bg-green-600 transition"
        onClick={handleClick}
      >
        Confirm
      </button>
    </div>
  </div>
</div>
  )
}

export default VerifyModal