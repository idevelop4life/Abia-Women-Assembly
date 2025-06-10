import React from 'react'

export default function UpdateProfile() {
  return (
    <div className='m-20'>
    <div className="flex items-center gap-4 justify-center">
      <img 
        className="rounded-full border-4 w-40 h-40" 
        src="https://picsum.photos/400/300" 
        alt="Random placeholder" 
      />
      <button className="whitespace-nowrap p-2 border rounded-lg">Upload</button>

    </div>
      <div>
        <div>
          <h3 className='py-2'>Full Name</h3>
          <input type="text" className="w-full border p-2" />
        </div>
        <div>
          <h3 className='py-2'>Email Address</h3>
          <input type="text" className='w-full border p-2' />
        </div>
        <div>
          <h3 className='py-2'>Phone Number</h3>
          <input type="text" className='w-full border p-2' />
        </div>
        <div className='flex flex-row justify-between'> 
          <div>
            <h3 className='py-2'>Country</h3>
            <input type="text" className='w-full border p-2'/>
          </div>
          <div>
            <h3 className='py-2'>State of Origin</h3>
            <input type="text" className='w-full border p-2'/>
          </div>
        </div>
        <div>
          <h3 className='py-2'>Change Password</h3>
          <input type="text" className='w-full border p-2'/>
        </div>
        <div>
          <h3 className='py-2'>Confirm Password</h3>
          <input type="text" className='w-full border p-2'/>
        </div>
        <div className='my-5 flex justify-between'>
          <button className='border p-4 mx-3 bg-red-900 text-white rounded-lg'>CANCEL</button>
          <button className='border p-4 mx-3 bg-green-800 text-white rounded-lg'>SAVE CHANGES</button>
        </div>

      </div>
    </div>
  )
}
