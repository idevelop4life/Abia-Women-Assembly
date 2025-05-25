import React from 'react'
import aboutImg from '../../assets/AboutImage.png'

export default function AboutPage() {
  return (
    <div className='mx-10 my-10'>
        <div className='py-5'>
            <h2 className='text-2xl font-bold'>
                About AWA
            </h2>
            <p>
                Abia Women Assembly is dedicated to empowering women and imporving the well-being of our communities.
            </p>

        </div>
        <div className='py-5'>
            <h2 className='text-2xl font-bold'>Our Mission</h2>
            <p>
                Through advocacy, education, and community initiatives, we aim to support women's rights, promote their active participation in society, and drive prositive change for a better future. 
            </p>

        </div>
        <div>
            <img src={aboutImg} alt="About AWA" />
        </div>
        <div>
            <button className='bg-[#E02B2B] mx-10 my-5 px-5 py-2 text-white'>Learn More</button>
        </div>
    </div>
  )
}
