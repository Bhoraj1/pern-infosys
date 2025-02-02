import React, { useEffect, useState } from "react";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import { toast } from "react-hot-toast";
import SpinnerComponent from "./../../../hooks/SpinnerComponent";
import useLoading from "./../../../hooks/useLoading";
import { useNavigate, useParams } from "react-router-dom";
import { useApiUpdate } from "../../../store/ContextAPI";

export default function ReviewForm() {
  const { loading, setLoading } = useLoading();
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const { setApiUpdated } = useApiUpdate();
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: "0",
    image: null,
  });

  useEffect(() => {
    if (reviewId) {
      fetch(`/api/backend10/getReview/${reviewId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setFormData({
            name: data.name,
            review: data.review,
            rating: data.rating,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [reviewId]);
  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      // Update the file
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      // For other fields (name, department, bio, description)
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.name ||
      !formData.review ||
      formData.rating === "0" ||
      !formData.image
    ) {
      toast.error("Please fill all fields and provide a rating!");
      return;
    }

    // Create FormData for uploading to backend
    const reviewData = new FormData();
    reviewData.append("name", formData.name);
    reviewData.append("review", formData.review);
    reviewData.append("rating", formData.rating);
    reviewData.append("image", formData.image);

    try {
      setLoading(true);
      let res;
      if (reviewId) {
        res = await fetch(`/api/backend10/update-review/${reviewId}`, {
          method: "PUT",
          body: reviewData,
        });
      } else {
        res = await fetch("/api/backend10/add-review", {
          method: "POST",
          body: reviewData,
        });
      }
      const result = await res.json();
      if (res.ok) {
        setLoading(false);
        toast.success(
          reviewId ? "Review Update successfully" : "Review Add successfully"
        );
      } else {
        setLoading(false);
        toast.error(
          reviewId
            ? result.error || "Error submitting review"
            : "Review Add Failed"
        );
      }
      setApiUpdated((prev) => ({ ...prev, reviews: !prev.reviews }));
      if (reviewId) {
        navigate(`/dashboard?tab=review-dash`);
      } else {
        return null;
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg ${
        reviewId ? "mt-16" : ""
      }`}
    >
      {loading && <SpinnerComponent />}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {reviewId ? "Update a Review" : "Add a Review"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name" value="Name" />
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            onChange={handleInputChange}
            value={formData.name}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="review" value="Review" />
          <Textarea
            id="review"
            name="review"
            placeholder="Write your review here..."
            rows={4}
            onChange={handleInputChange}
            value={formData.review}
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="rating" value="Rating" />
          <select
            id="rating"
            name="rating"
            onChange={handleInputChange}
            value={formData.rating}
            className="m-2 p-2 border rounded w-48"
            required
          >
            <option value="0">0</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="mb-4">
          <Label htmlFor="image" value="Your Image" />
          <FileInput
            type="file"
            id="image"
            className="mt-1"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4 text-center">
          <Button type="submit" className="w-full">
            {reviewId ? "Update a Review" : "Add a Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
