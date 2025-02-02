import { useEffect, useState } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateTraining() {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseDuration: "",
    totalAmount: "",
    instructorName: "",
    instructorBio: "",
    syllabus: "",
  });

  useEffect(() => {
    try {
      const fetchTraining = async () => {
        const res = await fetch(`/api/backend6/training/${id}`);
        const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setFormData(data.training);
        }
      };
      fetchTraining();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "totalAmount") {
      setFormData({
        ...formData,
        [id]: parseFloat(value),
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const syllabus =
      typeof formData.syllabus === "string"
        ? formData.syllabus.split(",").map((item) => item.trim())
        : formData.syllabus;

    const trainingData = {
      title: formData.title,
      description: formData.description,
      courseDuration: formData.courseDuration,
      totalAmount: parseFloat(formData.totalAmount),
      instructorName: formData.instructorName,
      instructorBio: formData.instructorBio,
      syllabus,
    };

    // console.log("Training Data:", trainingData);
    try {
      const res = await fetch(`/api/backend6/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainingData),
      });
      if (!res.ok) {
        toast.error("Failed to update training");
        return;
      } else {
        toast.success("Training Updated successfully");
        navigate("/dashboard?tab=all-training");
      }
    } catch (error) {
      toast.error("Failed to update training");
    }
  };

  return (
    <div className="mx-auto w-[700px] p-2">
      <h1 className="text-3xl font-bold text-center mt-2">Update Training</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
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
        <div>
          <Label htmlFor="duration">Duration</Label>
          <TextInput
            id="courseDuration"
            name="courseDuration"
            type="text"
            onChange={handleChange}
            required
            placeholder="Enter training duration"
            className="mt-1 block w-full"
            value={formData.courseDuration}
          />
        </div>

        {/* totalAmount */}
        <div>
          <Label>Total Amount</Label>
          <TextInput
            id="totalAmount"
            name="totalAmount"
            type="number"
            onChange={handleChange}
            required
            placeholder="Enter training fees"
            className="mt-1 block w-full"
            value={formData.totalAmount}
          />
        </div>

        {/* Instructor Name */}
        <div>
          <Label>Instructor Name</Label>
          <TextInput
            id="instructorName"
            name="instructorName"
            type="text"
            onChange={handleChange}
            required
            placeholder="Enter instructor's name"
            className="mt-1 block w-full"
            value={formData.instructorName}
          />
        </div>

        {/* Instructor Bio */}
        <div>
          <Label>Instructor Bio</Label>
          <TextInput
            id="instructorBio"
            name="instructorBio"
            onChange={handleChange}
            required
            placeholder="Enter instructor bio"
            rows={4}
            className="mt-1 block w-full"
            value={formData.instructorBio}
          />
        </div>

        {/* Syllabus */}
        <div>
          <Label>Syllabus</Label>
          <Textarea
            id="syllabus"
            name="syllabus"
            onChange={handleChange}
            required
            placeholder="Enter syllabus topics"
            rows={6}
            className="mt-1 block w-full p-2"
            value={formData.syllabus}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" className="mt-4">
            Update Training
          </Button>
        </div>
      </form>
    </div>
  );
}
