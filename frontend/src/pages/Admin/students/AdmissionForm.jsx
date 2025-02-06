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
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import SpinnerComponent from "../../../hooks/SpinnerComponent";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    student_name: "",
    dob: "",
    contact_number: "",
    email: "",
    address: "",
    time_slot: "",
    course_type: "",
    course_duration: "",
    total_amount: "",
    education_background: "",
    parent_name: "",
    parent_number: "",
    parent_relationship: "",
  });
  const [trainings, setTrainings] = useState([]);
  const contentRef = useRef(null);
  // const reactToPrintFn = useReactToPrint({ contentRef });
  const navigate = useNavigate();
  const { setLoading, loading } = useLoading();
  const { studentId } = useParams();

  useEffect(() => {
    if (studentId) {
      fetch(`/api/backend4/getStudentAdmission/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const dobDate = data.dob.split("T")[0];
          setFormData({
            student_name: data.student_name,
            dob: dobDate,
            contact_number: data.contact_number,
            course_duration: data.course_duration,
            time_slot: data.time_slot,
            total_amount: data.total_amount,
            email: data.email,
            address: data.address,
            education_background: data.education_background,
            parent_name: data.parent_name,
            parent_number: data.parent_number,
            course_type: data.course_type,
            parent_relationship: data.parent_relationship,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [studentId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (studentId) {
        const res = await fetch(`/api/backend4/update/${studentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          setLoading(false);
          throw new Error("Failed to update student");
        }
        setLoading(false);
        toast.success("Student updated successfully!");
        navigate("/dashboard?tab=student-dahsboard");
      } else {
        setLoading(false);
        navigate("/dashboard?tab=admission-bill", { state: { formData } });
      }
    } catch {
      setLoading(false);
      toast.error("Something wrong");
    }
  };
  useEffect(() => {
    const fetchCourseTypes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/backend6/getTrainings`);
        if (!res.ok) {
          setLoading(false);
          console.error("Failed to fetch course types.");
          return;
        }
        setLoading(false);
        const data = await res.json();
        setTrainings(data.trainings);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching course details:", err);
      }
    };
    fetchCourseTypes();
  }, []);
  const handleCourseSelection = (e) => {
    const selectedCourseId = e.target.value;
    const selectedCourse = trainings.find(
      (course) => course.id === Number(selectedCourseId)
    );

    if (selectedCourse) {
      setFormData({
        ...formData,
        course_type: selectedCourse.title,
        time_slot: selectedCourse.time_slot,
        course_duration: selectedCourse.course_duration,
        total_amount: selectedCourse.total_amount,
      });
    } else {
      setFormData({
        ...formData,
        course_type: "",
        time_slot: "",
        course_duration: "",
        total_amount: "",
      });
    }
  };

  return (
    <div
      ref={contentRef}
      className={`container mx-auto ${studentId ? "pt-16" : "pt-5"}`}
    >
      {loading && <SpinnerComponent />}
      <Card className="">
        <h1 className="flex justify-center items-center gap-1 text-xl font-bold">
          {studentId ? "Update Student Form" : "Student Admission Form"}
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
                  id="student_name"
                  name="student_name"
                  placeholder="Enter full name"
                  required
                  onChange={handleInputChange}
                  value={formData.student_name}
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
                  value={formData.dob}
                />
              </div>

              {/* Contact Number */}
              <div>
                <Label htmlFor="contactNumber" value="Contact Number" />
                <TextInput
                  id="contact_number"
                  name="contact_number"
                  type="tel"
                  placeholder="Enter contact number"
                  required
                  onChange={handleInputChange}
                  value={formData.contact_number}
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
                  rows={2}
                  onChange={handleInputChange}
                  className="p-2"
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
                      id="course_type"
                      name="course_type"
                      required
                      onChange={handleCourseSelection}
                      value={formData.course_type}
                    >
                      <option>
                        {studentId ? formData.course_type : "select courses"}
                      </option>
                      {trainings.length > 0 ? (
                        trainings.map((training) => (
                          <option key={training.id} value={training.id}>
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
                      id="time_slot"
                      name="time_slot"
                      placeholder="Enter a time slot"
                      value={formData.time_slot}
                      required
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* 3.Course Duration */}
                  <div>
                    <Label value="Course Duration" />
                    <TextInput
                      id="course_duration"
                      name="course_duration"
                      placeholder="Enter course duration"
                      value={formData.course_duration}
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* 4.Total Amount */}
                  <div>
                    <Label value="Total Amount" />
                    <TextInput
                      id="total_amount"
                      name=" total_amount"
                      placeholder=" Total Amount "
                      value={formData.total_amount}
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
                    id="education_background"
                    name="education_background"
                    placeholder="Enter school/college name"
                    required
                    onChange={handleInputChange}
                    value={formData.education_background}
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
                      id="parent_name"
                      name="parent_name"
                      placeholder="Parent/Guardian Name"
                      required
                      onChange={handleInputChange}
                      value={formData.parent_name}
                    />
                  </div>

                  <div>
                    <Label value="Contact Number" />
                    <TextInput
                      id="parent_number"
                      name="parent_number"
                      placeholder="Parent/Guardian Contact"
                      required
                      onChange={handleInputChange}
                      value={formData.parent_number}
                    />
                  </div>
                  <div>
                    <Label value="Relationship" />
                    <TextInput
                      id="parent_relationship"
                      name="parent_relationship"
                      placeholder="e.g., Father, Mother"
                      required
                      onChange={handleInputChange}
                      value={formData.parent_relationship}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between print:hidden">
            <div className="mt-4 ">
              <Button type="submit" className="bg-blue-950">
                {studentId ? "Update student" : "Register Student"}
              </Button>
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
