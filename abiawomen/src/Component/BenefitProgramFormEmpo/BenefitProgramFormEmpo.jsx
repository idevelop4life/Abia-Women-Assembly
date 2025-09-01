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
    applicationComplete: "no", // default value
    previousExperience: "",
    goals: "",
    availability: "",
    letterOfIntent: "",
    areaOfInterest: "",
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

    // Handle checkbox separately
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

    // Optional: Manual validation for required radios
    if (formData.applicationComplete !== "yes" && formData.applicationComplete !== "no") {
      alert("❌ Please confirm whether the application is complete.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();

    // Append all form fields
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("identity_document", formData.identityType);
    formDataToSend.append("selected_benefit", formData.benefitType);
    formDataToSend.append("willingness_to_participate", formData.willingness);
    formDataToSend.append("application_form_submitted", formData.applicationComplete);
    formDataToSend.append("previous_experience", formData.previousExperience);
    formDataToSend.append("goals", formData.goals);
    formDataToSend.append("availability", formData.availability);
    formDataToSend.append("letter_of_intent", formData.letterOfIntent);
    formDataToSend.append("area_of_interest", formData.areaOfInterest);

    // Append files
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
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          identityType: "",
          benefitType: "",
          willingness: "no",
          applicationComplete: "no",
          previousExperience: "",
          goals: "",
          availability: "",
          letterOfIntent: "",
          areaOfInterest: "",
        });
        // Clear file inputs
        if (idFileRef.current) idFileRef.current.value = "";
        if (residenceFileRef.current) residenceFileRef.current.value = "";
        if (guardianFileRef.current) guardianFileRef.current.value = "";

        setIdentityFileName("");
        setResidenceFileName("");
        setGuardianFileName("");

        navigate("/MyDashboard");
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

      {/* First Name */}
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

      {/* Last Name */}
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

      {/* Proof of Identity Type */}
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

      {/* Upload Proof of Identity */}
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
          required
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

      {/* Area of Interest */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Area of Interest / Skill Focus</label>
        <select
          name="areaOfInterest"
          value={formData.areaOfInterest}
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

      {/* Previous Experience */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Previous Experience (if any)</label>
        <input
          type="text"
          name="previousExperience"
          value={formData.previousExperience}
          onChange={handleInputChange}
          placeholder="e.g., Tailoring for 2 years"
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Goals / What do you hope to gain */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          What do you hope to gain from this program?
        </label>
        <textarea
          name="goals"
          value={formData.goals}
          onChange={handleInputChange}
          rows="4"
          placeholder="Describe your goals, skills you want to learn, or how this program can help you..."
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Availability */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Preferred Availability</label>
        <div className="space-y-2">
          {["Mon-Wed", "Wed-Fri", "Weekend"].map((slot) => (
            <div key={slot} className="flex items-center">
              <input
                type="radio"
                id={`availability-${slot}`}
                name="availability"
                value={slot}
                checked={formData.availability === slot}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4"
                required
              />
              <label htmlFor={`availability-${slot}`}>{slot}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Letter of Intent */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Letter of Intent (Optional)
        </label>
        <textarea
          name="letterOfIntent"
          value={formData.letterOfIntent}
          onChange={handleInputChange}
          rows="4"
          placeholder="Optional: Share your motivation, background, or any additional information..."
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Application Completeness Confirmation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Application Form</h3>
        <p className="text-gray-700 mb-3">
          I confirm that this application is complete and all information is accurate:
        </p>

        <div className="flex space-x-6">
          <div className="flex items-center">
            <input
              type="radio"
              name="applicationComplete"
              id="applicationCompleteYes"
              value="yes"
              checked={formData.applicationComplete === "yes"}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4"
              required
            />
            <label htmlFor="applicationCompleteYes" className="font-medium">Yes</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              name="applicationComplete"
              id="applicationCompleteNo"
              value="no"
              checked={formData.applicationComplete === "no"}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="applicationCompleteNo" className="font-medium">No</label>
          </div>
        </div>

        <div className="mt-1 text-xs text-gray-500">
          Please confirm that all required fields are filled before submission.
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 px-4 rounded-md font-medium transition-colors ${
          isSubmitting ? "cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}