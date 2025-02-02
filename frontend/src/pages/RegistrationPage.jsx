import { useNavigate, useLocation } from "react-router-dom";
import esewa from "../assets/images/esewa.png";
import khalti from "../assets/images/khalti.png";
import { TextInput, Label, Card } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { course } = location.state || {};

  if (!course) {
    console.log("Course data is missing:", location.state);
    return <p className="font-tw-cen">Course not found</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      courseName: course.title,
      courseDuration: course.courseDuration,
      totalAmount: course.totalAmount,
      timeSlot: course.timeSlot,
    };
    console.log(submissionData);
    try {
      const res = await fetch("/api/backend2/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(
          "Admission successful! Please pay the fee using Esewa or Khalti."
        );
        navigate("/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <Card className="bg-white my-16 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-tw-cen font-semibold text-center text-gray-800 mb-6">
          Admission for {course.title}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <Label value="Full Name" />
            <TextInput
              type="text"
              id="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label value="Parent's Name" />
            <TextInput
              type="text"
              id="parentName"
              placeholder="Enter your  Parent's name"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <Label value="Email" />
            <TextInput
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label value="Number" />
            <TextInput
              type="number"
              id="number"
              placeholder="Enter your Number"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label value="Address" />
            <TextInput
              type="text"
              id="address"
              placeholder="Enter your Address"
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit Registration
            </button>
          </div>
        </form>

        {/* Payment Section */}
        <div className="payment-section bg-gray-100 p-3 mt-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Choose Payment Method
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Click below to proceed with your payment using either eSewa or
            Khalti.
          </p>

          {/* Payment Buttons for eSewa and Khalti */}
          <div className="flex justify-center space-x-4 ">
            {/* eSewa Button */}
            <button className="payment-butto hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition duration-300">
              <img
                src={esewa}
                alt="Pay with eSewa"
                className="mx-auto rounded"
                style={{ width: "40px", height: "auto" }}
              />
            </button>

            {/* Khalti Button */}
            <button className="payment-button hover:bg-yellow-600 text-white font-tw-cen py-2 px-3 rounded-lg transition duration-300">
              <img
                src={khalti}
                alt="Pay with Khalti"
                className="mx-auto rounded"
                style={{ width: "40px", height: "auto" }}
              />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
