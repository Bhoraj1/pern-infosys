import { Button, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLoading from "../../../hooks/useLoading";
import SpinnerComponent from "../../../hooks/SpinnerComponent";
import { useParams, useNavigate } from "react-router-dom";
import { useApiUpdate, useFaqs } from "../../../store/ContextAPI";

export default function FAQForm() {
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const { setLoading, loading } = useLoading();
  const {} = useFaqs();
  const { faqId } = useParams();
  const navigate = useNavigate();
  const { setApiUpdated } = useApiUpdate();

  useEffect(() => {
    if (faqId) {
      fetch(`/api/backend8/get-faqs/${faqId}`)
        .then((res) => res.json())
        .then((data) =>
          setFormData({ question: data.question, answer: data.answer })
        )
        .catch((err) => console.log(err));
    }
  }, [faqId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res;
      if (faqId) {
        res = await fetch(`/api/backend8/update-faq/${faqId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch("/api/backend8/add-faq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }
      if (!res.ok) {
        setLoading(false);
        toast.error(faqId ? "FAQ Update Failed" : "FAQ Add Failed");
        return;
      } else {
        setLoading(false);
        toast.success(
          faqId ? "FAQ updated successfully" : "FAQ added successfully"
        );
        setApiUpdated((prev) => ({ ...prev, faqs: !prev.faqs }));

        navigate(`/dashboard?tab=faq-dash`);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        faqId ? "mt-16" : "mt-0"
      } max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md`}
    >
      {loading && <SpinnerComponent />}
      <h2 className="text-2xl font-bold text-center text-gray-800 ">
        {faqId ? "Edit FAQ" : "Add FAQ"}
      </h2>
      <form onSubmit={handleSubmit} className="m-7">
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block max-auto text-gray-700 font-semibold mb-2 "
          >
            Question
          </label>
          <TextInput
            name="question"
            id="question"
            type="text"
            placeholder="Enter your question"
            className="w-full"
            value={formData.question}
            onChange={handleInputChange}
          />
        </div>

        {/* Answer Field */}
        <div className="mb-6">
          <label
            htmlFor="answer"
            className="block text-gray-700 font-semibold mb-2"
          >
            Answer
          </label>
          <Textarea
            name="answer"
            id="answer"
            placeholder="Enter your answer"
            rows={4}
            className="w-full"
            value={formData.answer}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            {faqId ? "Update FAQ" : "Add FAQ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
