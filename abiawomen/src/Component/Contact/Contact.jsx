// Contact.jsx
import React from 'react';

// Named export (no "default")
export default function Contact() {
  return (
    <div className='mx-20 my-20 flex flex-col'>
        <div>
            <h1 className='font-bold text-3xl'>Contact Us</h1>
            <p className='text-xl'>Have a question or need assistance? Send us a message and we'll get back to you shortly.</p>
        </div>
        <div className='flex flex-row justify-center mt-10 gap-10'>
            <div className='border-2 border-black'>
                <div className='flex flex-col justify-center p-10'>
                    <h2 className='font-bold text-xl'>Send us a message</h2>
                    <input className='rounded-md px-1 py-2 border-2 border-black my-5' placeholder="Your Name" />
                    <input className='rounded-md px-1 py-2 border-2 border-black my-5' placeholder="Your Email" />    
                    <textarea 
                        className="w-full px-4 py-3 text-lg rounded-md border-2 border-black my-5" 
                        placeholder="Message" 
                        />
                    <button className='w-fit bg-[#C9302A] text-white py-1 px-3 rounded text-sm mt-4 self-end'>
                        Send
                    </button>
                </div>

            </div>
            <div className='border-2 border-black px-5 h-1/2'>
                <img
                    src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3Cpath d='M8 10h8'/%3E%3Cpath d='M8 14h6'/%3E%3C/svg%3E"
                    alt="Messenger"
                    className="h-12 w-12 text-blue-500 flex justify-center items-center" // 48px (12 * 4)
                />
                <h2 className='font-bold'>Chat With Us</h2>
                <p>Start a conversation with our team</p>
            </div>
        </div>
        
    </div>
  );
}