import React from 'react'

export default function UpdateProfile() {
  return (
    <div>
      <div>
        <img/>
        <button>Upload</button>
      </div>
      <div>
        <div>
          <h3>Full Name</h3>
          <input type="text" />
        </div>
        <div>
          <h3>Email Address</h3>
          <input type="text" />
        </div>
        <div>
          <h3>Phone Number</h3>
          <input type="text" />
        </div>
        <div>
          <div>
            <h3>Country</h3>
            <input type="text" />
          </div>
          <div>
            <h3>State of Origin</h3>
            <input type="text" />
          </div>
        </div>
        <div>
          <h3>Change Password</h3>
          <input type="text" />
        </div>
        <div>
          <h3>Confirm Password</h3>
          <input type="text" />
        </div>
        <div>
          <button>CANCEL</button>
          <button>SAVE CHANGES</button>
        </div>

      </div>
    </div>
  )
}
