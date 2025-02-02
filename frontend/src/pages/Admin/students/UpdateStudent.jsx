import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Label,
  TextInput,
  Card,
  Select,
  Textarea,
} from "flowbite-react";
// import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateStudent() {
  const { studentId } = useParams();
  // console.log(studentId);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contactNumber: "",
    email: "",
    address: "",
    timeSlot: "",
    courseType: "",
    courseDuration: "",
    totalAmount: "",
    educationBackground: "",
    parentName: "",
    parentNumber: "",
    parentRelationship: "",
  });
  const [trainings, setTrainings] = useState([]);
  const contentRef = useRef(null);
  // const reactToPrintFn = useReactToPrint({ contentRef });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchTraining = async () => {
        const res = await fetch(
          `/api/backend4/getStudentAdmission/${studentId}`
        );
        console.log("Response Status:", res.status);
        const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setFormData(data || {});
        }
        console.log(data);
      };
      fetchTraining();
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/backend4/update/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await res.json();
      // console.log("API Data", data);
      if (!res.ok) {
        toast.error("Failed to update Student Admission");
        return;
      } else {
        toast.success("Student Updated successfully");
        navigate("/dashboard?tab=student-dahsboard");
      }
    } catch (error) {
      toast.error("Failed to update Student Admission");
    }
  };

  useEffect(() => {
    const fetchCourseTypes = async () => {
      try {
        const res = await fetch(`/api/backend6/getTrainings`);
        if (!res.ok) {
          console.error("Failed to fetch course types.");
          return;
        }
        const data = await res.json();
        // console.log("Fetched course data:", data);
        setTrainings(data.trainings);
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
    };
    fetchCourseTypes();
  }, []);
  const handleCourseSelection = (e) => {
    const selectedCourseId = e.target.value;
    // console.log("Selected course ID:", selectedCourseId);

    const selectedCourse = trainings.find(
      (training) => training._id === selectedCourseId
    );

    if (selectedCourse) {
      setFormData({
        formData,
        courseType: selectedCourse.title,
        // selectedCourseId: selectedCourse._id,
        timeSlot: selectedCourse.timeSlot,
        courseDuration: selectedCourse.duration,
        totalAmount: selectedCourse.fees,
      });
    } else {
      setFormData({
        ...formData,
        courseType: "",
        selectedCourseId: "",
        timeSlot: "",
        courseDuration: "",
        totalAmount: "",
      });
    }
  };

  return (
    <div ref={contentRef} className="container mx-auto">
      <Card>
        <h1 className="flex gap-1 text-xl font-bold">
          Student Admission Form
          <span className="hidden print:block">Next Infosys</span>
        </h1>
        <form onSubmit={handleSubmit} id="admissionForm">
          <div>
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <Label value="Student Name" />
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Enter full name"
                  required
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </div>

              {/* DOB */}
              <div>
                <Label value="Date of Birth" />
                <TextInput
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  onChange={handleInputChange}
                  value={formData.dob ? formData.dob.split("T")[0] : ""}
                />
              </div>

              {/* Contact Number */}
              <div>
                <Label htmlFor="contactNumber" value="Contact Number" />
                <TextInput
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="Enter contact number"
                  required
                  onChange={handleInputChange}
                  value={formData.contactNumber}
                />
              </div>

              {/* Email */}
              <div>
                <Label value="Email Address" />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <Label htmlFor="address" value="Address" />
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter full address"
                  required
                  rows={3}
                  onChange={handleInputChange}
                  value={formData.address}
                />
              </div>
              {/* Course Details */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-bold mb-2">Course Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {/* 1.Course types */}
                    <Label value="Course Type" />
                    <Select
                      id="courseType"
                      name="courseType"
                      value={formData._id}
                      required
                      readOnly
                      onChange={handleCourseSelection}
                    >
                      <option value={""}> {formData.courseType} </option>
                      {trainings.length > 0 ? (
                        trainings.map((training) => (
                          <option key={training._id} value={training._id}>
                            {training.title}
                          </option>
                        ))
                      ) : (
                        <option value="">No training available</option>
                      )}
                    </Select>
                  </div>

                  {/* 2.Time Slot */}
                  <div>
                    <Label value="Preferred Time Slot" />
                    <TextInput
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      required
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* 3.Course Duration */}
                  <div>
                    <Label value="Course Duration" />
                    <TextInput
                      id="courseDuration"
                      name="courseDuration"
                      placeholder="Enter a duration "
                      value={formData.courseDuration}
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* 4.Total Amount */}
                  <div>
                    <Label value="Total Amount" />
                    <TextInput
                      id="totalAmount"
                      name=" totalAmount"
                      placeholder=" Total Amount "
                      value={formData.totalAmount}
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Education Background */}
              <div className="md:col-span-2">
                <div>
                  <Label value=" Education Background " />
                  <TextInput
                    id="educationBackground"
                    name="educationBackground"
                    placeholder="Enter school/college name"
                    required
                    onChange={handleInputChange}
                    value={formData.educationBackground}
                  />
                </div>
              </div>

              {/* Parent Details */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-bold mb-2">Parent Details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <Label value="Name" />
                    <TextInput
                      id="parentName"
                      name="parentName"
                      placeholder="Parent/Guardian Name"
                      required
                      onChange={handleInputChange}
                      value={formData.parentName}
                    />
                  </div>

                  <div>
                    <Label value="Contact Number" />
                    <TextInput
                      id="parentNumber"
                      name="parentNumber"
                      placeholder="Parent/Guardian Contact"
                      required
                      onChange={handleInputChange}
                      value={formData.parentNumber}
                    />
                  </div>
                  <div>
                    <Label value="Relationship" />
                    <TextInput
                      id="parentRelationship"
                      name="parentRelationship"
                      placeholder="e.g., Father, Mother"
                      required
                      onChange={handleInputChange}
                      value={formData.parentRelationship}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between print:hidden">
            <div className="mt-4">
              <Button type="submit">Update Student</Button>
            </div>
            {/*  <div className="mt-4">
             Use react-to-print for printing 
              <Button onClick={() => reactToPrintFn()}>Print Details</Button>
            </div>*/}
          </div>
        </form>
      </Card>
    </div>
  );
}
