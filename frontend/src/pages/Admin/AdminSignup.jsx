import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineMail,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminSignup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    if (!formData.username || !formData.password || !formData.email) {
      // console.log("Please fill out the both fields");
    }
    try {
      const res = await fetch("/api/admin/admin-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Sign Up successful!");
        navigate("/admin/login");
      } else {
        toast.error("Incorrect credentials");
      }
    } catch (error) {
      toast.error("Invalid credentials", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Sign Up
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              type="text"
              placeholder="Enter your username"
              icon={HiOutlineUser}
              className="mt-2"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              icon={HiOutlineMail}
              className="mt-2"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your password"
              icon={HiOutlineLockClosed}
              className="mt-2"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Checkbox id="rememberMe" />
              <Label htmlFor="rememberMe" className="ml-2">
                Remember Me
              </Label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
