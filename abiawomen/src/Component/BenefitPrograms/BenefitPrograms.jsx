import React, { useState } from 'react'

export default function BenefitPrograms() {
    const [bookmarked, setBookmarked] = useState(false); 
  return (
    <div className='m-4'>
        <div className='border py-3'>
            <div className='py-3 px-3'>
                <div className='flex flex-row justify-between'>
                    <p>Leadership</p>
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
                <h2 className='font-bold text-[20px]'>Mentorship Initiative</h2>
                <p>Connects women with experienced women leaders for guidance</p>
                <div className='bg-blue-50'>
                    <p className='font-bold'>Eligible</p>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div>
                    <p>Leadership</p>
                   <img/>
                </div>
                <h2>Mentorship Initiative</h2>
                <p>Connects women with experienced women leaders for guidance</p>
                <div>
                    <p>Eligible</p>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div>
                    <p>Leadership</p>
                   <img/>
                </div>
                <h2>Mentorship Initiative</h2>
                <p>Connects women with experienced women leaders for guidance</p>
                <div>
                    <p>Eligible</p>
                </div>
            </div>
        </div>
    </div>
  )
}
