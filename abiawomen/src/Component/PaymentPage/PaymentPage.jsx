import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

export const PaymentPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [donationDate, setDonationDate] = useState(""); // date input
  const [amount, setAmount] = useState(""); // amount input
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    console.log("Uploaded:", file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: false,
  });

  const handleNext = async () => {
    if (!uploadedFile) {
      alert("Please upload a file first.");
      return;
    }

    if (!donationDate || !amount) {
      alert("Please enter donation date and amount.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", uploadedFile);
    formData.append("category", "Empowerment");
    formData.append("donation_date", donationDate);
    formData.append("amount_donated", amount);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/donations`, {
        method: "POST",
        body: formData,
        headers: {
          token: token, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Upload successful:", data);
          alert("File uploaded successfully!");
          navigate("/MyDonations");
        }
      } else {
        console.error("Upload failed:", response.statusText);
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md space-y-6">
        <h2 className="text-lg font-semibold">Upload Receipt</h2>

        {/* File Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDragActive ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-green-700">Drop your file here...</p>
          ) : uploadedFile ? (
            <p className="text-gray-800 font-medium">Uploaded: {uploadedFile.name}</p>
          ) : (
            <p className="text-gray-600">
              Click or drag a PDF or image file (JPG, PNG) to upload
            </p>
          )}
        </div>

        {/* Donation Date */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Donation Date</label>
          <input
            type="date"
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Donation Amount */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Amount Donated</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!uploadedFile || !donationDate || !amount}
          className={`w-full py-2 rounded text-white transition ${
            uploadedFile && donationDate && amount
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
