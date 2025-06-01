import React from 'react'

export default function MyDashboard() {
  return (
    <div className='mx-10 my-10'>
        <h1 className='font-bold text-2xl my-10'>Welcome, Grace!<a></a></h1>
        <div className='flex flex-row gap-10 justify-center'> 
            <img  className="rounded-full border-4"src="https://picsum.photos/400/300" alt="Random placeholder image" />
            <div> 
                <div className='my-10 border p-3'> 
                    <p>Membership Details</p>
                    <p>Grace Iheme</p>
                    <p>grace.iheme@gmail.com</p>
                    <p>Status</p>
                    <p>Verified Member</p>
                    <p>ID Number</p>
                    <p>AWA-MN0178</p>
                </div>

            </div>
        </div>
        <div className='flex flex-row justify-between my-5'>
            <div className='flex flex-col w-[48%]'>
                <button className='w-full py-4 bg-red my-2 rounded-md text-white bg-red-700'>Update Profile</button>
                <button className='w-full py-4 bg-green-600 my-2 rounded-md text-white'>View Events</button>
            </div>
            <div className='flex flex-col w-[48%]'>
                <button className='w-full p-4 bg-green-950 my-2 rounded-md text-white'>Benefits Program</button>
                <button className='w-full p-4 bg-yellow-500 my-2 rounded-md text-white'>Empowerment Program</button>
            </div>
        </div>
        <div> 
        </div>
        <div>
            
        </div>
    </div>
  )
}
