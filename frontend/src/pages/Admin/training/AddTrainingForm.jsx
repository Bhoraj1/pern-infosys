import { useState } from "react";
import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import toast from "react-hot-toast";

export default function AddTrainingForm() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    courseDuration: "",
    timeSlot: "",
    totalAmount: "",
    instructorName: "",
    instructorBio: "",
    syllabus: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.id]: e.target.files[0] });
    } else setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to match the format expected by the backend
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("image", formData.image);
    formDataObj.append("description", formData.description);
    formDataObj.append("courseDuration", formData.courseDuration);
    formDataObj.append("timeSlot", formData.timeSlot);
    formDataObj.append("totalAmount", parseFloat(formData.totalAmount));
    formDataObj.append("instructorName", formData.instructorName);
    formDataObj.append("instructorBio", formData.instructorBio);
    formDataObj.append("syllabus", formData.syllabus);

    try {
      const res = await fetch("/api/backend6/training", {
        method: "POST",
        body: formDataObj,
      });
      if (!res.ok) {
        toast.error("Failed to add training");
        return;
      } else {
        toast.success("Training added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add training");
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Training</h1>
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
              required
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
          />
        </div>

        {/* Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <Label htmlFor="courseDuration">Duration</Label>
            <TextInput
              id="courseDuration"
              name="courseDuration"
              type="text"
              onChange={handleChange}
              required
              placeholder="Enter training duration"
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="duration">Time Slot</Label>
            <TextInput
              id="timeSlot"
              name="timeSlot"
              type="text"
              onChange={handleChange}
              required
              placeholder="Enter a time slot"
              className="mt-1 block w-full"
            />
          </div>
        </div>

        {/* Fees */}
        <div>
          <Label htmlFor="totalAmount">Total Amount</Label>
          <TextInput
            id="totalAmount"
            name="totalAmount"
            type="number"
            onChange={handleChange}
            required
            placeholder="Enter training fees"
            className="mt-1 block w-full"
          />
        </div>

        {/* Instructor Name */}
        <div>
          <Label htmlFor="instructorName">Instructor Name</Label>
          <TextInput
            id="instructorName"
            name="instructorName"
            type="text"
            onChange={handleChange}
            required
            placeholder="Enter instructor's name"
            className="mt-1 block w-full"
          />
        </div>

        {/* Instructor Bio */}
        <div>
          <Label htmlFor="instructorBio">Instructor Bio</Label>
          <TextInput
            id="instructorBio"
            name="instructorBio"
            onChange={handleChange}
            required
            placeholder="Enter instructor bio"
            rows={4}
            className="mt-1 block w-full"
          />
        </div>

        {/* Syllabus */}
        <div>
          <Label htmlFor="syllabus">Syllabus</Label>
          <Textarea
            id="syllabus"
            name="syllabus"
            onChange={handleChange}
            required
            placeholder="Enter syllabus topics"
            rows={4}
            className="mt-1 block w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" className="mb-4 bg-blue-950">
            Add Training
          </Button>
        </div>
      </form>
    </div>
  );
}
