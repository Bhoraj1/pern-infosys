import { useLocation } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Textarea, TextInput } from "flowbite-react";

export default function BlogDetails() {
  const location = useLocation();
  const blog = location.state?.item;

  return (
    <div className="min-h-screen bg-gray-50 mt-16 ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <img src={blog.image} className="w-12 h-12 rounded-full" />
                  <span className="font-medium">By {blog.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>{new Date(blog.created_at).toDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>8 min read</span>
                </div>
              </div>
            </div>

            <div className="">
              <img
                src={blog.image}
                alt="Featured"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="prose max-w-none my-7 flex justify-normal items-start">
              <p
                className="curriculum-content"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></p>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between border-t border-b py-6 my-8">
              <div className="flex gap-2">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  Technology
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Web Development
                </span>
              </div>
              <div className="flex gap-4 text-gray-600">
                <button className="hover:text-blue-600 transition-colors">
                  <FaFacebook size={24} />
                </button>
                <button className="hover:text-blue-400 transition-colors">
                  <FaTwitter size={24} />
                </button>
                <button className="hover:text-blue-700 transition-colors">
                  <FaLinkedin size={24} />
                </button>
              </div>
            </div>

            <div className="max-w-2xl p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Leave a Message
              </h2>
              <form className="space-y-4">
                <div className="relative">
                  <TextInput
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="relative">
                  <TextInput
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="relative">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </article>
          <aside className="lg:w-96 space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={blog.image}
                    alt="Related post"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium mb-1">React Best Practices</h4>
                    <p className="text-sm text-gray-500">March 10, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
