import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    setCertificateId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!certificateId) {
      return setErrorMessage("Please Enter the Valid Certificate ID.");
    }
    setErrorMessage(null);
    setCertificateDetails(null);
    try {
      const res = await fetch(`/api/backend3/getCertificate/${certificateId}`);
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message || "Failed to verify certificate.");
        return setErrorMessage(data.message);
      } else {
        setCertificateDetails(data.certificate);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="font-tw-cen text-3xl text-gray-800 text-center">
        Verify Certificate
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 ">
        <div>
          <Label value="Enter Certificate ID:" className="text-xl" />
          <TextInput
            id="certificateId"
            type="text"
            onChange={handleInputChange}
            className=""
            placeholder="Certificate ID"
            required
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            gradientDuoTone="pinkToOrange"
            outline
            className=""
          >
            Verify
          </Button>
        </div>
      </form>
      {certificateDetails && (
        <div className="mt-6 p-4 bg-white border border-blue-400 text-black rounded">
          <h3 className="text-xl font-bold">Certificate Details</h3>
          <p>
            <strong>Name:</strong> {certificateDetails.name}
          </p>
          <p>
            <strong>Certificate Number:</strong>{" "}
            {certificateDetails.certificateNumber}
          </p>
          <p>
            <strong>Issue Date:</strong>{" "}
            {new Date(certificateDetails.issueDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Course:</strong> {certificateDetails.course}
          </p>
          <p>
            <strong>Course Time:</strong> {certificateDetails.courseTime}
          </p>
        </div>
      )}
      {errorMessage && (
        <Alert className="mt-5" color="failure">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
