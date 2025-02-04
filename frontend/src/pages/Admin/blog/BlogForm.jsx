import { TextInput, Button, Label, FileInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SpinnerComponent from "../../../hooks/SpinnerComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useApiUpdate } from "../../../store/ContextAPI";

export default function BlogForm() {
  const [loading, setLoading] = useState(false);
  const { blogId } = useParams();
  const { setApiUpdated } = useApiUpdate();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (blogId) {
      fetch(`/api/backend11/getBlogs/${blogId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
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
  }, [blogId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.title ||
      !formData.description ||
      !formData.image
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    const blogData = new FormData();
    blogData.append("name", formData.name);
    blogData.append("title", formData.title);
    blogData.append("description", formData.description);
    blogData.append("image", formData.image);

    try {
      setLoading(true);
      let res;
      if (blogId) {
        res = await fetch(`/api/backend11/update-blog/${blogId}`, {
          method: "PUT",
          body: blogData,
        });
      } else {
        res = await fetch("/api/backend11/post-blog", {
          method: "POST",
          body: blogData,
        });
      }
      const result = await res.json();
      if (res.ok) {
        setLoading(false);
        toast.success(
          blogId ? "Update Blog successfully !" : "Blog post successfully!"
        );
      } else {
        setLoading(false);
        toast.error(
          blogId ? "Error updating Blog" : result.error || "Error posting Blog"
        );
      }
      setApiUpdated((prev) => ({ ...prev, blogs: !prev.blogs }));

      navigate("/dashboard?tab=blog-dash");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto p-6 bg-white rounded-lg ${
        blogId ? "mt-16" : "mt-0"
      }`}
    >
      {loading && <SpinnerComponent />}
      <h2 className="text-2xl flex justify-center items-center font-bold mb-4">
        {blogId ? "Update a Blog Post" : "Post a new Blog "}
      </h2>

      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <div className="mb-4">
          <Label htmlFor="name" value="Posted By" />
          <TextInput
            id="name"
            placeholder="Enter your name"
            required
            className="mt-1"
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="title" value="Title" />
          <TextInput
            id="title"
            placeholder="Enter the title of the blog post"
            required
            className="mt-1"
            onChange={handleInputChange}
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
        </div>
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
        <Button type="submit" className="w-full mt-4">
          {blogId ? "Update Post" : "Add Post"}
        </Button>
      </form>
    </div>
  );
}
