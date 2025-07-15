import React from 'react'
import imageUrl from '../../assets/ChatGPT Image May 5, 2025, 03_17_05 PM 1.jpg'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  return (
    <div className="">
        <div className="relative h-screen">
            <img 
                src={imageUrl}
                alt="Hero Image" 
                className="absolute w-full h-full object-cover"
            />
    
            <div className="absolute bottom-0 left-0 flex flex-col items-start text-white pl-8  mb-20">
                <h1 className="text-4xl font-bold mb-4">Empowering Women.</h1>
                <h1 className="text-4xl font-bold">Building Communities.</h1>
            </div>
            <div className="">
                <button className="absolute bottom-0 left-0 ml-8 mb-8 bg-[#C9302A] text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
                    Become a Member
                </button>
                <button className="absolute bottom-0 left-0 translate-x-[120%] ml-8 mb-8 bg-[#EAC22C] text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                onClick={() => navigate('/MakeDonation')}>
                    Make a Donation
                </button>
            </div>
            

        </div>
    </div>
  )
}
