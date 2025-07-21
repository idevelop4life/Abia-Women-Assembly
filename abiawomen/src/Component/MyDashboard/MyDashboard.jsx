import { useState } from 'react'
import AWA1 from '../../assets/AWA 1.png'
import { useNavigate } from 'react-router-dom'
import Kite from '../../assets/kiteimage.png'

export default function MyDashboard(userImage) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Option 1")

  const options = ["Option 1", "Option 2", "Option 3"]
  console.log("userImage", userImage)

  return (
    <div className='mx-10 my-10'>
      <h1 className='font-bold text-2xl my-10'>
        Welcome, Grace!
      </h1>

      <div className='flex flex-row gap-10 justify-center'>
        <div className='flex items-center justify-center'>
          <img
            className="rounded-full border-4 w-40 h-40"
            src={userImage.userImage || "https://via.placeholder.com/150"}
            alt="Random placeholder image"
          />
        </div>

        <div className='flex flex-row items-start border px-6 py-0'>
          <div className='my-10 p-3'>
            <p>Membership Details</p>
            <p>Grace Iheme</p>
            <p>grace.iheme@gmail.com</p>
            <p>Status</p>
            <p>Verified Member</p>
            <p>ID Number</p>
            <p>AWA-MN0178</p>
          </div>

          <div className="border flex justify-start flex-col py-3 px-3 my-3">
            <div className="flex justify-center">
              <img
                src={AWA1}
                alt="Profile placeholder"
                className="w-16 h-16"
              />
            </div>
            <hr className="border-t border-gray-300 my-4" />
            <h2 className="font-bold">MEMBERSHIP ID</h2>
            <div className="flex justify-center items-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MEMBERSHIP-ID-AWA-MN0178"
                alt="Membership QR Code"
                className="w-16 h-16 p-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-between my-5'>
        <div className='flex flex-col w-[48%]'>
          <button 
          className='w-full py-4 my-2 rounded-md text-white bg-red-700'
          onClick={()=>navigate('/UpdateProfile')}>Update Profile</button>
          <button
            className='w-full py-4 bg-green-600 my-2 rounded-md text-white'
            onClick={() => navigate('/BenefitPrograms')}
          >
            View Events
          </button>
        </div>
        <div className='flex flex-col w-[48%]'>
          <button className='w-full p-4 bg-green-950 my-2 rounded-md text-white'>Benefits Program</button>
          <button
           className='w-full p-4 bg-yellow-500 my-2 rounded-md text-white'
           onClick={() => navigate('/EmpowermentPrograms')}>Empowerment Program</button>
        </div>
      </div>

      <div className="relative w-full h-80 border border-solid border-gray-400 rounded-lg p-4">
        <div className="absolute top-2 right-2">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 min-w-[120px] text-left"
            >
              {selectedOption}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 max-h-60 overflow-auto bg-white border border-gray-300 rounded shadow z-10">
                {options
                  .filter(option => option !== selectedOption)
                  .map(option => (
                    <div
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedOption(option)
                        setIsOpen(false)
                      }}
                    >
                      {option}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center h-full flex-col p-4">
          <img
            src={Kite}
            alt="Kite illustration"
            className="max-h-full max-w-full object-contain"
          />
          <div className="mt-4">
            <h1 className="text-2xl text-center">
              You have not made any donations yet.
            </h1>
          </div>
        </div>

      </div>
    </div>
  )
}
