import React from 'react'

export default function UpcomingEvent() {
  return (
    <div>
      <div className='pt-20 pb-5 px-10'> 
        <h1 className='text-3xl font-bold'>Events</h1>
      </div>
      <div className='border-t border-gray-300 my-4'></div>
      <div className='px-10'>
        <h2 className='text-2xl font-bold mb-4'>Upcoming Events</h2>
        <div className='my-5'> 
          <div className='border border-black '>
            <div className='px-4 py-2'>
              <h1 className='text-2xl font-bold'>Leadership Workshop</h1>
              <p className='text-gray-600'>August 20, 2025</p>
              <div class="flex flex-col justify-between items-start">
                <button class="bg-[#7A9736] text-white px-4 py-2 rounded">
                  Empowerment
                </button>
                <button class="self-end bg-[#A7130F] text-white px-4 py-2 rounded">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-10'>
        <h2 className='text-2xl font-bold mb-4'>Past Events</h2>
        <div className='my-5'> 
          <div className='border border-black '>
            <div className='px-4 py-2'>
              <h1 className='text-2xl font-bold'>Leadership Workshop</h1>
              <p className='text-gray-600'>August 20, 2025</p>
              <div class="flex flex-col justify-between items-start">
                <button class="bg-[#E02B2B] text-white px-4 py-2 rounded">
                  Growth
                </button>
                <button class="self-end bg-[#A7130F] text-white px-4 py-2 rounded">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
