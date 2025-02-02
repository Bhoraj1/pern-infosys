import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import SpinnerComponent from "../../../hooks/SpinnerComponent";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { useApiUpdate } from "../../../store/ContextAPI";
export default function ServicesForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const { setLoading, loading } = useLoading();
  const { serviceId } = useParams();
  const { setApiUpdated } = useApiUpdate();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = new FormData();
    serviceData.append("image", formData.image);
    serviceData.append("title", formData.title);
    serviceData.append("description", formData.description);

    try {
      setLoading(true);
      let res;
      if (serviceId) {
        res = await fetch(`/api/backend7/update/${serviceId}`, {
          method: "PUT",
          body: serviceData,
        });
      } else {
        res = await fetch("/api/backend7/service", {
          method: "POST",
          body: serviceData,
        });
      }
      const result = await res.json();
      if (res.ok) {
        setLoading(false);
        toast.success(
          serviceId
            ? "Update Service successfully !"
            : " Service Add successfully!"
        );
      } else {
        setLoading(false);
        toast.error(
          serviceId
            ? "Error updating Service"
            : result.error || "Error posting Service"
        );
      }
      setApiUpdated((prev) => ({ ...prev, services: !prev.services }));

      navigate("/dashboard?tab=services");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetch(`/api/backend7/get-services/${serviceId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData((prev) => ({
            ...prev,
            name: data.name,
            title: data.title,
            description: data.description,
            image: data.image,
          }));
        })
        .catch((err) => console.log(err));
    }
  }, [serviceId]);

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  return (
    <div
      className={`mx-auto p-6 m-7 w-80 sm:w-[800px] bg-white rounded-lg shadow-xl ${
        serviceId ? "mt-16" : ""
      }`}
    >
      {loading && <SpinnerComponent />}
      <h2 className="flex justify-center items-center text-2xl font-bold">
        {serviceId ? "Update Service " : "Add Service"}
      </h2>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
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
            onChange={handleInputChange}
            required
            value={formData.title}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="image" value="Image" />
          <FileInput
            type="file"
            id="image"
            name="image"
            className="mt-1"
            accept="image/*"
            onChange={handleInputChange}
          />
          {formData.image && (
            <img
              src={
                typeof formData.image === "string"
                  ? formData.image
                  : URL.createObjectURL(formData.image)
              }
              alt="Preview"
              className="w-full mt-2"
            />
          )}
        </div>
        <div className="mb-4">
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            id="description"
            name="description"
            required
            onChange={handleDescriptionChange}
            value={formData.description}
          />
        </div>

        <Button type="submit" className=" bg-blue-950">
          {serviceId ? "Update Service " : "Add Service"}
        </Button>
      </form>
    </div>
  );
}
