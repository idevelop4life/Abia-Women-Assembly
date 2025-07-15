import React from 'react'
import image1 from "../../assets/about_image_1.png"
import image2 from "../../assets/about_image_2.png"
import image3 from "../../assets/about_image_3.png"
import AWAOutreact from "../../assets/AWA2Outreac.png"
import image5 from "../../assets/image5.png"
import image6 from "../../assets/image6.png"
import image7 from "../../assets/image7.png"
import image8 from "../../assets/image8.png"

export default function EventsGallery() {
  return (
    <div className="px-10">
        <div>
            <h1 className="text-3xl font-bold py-5 text-[#194911]">OUR VOICE OUR IMPACT</h1>
        </div>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex gap-2 mb-5'>
            <img src={image1} alt="Event" className="w-1/2 h-96 object-cover rounded-lg" />
            <img src={image2} alt="Event" className="w-1/2 h-96 object-cover rounded-lg" />
        </div>

        <div className='flex gap-2'>
            <img src={image3} alt="Event" className="w-1/3 h-96 object-cover rounded-lg" />
            <img src={AWAOutreact} alt="Event" className="w-1/3 h-96 object-cover rounded-lg" />
            <img src={image5} alt="Event" className="w-1/3 h-96 object-cover rounded-lg" />
        </div>
</div>


        <div className="flex flex-col md:flex-row justify-center w-full"> 
            <div className='w-full md:w-1/2 md:pr-10'>
                <img src={image6} alt="Event" className="w-full h-60 object-cover rounded-lg mb-5"/>
                <img src={image7} alt="Event" className="w-full h-60 object-cover rounded-lg mb-5"/>
                <img src={image8} alt="Event" className="w-full h-60 object-cover rounded-lg mb-5"/>
            </div>
            <div className='w-full md:w-1/2 md:pl-10 mt-10 md:mt-0'>
                <div className='p-10 my-12 bg-[#F2E3C4]'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <p className='my-5'>The support from AWA has transofrmed me to pursue my dreams</p>
                    </div>
                    <p>Fatima O.</p>

                </div>
                <div className=' p-10 my-10 bg-[#F2E3C4]'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <p className='my-5'>The support from AWA has transofrmed me to pursue my dreams</p>
                    </div>
                    <p>Fatima O.</p>

                </div>
                <div className='p-10 my-10 bg-[#F2E3C4]'>
                     <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <p className='my-5'>The support from AWA has transofrmed me to pursue my dreams</p>
                    </div>
                    <p>Fatima O.</p>

                </div>
                <button className='w-full bg-[#E02B2B] text-white px-4 py-2 rounded my-5'>See More Stories</button>
            </div>

        </div>
    </div>
  )
}
