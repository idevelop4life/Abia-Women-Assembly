import React, { useEffect, useState } from 'react';

export default function UpdateProfile({ userImage, userInfo }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  // Fetch user info from backend if userInfo prop is not provided
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('http://localhost:9000/auth/edit', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();

        setFormData({
          full_name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          email: data.email || '',
          phone: data.primary_phone || '',
          country: data.nationality || '',
          state: data.state_city || '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    if (userInfo) {
      setFormData({
        full_name: `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim(),
        email: userInfo.email || '',
        phone: userInfo.primary_phone || '',
        country: userInfo.nationality || '',
        state: userInfo.state_city || '',
        password: '',
        confirmPassword: '',
      });
    } else {
      fetchUserInfo();
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Optional: Validate passwords before sending (match, non-empty)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const [first_name, ...rest] = formData.full_name.trim().split(' ');
    const last_name = rest.join(' ');

    try {
      const response = await fetch('http://localhost:9000/auth/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email: formData.email,
          primary_phone: formData.phone,
          nationality: formData.country,
          state_city: formData.state,
          // Only send password if it's filled
          ...(formData.password ? { password: formData.password } : {}),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      console.log('Updated successfully:', result);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error('Update error:', error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="m-20">
      <div className="flex items-center gap-4 justify-center">
        <div className="w-40 h-40 rounded-full bg-black border-4 overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={userImage || "https://res.cloudinary.com/dvozhxxtl/image/upload/default_avatar.png"}
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
            placeholder="Leave blank to keep current password"
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
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="my-5 flex justify-between">
          <button className="border p-4 mx-3 bg-red-900 text-white rounded-lg">CANCEL</button>
          <button
            className="border p-4 mx-3 bg-green-800 text-white rounded-lg"
            onClick={handleSave}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}
