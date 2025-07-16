import React, { useEffect, useState } from 'react';

export default function UpdateProfile({ userImage }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  // Fetch user info on component mount
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('http://localhost:9000/auth/edit', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            headers: { token: localStorage.token },
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();

        // Set the form data based on response
        setFormData({
          full_name: `${userInfo.first_name || ''} ${userInfo.last_name || ''}`,
          email: userInfo.email || '',
          phone: userInfo.primary_phone || '',
          country: userInfo.nationality || '',
          state: userInfo.state_city || '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="m-20">
      <div className="flex items-center gap-4 justify-center">
        <div className="w-40 h-40 rounded-full bg-black border-4 overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={userImage}
            alt="User Avatar"
          />
        </div>
        <button className="whitespace-nowrap p-2 border rounded-lg">Upload</button>
      </div>

      <div>
        <div>
          <h3 className="py-2">Full Name</h3>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <h3 className="py-2">Email Address</h3>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <h3 className="py-2">Phone Number</h3>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div className="flex flex-row justify-between gap-4">
          <div className="w-full">
            <h3 className="py-2">Country</h3>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div className="w-full">
            <h3 className="py-2">State of Origin</h3>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        </div>

        <div>
          <h3 className="py-2">Change Password</h3>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <h3 className="py-2">Confirm Password</h3>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div className="my-5 flex justify-between">
          <button className="border p-4 mx-3 bg-red-900 text-white rounded-lg">CANCEL</button>
          <button className="border p-4 mx-3 bg-green-800 text-white rounded-lg">SAVE CHANGES</button>
        </div>
      </div>
    </div>
  );
}
