import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import SpinnerComponent from "../../../hooks/SpinnerComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useApiUpdate } from "../../../store/ContextAPI";

export default function TeamForm() {
  const { setLoading, loading } = useLoading();
  const { teamId } = useParams();
  const { setApiUpdated } = useApiUpdate();
  const navigate = useNavigate();
  // Single state for all form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    department: "",
    bio: "",
    description: "",
    socialmedia: {
      linkedin: "",
      github: "",
      twitter: "",
      facebook: "",
    },
    image: null,
  });

  useEffect(() => {
    if (teamId) {
      fetch(`/api/backend9/getTeams/${teamId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setFormData((prev) => ({
            ...prev,
            name: data.name,
            email: data.email,
            phonenumber: data.phonenumber,
            department: data.department,
            bio: data.bio,
            description: data.description,
            socialmedia: data.socialmedia,
            image: data.image,
          }));
        })
        .catch((err) => console.log(err));
    }
  }, [teamId]);

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (e.target.name.startsWith("socialmedia")) {
      setFormData({
        ...formData,
        socialmedia: {
          ...formData.socialmedia,
          [e.target.name.split(".")[1]]: e.target.value.trim(),
        },
      });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phonenumber,
      department,
      bio,
      description,
      socialmedia,
      image,
    } = formData;

    // Check for required fields
    if (
      !name ||
      !department ||
      !email ||
      !phonenumber ||
      !bio ||
      !description ||
      !socialmedia ||
      !image
    ) {
      toast.error("All fields are required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("department", department);
    formDataToSend.append("email", email);
    formDataToSend.append("phonenumber", phonenumber);
    formDataToSend.append("bio", bio);
    formDataToSend.append("description", description);
    formDataToSend.append("socialmedia", JSON.stringify(socialmedia));
    formDataToSend.append("image", image);

    try {
      setLoading(true);
      let res;
      if (teamId) {
        res = await fetch(`/api/backend9/update-teamMember/${teamId}`, {
          method: "PUT",
          body: formDataToSend,
        });
      } else {
        res = await fetch("/api/backend9/add-team", {
          method: "POST",
          body: formDataToSend,
        });
      }
      if (!res.ok) {
        setLoading(false);
        toast.error(
          teamId ? "Team Member Update Failed" : "Team Member Add Failed"
        );
      } else {
        setLoading(false);
        toast.success(
          teamId ? "Team Member successfully" : "Team Member successfully"
        );
      }
      setApiUpdated((prev) => ({ ...prev, teams: !prev.teams }));

      navigate(`/dashboard?tab=team-dash`);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className={`${
        teamId ? "mx-7 sm:mx-11 pt-16" : "mt-0"
      } mx-auto mt-3 p-4 bg-white rounded-lg shadow-md `}
    >
      {loading && <SpinnerComponent />}
      <h2
        className={`
        text-2xl font-bold text-center text-gray-800 mb-6`}
      >
        {teamId ? "Update Team Member" : "Add Team Member"}
      </h2>
      {teamId && formData.image && (
        <div className="my-2 flex justify-center items-center ">
          <img
            src={formData.image}
            alt="Team Member"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name and Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter a Flll Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="department"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              onChange={handleInputChange}
              value={formData.department}
              placeholder="Enter a post"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="department"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Enter a email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="department"
            >
              PhoneNumber
            </label>
            <input
              type="number"
              id="phonenumber"
              name="phonenumber"
              onChange={handleInputChange}
              value={formData.phonenumber}
              placeholder="Enter a number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Bio */}
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              onChange={handleInputChange}
              value={formData.bio}
              placeholder="Enter a bio"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
              placeholder="Enter a description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              required
            />
          </div>

          {/* Social Media */}
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="linkedin"
            >
              LinkedIn
            </label>
            <input
              type="text"
              id="linkedin"
              name="socialmedia.linkedin"
              onChange={handleInputChange}
              value={formData.socialmedia.linkedin}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="LinkedIn URL"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="github"
            >
              GitHub
            </label>
            <input
              type="text"
              id="github"
              name="socialmedia.github"
              onChange={handleInputChange}
              value={formData.socialmedia.github}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="GitHub URL"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="twitter"
            >
              Twitter
            </label>
            <input
              type="text"
              id="twitter"
              name="socialmedia.twitter"
              onChange={handleInputChange}
              value={formData.socialmedia.twitter}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Twitter URL"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="facebook"
            >
              Facebook
            </label>
            <input
              type="text"
              id="facebook"
              name="socialmedia.facebook"
              onChange={handleInputChange}
              value={formData.socialmedia.facebook}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Facebook URL"
            />
          </div>
        </div>

        {/* Image */}
        <div className="mb-2">
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="image"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className=" px-4 py-2 text-white font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700"
        >
          {teamId ? "Update Team Member" : "Add Team Member"}
        </button>
      </form>
    </div>
  );
}
