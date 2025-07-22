import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function BenefitPrograms() {
    const [bookmarked, setBookmarked] = useState(false); 
    const navigate = useNavigate();
  return (
    <div className='m-4'>
        <div className='border py-3 m-3'>
            <div className='py-3 px-3'>
                <div className='flex flex-row justify-between'>
                    <p className='font-bold'>
                    <span className='bg-yellow-300'>Leadership</span>
                    </p>
                    <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={bookmarked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                    </button>
                </div>
                <h2
                    className='font-bold text-[20px] cursor-pointer'
                    onClick={() => navigate('/BenefitProgramSub')}
                >
                    Mentorship Initiative
                </h2>
                <p>Connects women with experienced women leaders for guidance</p>
                <p className='font-bold'>
                    <span className='bg-blue-50'>Eligible</span>
                </p>
            </div>
        </div>
        <div className='border py-3 m-3'>
            <div className='py-3 px-3'>
                <div className='flex flex-row justify-between'>
                    <p className='font-bold'>
                    <span className='bg-green'>Health</span>
                    </p>
                    <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={bookmarked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                    </button>
                </div>
                <h2 className='font-bold text-[20px]'>Maternal Care Assistance</h2>
                <p>Access to prenatal and postnatal healthcare services</p>
                <p className='font-bold'>
                    <span className='bg-blue-50'>Eligible</span>
                </p>
            </div>
        </div>
        <div className='border py-3 m-3'>
            <div className='py-3 px-3'>
                <div className='flex flex-row justify-between'>
                    <p className='font-bold'>
                    <span className='bg-yellow'>Education</span>
                    </p>
                    <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={bookmarked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                    </button>
                </div>
                <h2 className='font-bold text-[20px]'>Scholarship Fund</h2>
                <p>Provides financial aid for higeher education pursuits</p>
                <p className='font-bold'>
                    <span className='bg-blue-50'>Eligible</span>
                </p>
            </div>
        </div>
    </div>
  )
}
