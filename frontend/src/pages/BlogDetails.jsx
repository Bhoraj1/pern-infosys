import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaFacebook,
  FaLinkedin,
  FaPen,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function BlogDetails() {
  const location = useLocation();
  const blog = location.state?.item;
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/backend11/getBlogs/${blog.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedBlogs(data.relatedBlogs);
      })
      .catch((err) => console.log(err));
  }, [blog]);

  const handleRelatedBlogClick = (relatedBlog) => {
    const courseTitleSlug = relatedBlog.title
      .replace(/\s+/g, "-")
      .toLowerCase();
    navigate(`/blog/${courseTitleSlug}`, { state: { item: relatedBlog } });
  };

  // Function to handle social media sharing
  const handleSocialShare = (platform) => {
    const blogUrl = encodeURIComponent(window.location.href);
    const blogTitle = encodeURIComponent(blog.title);
    const blogDescription = encodeURIComponent(blog.description);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${blogUrl}&text=${blogTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${blogDescription}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen  mt-16 ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaPen className="w-6 h-5 " />
                  <span className="font-medium rounded-full">
                    by {blog.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>{new Date(blog.created_at).toDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>
                    {blog && (blog.description.length / 1000).toFixed(0)} mins
                    read
                  </span>
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
                  {blog.category}
                </span>
              </div>
              <div className="flex gap-4 text-gray-600">
                <button
                  onClick={() => handleSocialShare("facebook")}
                  className="hover:text-[#F79F35] transition-colors"
                >
                  <FaFacebook size={24} />
                </button>
                <button
                  onClick={() => handleSocialShare("twitter")}
                  className="hover:text-[#F79F35] transition-colors"
                >
                  <FaXTwitter size={24} />
                </button>
                <button
                  onClick={() => handleSocialShare("linkedin")}
                  className="hover:text-[#F79F35] transition-colors"
                >
                  <FaLinkedin size={24} />
                </button>
              </div>
            </div>

            <div className="max-w-2xl p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center mb-6 text-blue-950">
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
                <Button type="submit" className="bg-blue-950">
                  Submit Review
                </Button>
              </form>
            </div>
          </article>
          <aside className="lg:w-96 space-y-8">
            <div className="bg-white rounded-lg shadow p-6 min-h-screen">
              <h3 className="text-lg font-semibold mb-4 ">Related Posts</h3>
              <div className="space-y-4">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((relatedBlog) => (
                    <div
                      onClick={() => handleRelatedBlogClick(relatedBlog)}
                      key={relatedBlog.id}
                      className="flex gap-4"
                    >
                      <img
                        src={relatedBlog.image}
                        alt="Related post"
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div>
                        <h4 className="font-medium mb-1">
                          {relatedBlog.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(relatedBlog.created_at).toDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>There is no related blogs yet !</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
