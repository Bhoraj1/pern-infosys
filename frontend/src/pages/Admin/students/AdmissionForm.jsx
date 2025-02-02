import { useState, useRef, useEffect } from "react";
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

export default function AdmissionForm() {
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/dashboard?tab=admission-bill", { state: { formData } });
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
        ...formData,
        courseType: selectedCourse.title,
        // selectedCourseId: selectedCourse._id,
        timeSlot: selectedCourse.timeSlot,
        courseDuration: selectedCourse.courseDuration,
        totalAmount: selectedCourse.totalAmount,
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
    <div ref={contentRef} className="container mx-auto mt-5">
      <Card className="">
        <h1 className="flex justify-center items-center gap-1 text-xl font-bold">
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
                  rows={2}
                  onChange={handleInputChange}
                  className="p-2"
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
                      onChange={handleCourseSelection}
                    >
                      <option value=""> Select Course Type </option>
                      {trainings.length > 0 ? (
                        trainings.map((training) => (
                          <option key={training._id} value={training._id}>
                            {training.title}
                          </option>
                        ))
                      ) : (
                        <option value="">No courses available</option>
                      )}
                    </Select>
                  </div>

                  {/* 2.Time Slot */}
                  <div>
                    <Label value="Preferred Time Slot" />
                    <TextInput
                      id="timeSlot"
                      name="timeSlot"
                      placeholder="Enter a time slot"
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
                      placeholder="Enter course duration"
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between print:hidden">
            <div className="mt-4 ">
              <Button type="submit" className="bg-blue-950">Register Student</Button>
            </div>
            {/*<div className="mt-4">
               Use react-to-print for printing 
              <Button onClick={() => reactToPrintFn()}>Print Details</Button>
            </div>*/}
          </div>
        </form>
      </Card>
    </div>
  );
}
