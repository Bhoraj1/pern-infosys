import { Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import {
  HiOutlineLockClosed,
  HiOutlineMail,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/adminRedux/adminSlice";

export default function AdminLogin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    if (!formData.password || !formData.email) {
      console.log("Please fill out the both fields");
    }
    try {
      const res = await fetch("/api/admin/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(login(data));
        // toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Incorrect credentials");
      }
    } catch (error) {
      toast.error("Invalid credentials",error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
