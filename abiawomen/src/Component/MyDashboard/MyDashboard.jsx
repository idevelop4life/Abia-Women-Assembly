export default function MyDashboard() {
  return (
    <div className='mx-10 my-10'>
        <h1 className='font-bold text-2xl my-10'>Welcome, Grace!<a></a></h1>
        <div className='flex flex-row gap-10  justify-center'> 
            <div className='flex items-center justify-center'>
                <img className="rounded-full border-4 w-40 h-40" src="https://picsum.photos/400/300" alt="Random placeholder image" />
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
                <div className=" border flex justify-start flex-col py-3 px-3 my-3">
                    <div className="flex justify-center">
                        <img 
                        src="https://picsum.photos/200/200" 
                        alt="Profile placeholder"
                        className="w-16 h-16"
                        />

                    </div>
                    <hr className="border-t border-gray-300 my-4" />
                    <h2 className="font-bold">MEMBERSHIP ID</h2>
                    <div className="flex justify-center items-center"> {/* Centering container */}
                    <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MEMBERSHIP-ID-AWA-MN0178" 
                        alt="Membership QR Code"
                        className="w-16 h-16 borde p-1"
                    />
                    </div>
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