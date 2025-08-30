import React, { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BenefitProgramFormEmpo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identityType: "",
    benefitType: "",
    willingness: "no",
    applicationComplete: "no",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track file names for display
  const [identityFileName, setIdentityFileName] = useState("");
  const [residenceFileName, setResidenceFileName] = useState("");
  const [guardianFileName, setGuardianFileName] = useState("");

  const idFileRef = useRef(null);
  const residenceFileRef = useRef(null);
  const guardianFileRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? (checked ? "yes" : "no") : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileName = file ? file.name : "";

    if (e.target.name === "proof_of_identity") {
      setIdentityFileName(fileName);
    } else if (e.target.name === "proof_of_residence") {
      setResidenceFileName(fileName);
    } else if (e.target.name === "guardian_consent") {
      setGuardianFileName(fileName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("identity_document", formData.identityType);
    formDataToSend.append("selected_benefit", formData.benefitType);
    formDataToSend.append("willingness_to_participate", formData.willingness);
    formDataToSend.append("application_form_submitted", formData.applicationComplete);

    if (idFileRef.current?.files[0]) {
      formDataToSend.append("proof_of_identity", idFileRef.current.files[0]);
    }
    if (residenceFileRef.current?.files[0]) {
      formDataToSend.append("proof_of_residence", residenceFileRef.current.files[0]);
    }
    if (guardianFileRef.current?.files[0]) {
      formDataToSend.append("guardian_consent", guardianFileRef.current.files[0]);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:9000/benefit_program", {
        method: "POST",
        body: formDataToSend,
        headers: {
          token: token,
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Application submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          identityType: "",
          benefitType: "",
          willingness: "no",
          applicationComplete: "no",
        });
        // Clear file inputs and display
        idFileRef.current.value = "";
        residenceFileRef.current.value = "";
        guardianFileRef.current.value = "";
        setIdentityFileName("");
        setResidenceFileName("");
        setGuardianFileName("");

        // MyDashboard
        navigate("/MyDashboard")
        
      } else {
        alert("❌ Error: " + (result.error || "Submission failed"));
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("🚨 Failed to submit application. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const UploadBox = ({ onClick, label }) => (
    <div
      onClick={onClick}
      className="border border-dashed border-gray-400 bg-yellow-50 hover:bg-yellow-100 text-gray-700 p-4 rounded-md cursor-pointer text-center flex flex-col items-center gap-2 transition-colors"
    >
      <UploadCloud className="w-6 h-6 text-gray-600" />
      <span className="text-sm">{label}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Benefit Application Form</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Proof of Identity</label>
        <select
          name="identityType"
          value={formData.identityType}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select</option>
          <option value="passport">Passport</option>
          <option value="driver">Driver’s License</option>
          <option value="nationalID">National ID</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Upload Proof of Identity</label>
        <UploadBox
          onClick={() => idFileRef.current?.click()}
          label="Click to upload identity file"
        />
        <input
          type="file"
          name="proof_of_identity"
          ref={idFileRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,application/pdf"
        />
        {identityFileName && (
          <div className="flex items-center mt-1 text-sm">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded text-gray-800 text-xs flex-1 truncate">
              📄 {identityFileName}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIdentityFileName("");
                idFileRef.current.value = "";
              }}
              className="ml-2 text-red-500 hover:text-red-700 text-xs font-medium whitespace-nowrap"
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Area of Interest/Skill Focus</label>
        <select
          name="AreaofInterest"
          value={formData.identityType}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select</option>
          <option value="Soap">Soap & Detergent Production</option>
          <option value="Disinfectant">Disinfectant & Bleach Production</option>
          <option value="Perfume">Perfume & Oil Perfume Production</option>
          <option value="Tailoring">Tailoring & Basic Sewing</option>
        </select>

      </div>



      {/* <div className="mb-4">
        <label className="block font-medium mb-1">Upload Proof of Residence</label>
        <UploadBox
          onClick={() => residenceFileRef.current?.click()}
          label="Click to upload residence file"
        />
        <input
          type="file"
          name="proof_of_residence"
          ref={residenceFileRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,application/pdf"
        />
        {residenceFileName && (
          <div className="flex items-center mt-1 text-sm">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded text-gray-800 text-xs flex-1 truncate">
              📄 {residenceFileName}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setResidenceFileName("");
                residenceFileRef.current.value = "";
              }}
              className="ml-2 text-red-500 hover:text-red-700 text-xs font-medium whitespace-nowrap"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Benefit</label>
        <select
          name="benefitType"
          value={formData.benefitType}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select</option>
          <option value="Housing">Housing</option>
          <option value="Education">Education</option>
          <option value="Food Assistance">Food Assistance</option>
        </select>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          name="willingness"
          id="willingness"
          checked={formData.willingness === "yes"}
          onChange={handleInputChange}
          className="mr-2 h-4 w-4"
        />
        <label htmlFor="willingness">Willing to Participate</label>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Guardian Consent (if under 18)</label>
        <UploadBox
          onClick={() => guardianFileRef.current?.click()}
          label="Click to upload guardian consent"
        />
        <input
          type="file"
          name="guardian_consent"
          ref={guardianFileRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,application/pdf"
        />
        {guardianFileName && (
          <div className="flex items-center mt-1 text-sm">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded text-gray-800 text-xs flex-1 truncate">
              📄 {guardianFileName}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setGuardianFileName("");
                guardianFileRef.current.value = "";
              }}
              className="ml-2 text-red-500 hover:text-red-700 text-xs font-medium whitespace-nowrap"
            >
              Remove
            </button>
          </div>
        )}
      </div>


      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          name="applicationComplete"
          id="applicationComplete"
          checked={formData.applicationComplete === "yes"}
          onChange={handleInputChange}
          className="mr-2 h-4 w-4"
          required
        />
        <label htmlFor="applicationComplete">Application form complete</label>
      </div>

      Submit Button
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 px-4 rounded-md font-medium transition-colors ${
          isSubmitting ? "cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button> */}
    </form>
  );
}