import React, { useState } from 'react';
import { Country, State } from 'country-state-city';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SocialButton from '../SocialButton/SocialButton'

export default function SignIn() {
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    nationality: 'NG',
    state_city: '',
    local_government: '',
    gender: '',
    primary_phone: '',
    email: '',
    additional_contact_info: '',
    marital_status: '',
    date_of_birth: '',
    occupation: '',
    next_of_kin_name: '',
    next_of_kin_phone: '',
    next_of_kin_occupation: '',
    relationship_with_next_of_kin: '',
    password: '',
    confirm_password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      alert('Registration successful!');
      // Optionally redirect or clear form here
    } catch (err) {
      setError('Network error', err);
    }
  };

  return (
    <div className='mx-20'>
      <h1 className='text-4xl font-bold text-black text-center my-5'>Membership Registration Form</h1>
      <p>Abia Women Assembly is dedicated to empowering women and improving the well-being of our communities.</p>

      {error && <p className="text-red-500 my-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Last Name */}
        <div className='my-5'>
          <h2 className='my-5'>Last Name</h2>
          <input
            type="text"
            name="last_name"
            placeholder='Enter your last name'
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* First Name */}
        <div className='my-5'>
          <h2 className='my-5'>First Name</h2>
          <input
            type="text"
            name="first_name"
            placeholder='Enter your first name'
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nationality */}
        <div className='my-5'>
          <h2 className='my-5'>Nationality</h2>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className='block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 my-5'
            required
          >
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* State/City */}
        <div className='my-5'>
          <h2 className='my-5'>State/City</h2>
          <select
            name="state_city"
            value={formData.state_city}
            onChange={handleChange}
            className='block my-5 w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            required
          >
            <option value="">Select State/City</option>
            {State.getStatesOfCountry(formData.nationality).map((s) => (
              <option key={s.isoCode} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Local Government */}
        <div className='my-5'>
          <h2 className='my-5'>Local Govt.</h2>
          <input
            name="local_government"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.local_government}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="my-5">
          <h2 className="my-5">Gender</h2>
          <div className="flex gap-6 flex-col">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                className="form-radio"
                onChange={handleChange}
                checked={formData.gender === 'Male'}
                required
              />
              <span className="ml-2">Male</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                className="form-radio"
                onChange={handleChange}
                checked={formData.gender === 'Female'}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        {/* Primary Phone Number */}
        <div className='my-5'>
          <h2 className='my-5'>Primary Phone Number</h2>
          <input
            name="primary_phone"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.primary_phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className='my-5'>
          <h2 className='my-5' aria-required>Email Address</h2>
          <input
            type="email"
            name="email"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Additional Contact Information */}
        <div className='my-5'>
          <h2 className='my-5'>Additional Contact Information (optional)</h2>
          <input
            name="additional_contact_info"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.additional_contact_info}
            onChange={handleChange}
          />
        </div>

        {/* Marital Status */}
        <div className="my-5">
          <h2 className="my-5">Marital Status</h2>
          <div className="flex gap-6 flex-col">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="marital_status"
                value="Single"
                className="form-radio"
                onChange={handleChange}
                checked={formData.marital_status === 'Single'}
                required
              />
              <span className="ml-2">Single</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="marital_status"
                value="Married"
                className="form-radio"
                onChange={handleChange}
                checked={formData.marital_status === 'Married'}
              />
              <span className="ml-2">Married</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="marital_status"
                value="Divorced"
                className="form-radio"
                onChange={handleChange}
                checked={formData.marital_status === 'Divorced'}
              />
              <span className="ml-2">Divorced</span>
            </label>
          </div>
        </div>

        {/* Date of Birth */}
        <div className='my-5'>
          <h2 className='my-5'>Date of Birth</h2>
          <input
            type="date"
            name="date_of_birth"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Occupation */}
        <div className='my-5'>
          <h2 className='my-5'>Occupation</h2>
          <input
            name="occupation"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </div>

        {/* Next of Kin Name */}
        <div className='my-5'>
          <h2 className='my-5'>Next of Kin Full Name</h2>
          <input
            name="next_of_kin_name"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.next_of_kin_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Next of Kin Phone */}
        <div className='my-5'>
          <h2 className='my-5'>Next of Kin Phone Number</h2>
          <input
            name="next_of_kin_phone"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.next_of_kin_phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Next of Kin Occupation */}
        <div className='my-5'>
          <h2 className='my-5'>Next of Kin Occupation</h2>
          <input
            name="next_of_kin_occupation"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.next_of_kin_occupation}
            onChange={handleChange}
            required
          />
        </div>

        {/* Relationship with Next of Kin */}
        <div className='my-5'>
          <h2 className='my-5'>Relationship with Next of Kin</h2>
          <input
            name="relationship_with_next_of_kin"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.relationship_with_next_of_kin}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className='my-5'>
          <h2 className='my-5'>Password</h2>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className='border border-gray-300 rounded px-4 py-2 w-full'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className='my-5'>
          <h2 className='my-5'>Confirm Password</h2>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirm_password"
            className='border border-gray-300 rounded px-4 py-2 w-full'
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <div className='my-5 flex gap-2 items-center'>
          <input type="checkbox" name="remember_me" />
          <label>Remember Me</label>
          <p className='text-gray-400'>
            By registering, you agree to our{' '}
            <Link to='/privacy-policy' className='text-blue-500'>
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to='/terms-conditions' className='text-blue-500'>
              Terms & Conditions
            </Link>.
          </p>
        </div>

       
        <button
          type="submit"
          className='#E02B2B text-white rounded-lg py-2 px-4 w-full bg-[#E02B2B]'
        >
          Become a Member
        </button>
        <div className="flex items-center justify-center gap-4 my-6">
  <div className="h-px w-full bg-gray-300"></div>
  <p className="text-gray-500 text-sm whitespace-nowrap">OR</p>
  <div className="h-px w-full bg-gray-300"></div>
</div>
        <SocialButton/>

        <p className="text-center mt-4 text-gray-600">
  Already have an account?{' '}
  <a href="/login" className="text-[#E02B2B] hover:underline">
    Log in
  </a>
</p>
      </form>
    </div>
  );
}
