import { useEffect, useState } from "react";
import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import useLoading from "../../../hooks/useLoading";
import SpinnerComponent from "../../../hooks/SpinnerComponent";
import { useNavigate, useParams } from "react-router-dom";

export default function AddTrainingForm() {
  const { setLoading, loading } = useLoading();
  const navigate = useNavigate();
  const { TrainingId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    course_duration: "",
    time_slot: "",
    total_amount: "",
    instructor_name: "",
    instructor_bio: "",
    syllabus: "",
  });

  useEffect(() => {
    if (TrainingId) {
      fetch(`/api/backend6/getTrainings/${TrainingId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFormData({
            title: data.title,
            description: data.description,
            course_duration: data.course_duration,
            time_slot: data.time_slot,
            total_amount: data.total_amount,
            instructor_name: data.instructor_name,
            instructor_bio: data.instructor_bio,
            syllabus: data.syllabus,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [TrainingId]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSyllabusChange = (value) => {
    setFormData({ ...formData, syllabus: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("image", formData.image);
    formDataObj.append("description", formData.description);
    formDataObj.append("course_duration", formData.course_duration);
    formDataObj.append("time_slot", formData.time_slot);
    formDataObj.append("total_amount", formData.total_amount);
    formDataObj.append("instructor_name", formData.instructor_name);
    formDataObj.append("instructor_bio", formData.instructor_bio);
    formDataObj.append("syllabus", formData.syllabus);

    try {
      setLoading(true);
      let res;
      if (TrainingId) {
        res = await fetch(`/api/backend6/update/${TrainingId}`, {
          method: "PUT",
          body: formDataObj,
        });
      } else {
        res = await fetch("/api/backend6/training", {
          method: "POST",
          body: formDataObj,
        });
      }
      if (!res.ok) {
        setLoading(false);
        toast.error(
          TrainingId ? "Training Update Failed" : "Training Add Failed"
        );
        return;
      } else {
        setLoading(false);
        toast.success(
          TrainingId
            ? "Training Update Successfully"
            : "Training Added successfully Add Failed"
        );
        navigate("/dashboard?tab=all-training");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to add training");
    }
  };

  return (
    <div className={`container mx-auto mt-5 ${TrainingId ? "pt-16" : "pt-0"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">
        {TrainingId ? "Update Training" : "Add Training"}
      </h1>
      {loading && <SpinnerComponent />}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 mx-7"
        method="POST"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              required
              placeholder="Enter training title"
              className="mt-1 block w-full"
              value={formData.title}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="image" value="Image" />
            <FileInput
              type="file"
              id="image"
              className="mt-1"
              accept="image/*"
              onChange={handleChange}
              required={!TrainingId}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            onChange={handleChange}
            required
            placeholder="Enter training description"
            rows={4}
            className="mt-1 block w-full p-2"
            value={formData.description}
          />
        </div>

        {/* Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <Label htmlFor="courseDuration">Duration</Label>
            <TextInput
              id="course_duration"
              name="course_duration"
              type="text"
              onChange={handleChange}
              required
              placeholder="Enter training duration"
              className="mt-1 block w-full"
              value={formData.course_duration}
            />
          </div>
          <div>
            <Label htmlFor="duration">Time Slot</Label>
            <TextInput
              id="time_slot"
              name="time_slot"
              type="text"
              onChange={handleChange}
              required
              placeholder="Enter a time slot"
              className="mt-1 block w-full"
              value={formData.time_slot}
            />
          </div>
        </div>

        {/* Fees */}
        <div>
          <Label htmlFor="totalAmount">Total Amount</Label>
          <TextInput
            id="total_amount"
            name="total_amount"
            type="number"
            onChange={handleChange}
            required
            placeholder="Enter training fees"
            className="mt-1 block w-full"
            value={formData.total_amount}
          />
        </div>

        {/* Instructor Name */}
        <div>
          <Label htmlFor="instructorName">Instructor Name</Label>
          <TextInput
            id="instructor_name"
            name="instructor_name"
            type="text"
            onChange={handleChange}
            required
            placeholder="Enter instructor's name"
            className="mt-1 block w-full"
            value={formData.instructor_name}
          />
        </div>

        {/* Instructor Bio */}
        <div>
          <Label htmlFor="instructorBio">Instructor Bio</Label>
          <TextInput
            id="instructor_bio"
            name="instructor_bio"
            onChange={handleChange}
            required
            placeholder="Enter instructor bio"
            rows={4}
            className="mt-1 block w-full"
            value={formData.instructor_bio}
          />
        </div>

        <div className="mb-4">
          <ReactQuill
            theme="snow"
            placeholder="Write Syllabus here..."
            className="h-72 mb-12"
            id="syllabus"
            name="syllabus"
            required
            onChange={handleSyllabusChange}
            value={formData.syllabus}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center ">
          <Button type="submit" className="mb-4 bg-blue-950">
            {TrainingId ? "Update Training" : "Post Training"}
          </Button>
        </div>
      </form>
    </div>
  );
}
