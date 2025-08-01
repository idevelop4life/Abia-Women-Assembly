import React from 'react'

const VerifyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-full h-full p-6 overflow-auto">
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={onClose}
                >
                  Close
                </button>
                <h2 className="text-xl font-bold mb-4">Set Into Impact</h2>
                <p>Activate Your Membership.</p>
                <p>Become a Paid Member to unlock exclusive benefits, access impact-driven programs, and actively support lasting change in our community.</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                    Confirm
                </button>
                
              </div>
            </div>
  )
}

export default VerifyModal