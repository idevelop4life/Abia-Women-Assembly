import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const PaymentPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    console.log("Uploaded:", file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    multiple: false
  });

  const handleNext = () => {
    if (uploadedFile) {
      // Replace this with your navigation or next step
      console.log("Next clicked with file:", uploadedFile);
      alert(`Next step! File uploaded: ${uploadedFile.name}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md space-y-6">
        <h2 className="text-lg font-semibold">Upload Receipt</h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
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

        <button
          onClick={handleNext}
          disabled={!uploadedFile}
          className={`w-full py-2 rounded text-white transition ${
            uploadedFile
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
