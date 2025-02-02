import { TextInput, Button, Select, Label, Alert } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CertificateForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    certificateNumber: "",
    issueDate: "",
    course: "",
    grade: "",
    courseTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/backend3/addCertificate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return setErrorMessage(
           data.message
        );
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="p-8 mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Add Certificate Details
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-8 sm:grid-cols-2">
        <div>
          <Label value="name" />
          <TextInput
            id="name"
            placeholder="Enter student name"
            onChange={handleChange}
            required
            className="h-12 text-lg"
          />
        </div>

        <div>
          <Label value="Certificate Number" />
          <TextInput
            id="certificateNumber"
            placeholder="Enter certificate number"
            onChange={handleChange}
            required
            className="h-12 text-lg"
          />
        </div>

        <div>
          <Label value="Issue Date" />
          <TextInput
            id="issueDate"
            type="date"
            onChange={handleChange}
            required
            className="h-12 text-lg"
          />
        </div>

        <div>
          <Label value="course" />
          <Select id="course" onChange={handleChange} className="h-12 text-lg">
            <option value="">Select Course</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
          </Select>
        </div>

        <div>
          <Label value="Course Duration" />
          <TextInput
            id="courseTime"
            placeholder="Enter course duration"
            onChange={handleChange}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <Button
            gradientDuoTone="pinkToOrange"
            outline
            type="submit"
            className="w-full text-lg bg-teal-600 hover:bg-teal-700"
          >
            Submit Certificate
          </Button>
        </div>
      </form>
      {errorMessage && (
        <Alert color="failure" className="mt-4 text-red-500 text-center">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
