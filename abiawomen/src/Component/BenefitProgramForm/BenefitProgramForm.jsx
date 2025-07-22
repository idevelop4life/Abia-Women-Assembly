import React, { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

export default function BenefitApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    identityType: '',
    benefitType: '',
    willingness: false,
    applicationComplete: false,
  })

  const idFileRef = useRef(null)
  const residenceFileRef = useRef(null)
  const guardianFileRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    console.log(`${e.target.name} selected:`, e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const UploadBox = ({ onClick, label }) => (
    <div
      onClick={onClick}
      className="border border-dashed border-gray-400 bg-yellow-50 hover:bg-yellow-100 text-gray-700 p-4 rounded-md cursor-pointer text-center flex flex-col items-center gap-2"
    >
      <UploadCloud className="w-6 h-6 text-gray-600" />
      <span>{label}</span>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Benefit Application Form</h2>

      <div>
        <label className="block font-medium mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Proof of Identity</label>
        <select
          name="identityType"
          value={formData.identityType}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="">Select</option>
          <option value="passport">Passport</option>
          <option value="driver">Driver’s License</option>
          <option value="nationalID">National ID</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Upload Proof of Identity</label>
        <UploadBox onClick={() => idFileRef.current.click()} label="Click to upload identity file" />
        <input type="file" name="identityFile" ref={idFileRef} onChange={handleFileChange} className="hidden" />
      </div>

      <div>
        <label className="block font-medium mb-1">Upload Proof of Residence</label>
        <UploadBox onClick={() => residenceFileRef.current.click()} label="Click to upload residence file" />
        <input type="file" name="residenceFile" ref={residenceFileRef} onChange={handleFileChange} className="hidden" />
      </div>

      <div>
        <label className="block font-medium mb-1">Select Benefit</label>
        <select
          name="benefitType"
          value={formData.benefitType}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="">Select</option>
          <option value="housing">Housing</option>
          <option value="education">Education</option>
          <option value="food">Food Assistance</option>
        </select>
      </div>

      <div className="flex items-center">
        <input type="checkbox" name="willingness" checked={formData.willingness} onChange={handleInputChange} className="mr-2" />
        <label>Willing to Participate</label>
      </div>

      <div>
        <label className="block font-medium mb-1">Guardian Consent (if under 18)</label>
        <UploadBox onClick={() => guardianFileRef.current.click()} label="Click to upload guardian consent" />
        <input type="file" name="guardianConsent" ref={guardianFileRef} onChange={handleFileChange} className="hidden" />
      </div>

      <div className="flex items-center">
        <input type="checkbox" name="applicationComplete" checked={formData.applicationComplete} onChange={handleInputChange} className="mr-2" />
        <label>Application form complete</label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-4 rounded-md font-medium"
      >
        Submit Application
      </button>
    </form>
  )
}
