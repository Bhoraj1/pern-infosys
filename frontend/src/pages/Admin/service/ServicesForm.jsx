import {
  Button,
  FileInput,
  Label,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import SpinnerComponent from "../../../hooks/SpinnerComponent";
export default function ServicesForm() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState("");
  const { setLoading, loading } = useLoading();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("photo", file);
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);

    try {
      setLoading(true);
      const res = await fetch("/api/backend7/service", {
        method: "POST",
        body: formDataObj,
      });
      if (!res.ok) {
        setLoading(false);
        toast.error("Failed to add service");
        return;
      } else {
        setLoading(false);
        toast.success("Service added successfully");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="mx-auto p-6 m-7 w-80 sm:w-[800px] bg-white rounded-lg shadow-xl">
      {loading && <SpinnerComponent />}
      <h2 className="text-2xl font-bold">Services Form</h2>
      <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
        <div className="mb-4">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </Label>
          <TextInput
            id="title"
            type="text"
            placeholder="Enter a Title"
            className="mt-1 block"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 "
          >
            Description
          </Label>
          <Textarea
            id="description"
            type="text"
            placeholder="Enter a Description"
            className="mt-1 block p-3 "
            required
            onChange={handleChange}
            rows={6}
          />

          <div className="mb-4">
            <Label htmlFor="image" value="Image" />
            <FileInput
              type="file"
              id="image"
              className="mt-1"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
        </div>
        <Button type="submit" className=" bg-blue-950">
          Add Service
        </Button>
      </form>
    </div>
  );
}
