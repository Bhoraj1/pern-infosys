import React from "react";
import { useBlog } from "../store/ContextAPI";

const image =
  "https://images.pexels.com/photos/826349/pexels-photo-826349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export default function Blog() {
  const { blogs } = useBlog();
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
            <div className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group">
              <img
                src={item.image}
                alt="Blog Post 1"
                className="w-full h-96 object-cover"
              />
              <div className="p-6 absolute bottom-0 left-0 right-0 bg-[#F79F35] opacity-90">
                <span className="text-sm block text-gray-800 mb-2">
                  {new Date(item.updatedAt).toDateString()} | BY{" "}
                  {item.name.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>
                <div className="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
                  <p className="text-gray-800 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
