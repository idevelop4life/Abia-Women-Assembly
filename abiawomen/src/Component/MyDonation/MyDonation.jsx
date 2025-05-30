import React from 'react'

export default function MyDonation() {
  return (
    <div>
      <div>
        <p>Donations History</p>
        <p>Back</p>
      </div>
      <div> 
        <img
          src="https://picsum.photos/id/237/600/400"  // Specific image (black lab puppy)
          alt="Black labrador puppy"
          className="w-full h-full object-cover"
        />
      </div>
      <div> 
        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
        </select>
        <button>Make a Donation</button>
      </div>
      <div>
        <div> 
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
