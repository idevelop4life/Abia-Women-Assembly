import React from 'react'
import e1 from '../../assets/e 1.png'
import e2 from '../../assets/e 2.png'
import e3 from '../../assets/e 3.png'

export default function EmpowermentPrograms() {
  return (
    <div>
        <div className='px-3'>
            <h1 className='text-5xl font-bold text-green-900 mb-4'>Empowerment <br/>Programs</h1>
        </div>
        <div className='border-t border-b border-gray-200 py-6 px-3 flex flex-row justify-between'>
            <div className='flex flex-row'>
                <img src={e1} alt="Heart Handshake" width="50"/>
                <div>
                    <h2 className='font-bold text-xl'>Mentorship Initiative</h2>
                    <p>Connects women with experienced women leaders for guidance</p>
                </div>
            </div>
            <div>
                <button className="border p-2 m-3 bg-[#E5AB19] text-white rounded-lg">
                Apply
                </button>            
            </div>
        </div>
        <div className='border-t border-b border-gray-200 py-6 px-3 flex flex-row justify-between'>
            <div className='flex flex-row'>
                <img src={e2} alt="Heart Handshake" width="50"/>
                <div>
                    <h2 className='font-bold text-xl'>Skill Development</h2>
                    <p>Connects women with experienced women leaders for guidance</p>
                </div>
            </div>
            <div>
                <button className="border p-2 m-3 bg-[#E5AB19] text-white rounded-lg">
                Apply
                </button>            
            </div>
        </div>
        <div className='border-t border-b border-gray-200 py-6 px-3 flex flex-row justify-between'>
            <div className='flex flex-row'>
                <img src={e3} alt="Heart Handshake" width="50"/>
                <div>
                    <h2 className='font-bold text-xl'>Business Support</h2>
                    <p>Guidance and resources for entrepreneurs</p>
                </div>
            </div>
            <div>
                <button className="border p-2 m-3 bg-[#E5AB19] text-white rounded-lg">
                Apply
                </button>            
            </div>
        </div>
    </div>
  )
}
