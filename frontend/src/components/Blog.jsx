import React from "react";
import { useBlog } from "../store/ContextAPI";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const { blogs } = useBlog();
  const navigate = useNavigate();

  const handleBlogClick = (item) => {
    const courseTitleSlug = item.title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/blog/${courseTitleSlug}`, { state: { item } });
  };
  return (
    <div className="bg-white font-sans mt-16">
      <div className="w-full sm:m-7 mx-auto  p-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-[#F79F35] after:rounded-lg-full">
            LATEST BLOGS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
          {blogs.map((item, index) => (
            <div
              key={index}
              className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group"
              onClick={() => handleBlogClick(item)}
            >
              <img
                src={item.image}
                alt="Blog Post 1"
                className="w-full h-96 object-cover"
              />
              <div className="p-6 absolute bottom-0 left-0 right-0 bg-[#F79F35] opacity-90">
                <span className="text-sm block text-gray-800 mb-2">
                  {new Date(item.created_at).toDateString()} | BY <span />
                  {item.name.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>
                <div className="h-0 overflow-hidden group-hover:h-16 group-hover:mt-1 transition-all duration-300">
                  <p
                    className="line-clamp-2 blog-description"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
