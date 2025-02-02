import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import useLoading from "./../../../hooks/useLoading";
import SpinnerComponent from "../../../hooks/SpinnerComponent";

export default function UpdateService() {
  const { loading, setLoading } = useLoading();
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    try {
      const fetchTraining = async () => {
        const res = await fetch(`/api/backend7/get-service/${id}`);
        const data = await res.json();
        // console.log("service data:", data);
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        if (res.ok) {
          setFormData(data.service);
        }
      };
      fetchTraining();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/backend7/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        setLoading(false);
        toast.error("Failed to update service");
        return;
      } else {
        setLoading(false);
        toast.success("Service Updated successfully");
        navigate("/dashboard?tab=services");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update service");
    }
  };

  return (
    <div className="mx-auto p-6 m-12 w-80 sm:w-[800px] bg-white rounded-lg shadow-xl">
      {loading && <SpinnerComponent />}
      <h2 className="text-2xl font-bold">Services Form</h2>
      <form onSubmit={handleSubmit}>
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
            required
            value={formData?.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            type="text"
            placeholder="Enter a Description"
            className="mt-1 block p-2"
            required
            rows={6}
            value={formData?.description}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" className=" bg-blue-950">
          Update Service
        </Button>
      </form>
    </div>
  );
}
