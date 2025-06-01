import React from 'react'

export default function MyDonation() {
  return (
    <div className='mx-10 my-10'>
      <div className='flex flex-row justify-between my-2'>
        <p className='font-bold'>Donations History</p>
        <p className='font-bold'>Back</p>
      </div>
      <div> 
        <img
          src="https://picsum.photos/id/237/600/400"  // Specific image (black lab puppy)
          alt="Black labrador puppy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className='flex flex-row items-center justify-center my-5'> 
        <select name="Select Month" id="cars" className='mx-5 py-5 px-10 border  rounded-lg'>
          <option value="January">January</option>
          <option value="Febuary">February</option>
          <option value="March">March</option>
          <option value="All Time">All Time</option>
        </select>
        <button className='bg-green-800 py-5 px-10 rounded-lg'>Make a Donation</button>
      </div>
      <div>
        <div className='border-t-2 border-black'></div>
        <div className=' border-b-2 border-black flex flex-row justify-between my-2'> 
          <h1>January 6 2023</h1>
          <h1>Empowerment Program</h1>
          <div>
            <h1>NGN 10,500</h1>
            <p>Completed</p>
          </div>
        </div>
        <div className=' border-b-2 border-black flex flex-row justify-between my-2'> 
          <h1>January 6 2023</h1>
          <h1>Empowerment Program</h1>
          <div>
            <h1>NGN 10,500</h1>
            <p>Completed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
