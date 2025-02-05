import { useState } from "react";
import { FaChartLine, FaServer } from "react-icons/fa";
import { BiCodeAlt } from "react-icons/bi";
import { TbDeviceMobileCode } from "react-icons/tb";
import { GiCctvCamera } from "react-icons/gi";
import { FcVoicePresentation } from "react-icons/fc";
import { RiPresentationFill } from "react-icons/ri";
import { FaComputer } from "react-icons/fa6";
import { GrCloudSoftware } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const servicesList = [
  {
    icon: (
      <BiCodeAlt className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "Website Development",
    description: "Experience blazing-fast performance with our product.",
  },
  {
    icon: (
      <FaChartLine className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "Digital Marketing",
    description: "Tailor our product to suit your needs.",
  },
  {
    icon: (
      <GiCctvCamera className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "CCTV Installation",
    description: "Your data is protected by the latest security measures.",
  },
  {
    icon: (
      <TbDeviceMobileCode className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "Mobile App Development",
    description: "Seamless communication for your team.",
  },
  {
    icon: (
      <FaServer className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "Domain and Hosting",
    description: "Reliable solutions for hosting your projects.",
  },
  {
    icon: (
      <RiPresentationFill className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "Interactive Board Installation",
    description: "Tailored solutions for interactive presentations.",
  },
  {
    icon: (
      <FcVoicePresentation className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "IT Consulting and Services",
    description: "Expand your reach with our global network.",
  },
  {
    icon: (
      <FaComputer className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "Computer Accessories",
    description: "High-quality accessories for your systems.",
  },
  {
    icon: (
      <GrCloudSoftware className="mx-auto text-4xl text-gray-800 group-hover:text-[#F79F35] mb-4" />
    ),
    title: "Software Development",
    description: "Efficient and scalable software solutions.",
  },
];

export default function Services() {
  const [visibleServices, setVisibleServices] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleServices = () => {
    navigate("/AllServices", {
      state: {
        services: servicesList.map(({ title, description, icon }) => ({
          title,
          description,
          icon: icon.type.name,
        })),
      },
    });
    setIsExpanded(!isExpanded);
    setVisibleServices(isExpanded ? 6 : servicesList.length);
  };

  const displayedServices = servicesList.slice(0, visibleServices);
  return (
    <div className="font-[sans-serif] bg-gradient-to-r hide: bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl text-blue-950 sm:text-3xl font-bold mb-12">
          Discover Our Exclusive Services
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 max-md:max-w-lg mx-auto">
          {displayedServices.map((service, index) => (
            <div
              key={index}
              className="rounded-xl group p-8 text-center hover:bg-white text-gray-800 hover:text-[#F79F35] hover:shadow-xl transition duration-300"
            >
              {service.icon}
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-800 group-hover:text-gray-500 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        {servicesList.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={toggleServices}
              className="px-6 py-2 text-[#F79F35]   rounded-lg  transition duration-300"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
