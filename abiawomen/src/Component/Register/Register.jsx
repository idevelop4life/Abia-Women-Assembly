import React from 'react'
import {Country, State } from 'country-state-city';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SignIn() {
    const [country, setCountry] = React.useState('NG'); // Default to Nigeria
    const [state, setState] = React.useState('');
      const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className='mx-20'>
        <h1 className='text-4xl font-bold text-black text-center my-5'>Membership Registration Form</h1>
        <p>Abia Women Assembly is dedicated to empowering women and improving the well-being of our communities.</p>
        <div className='my-5'>
            <h2 className='my-5'>Last Name</h2>
            <input type="text" placeholder='Enter your last name' className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div className='my-5'>
            <h2 className='my-5'>First Name</h2>
            <input type="text" placeholder='Enter your first name' className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div className='my-5'>
            <h2 className='my-5'>Nationality</h2>
            <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className='block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 my-5'
            >
                {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                </option>
                ))}
            </select>
        </div>
        <div className='my-5'>
            <h2 className='my-5'>State/City</h2>
            <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className='block my-5 w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            >
                {State.getStatesOfCountry(country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                </option>
                ))}
            </select>
        </div>
        
            
        {/* <div className='my-5'>
            <h2 className='my-5'>Nationality</h2>
            <input type="text" placeholder='Enter your Nationality' className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div className='my-5'>
            <h2 className='my-5'>State/City</h2>
            <input type="date" className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div> */}
        <div className='my-5'>
            <h2 className='my-5'>Local Govt.</h2>
            <input className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div className="my-5">
            <h2 className="my-5">Gender</h2>
            <div className="flex gap-6 flex-col">
                <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="form-radio"
                    // onChange={handleChange} // add your handler if needed
                />
                <span className="ml-2">Male</span>
                </label>

                <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="form-radio"
                    // onChange={handleChange}
                />
                <span className="ml-2">Female</span>
                </label>
            </div>
        </div>
        <div className='my-5'>
            <h2 className='my-5'>Primary Phone Number</h2>
            <input className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div className='my-5'>
            <h2 className='my-5' aria-required>Email Address</h2>
            <input className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div className='my-5'>
            <h2 className='my-5'>Additional Contact Information optional</h2>
            <input className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>

        <div className="my-5">
            <h2 className="my-5">Marital Status</h2>
            <div className="flex gap-6 flex-col">
                <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="status"
                    value="Single"
                    className="form-radio"
                    // onChange={handleChange} // add your handler if needed
                />
                <span className="ml-2">Male</span>
                </label>

                <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="status"
                    value="Married"
                    className="form-radio"
                    // onChange={handleChange}
                />
                <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="status"
                    value="Divorced"
                    className="form-radio"
                    // onChange={handleChange}
                />
                <span className="ml-2">Female</span>
                </label>
            </div>
        </div>

        <div className='my-5'>
            <h2 className='my-5'>Date of Birth</h2>
            <input className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div className='my-5'>
            <h2 className='my-5'>Occupation</h2>
            <input className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div className='my-5'>
            <h2 className='my-5'>Occupation</h2>
            <input className='border border-gray-300 rounded px-4 py-2 w-full' placeholder='Full Name' />
            <input className='border border-gray-300 rounded px-4 py-2 w-full' placeholder='Phone Number'/>
            <input className='border border-gray-300 rounded px-4 py-2 w-full' placeholder='Occupation'/>
        </div>
        <div className='my-5'>
            <h2 className="my-5">Relationship with the next of kin</h2>
            <select className='border border-gray-300 rounded px-4 py-2 w-full'>
                <option value="Male">Father</option>
                <option value="Female">Mother</option>
            </select>
        </div>

        <div className='my-5'>
            <h2 className='my-5'>Password</h2>
            <div className='relative'>
                <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                className='border border-gray-300 rounded px-4 py-2 w-full pr-10' // Added pr-10 for icon space
                />
                <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
        <div className='my-5'>
            <h2 className='my-5'>Confirm Password</h2>
            <input type="password" placeholder='Confirm your password' className='border border-gray-300 rounded px-4 py-2 w-full' />
        </div>
        <div>
            

            <select class="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                How did you hear about us? 
                <option value="">Select an option</option>
                <option value="social_media">Social Media</option>
                
            </select>
            <button className=' rounded-lg bg-[#E02B2B] text-white px-4 py-2 mt-4 w-full my-5 text-sm'>Become a Member</button>
            <div class="flex items-center my-4">
                <div class="flex-grow border-t bg-gradient-to-r from-[#EAC22C] to-[#FFC52A4F]"></div>
                <span class="mx-4 text-gray-500">OR</span>
                <div class="flex-grow border-t bg-gradient-to-l from-[#EAC22C] to-[#FFC52A4F]"></div>
            </div>
            <div class="flex gap-4 justify-center">
                <a href="#" class="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                </a>
                
                <a href="#" class="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                </a>
                
                <a href="#" class="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#000000"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                </a>
            </div>
            <p className='py-5 text-center font-poppins'>Already have an account? <a className='underline cursor-pointer hover:text-blue-600 'to="/LogIn"><Link to="/Login">Log In</Link></a></p>

        </div>

    </div>
    
  )
}
