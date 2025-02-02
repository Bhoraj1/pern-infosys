import React from "react";

export default function About() {
  return (
    <div className="sm:flex items-center max-w-screen-xl">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <img src="https://i.imgur.com/WbQnbas.png" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span
            className=" underline uppercase decoration-[3px]"
            style={{ textDecorationColor: "#F79F35" }}
          >
            About us
          </span>
          <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
            About <span className="text-[#F79F35]">Our Company</span>
          </h2>
          <p className="text-gray-700">
            We are a dynamic company offering innovative IT solutions,
            specializing in networking, consultation, and development. Our
            mission is to empower businesses with cutting-edge technology
            tailored to their needs. We are committed to delivering excellence
            in every project we undertake and providing unparalleled support to
            our clients.
          </p>
        </div>
      </div>
    </div>
  );
}
