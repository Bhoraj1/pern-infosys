import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import logo from "../assets/images/logo.png";
import { FaChevronRight, FaTimes, FaBars } from "react-icons/fa";
import { Alert, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import toast from "react-hot-toast";

export default function Header() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [services, setServices] = useState([]);
  const [trainingAndServices, setTrainingAndServices] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState(false);

  const handleInquiryClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, number: value });
  };
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.services ||
      !formData.message
    ) {
      toast.error("Please fill out the all fields");
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/backend/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log(res);
      setLoading(false);
      if (res.ok) {
        toast.success("Inquiry send successfully");
        setIsFormVisible(false);
        navigate("/courses");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  //for dropdown training redirections
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/backend7/get-services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        // const data = await response.json();
        // setServices(data.services);
      } catch (err) {
        console.log(err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchTrainingAndServices = async () => {
      try {
        const res = await fetch(`api/backend/title`);
        const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          console.error(data.message || "Failed to fetch users.");
        } else {
          setTrainingAndServices([...data.courses, ...data.services]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchTrainingAndServices();
  }, []);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "IT Training", path: "/courses" },
    { title: " About", path: "/about" },
    { title: " Services", path: "/AllServices" },
    { title: " Blog", path: "/blog" },
  ];

  return (
    <nav className="bg-white md:text-sm fixed top-0 left-0 w-full z-50 shadow-md border-b">
      <div className="gap-x-20 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-2 md:block">
          <a href="javascript:void(0)">
            <img src={logo} alt="logo" className="w-16 h-14" />
          </a>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <FaTimes className="h-7 w-7 text-current" />
              ) : (
                <FaBars className="w-5 h-5 text-current" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mb-3 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={idx} className="text-gray-700 hover:text-gray-900">
                  <a
                    href={item.path}
                    className={`block text-lg nav-link ${
                      isActive ? "active" : ""
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            <a href="tel:9863163060" className="flex text-lg">
              <IoCall className="m-1 font-tw-cen" /> 9863163060
            </a>

            <a
              onClick={handleInquiryClick}
              className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-[#F79F35] hover:bg-[#F79F35]  rounded-full md:inline-flex"
            >
              Quick Inquiry
              <FaChevronRight className="w-3 animate-fade-in h-3 text-current" />
            </a>
          </div>
        </div>
      </div>
      {isFormVisible && (
        <div className="fixed inset-0 z-50 bg-gray-700 bg-opacity-50 flex justify-center items-center transition-all duration-500">
          <div className="bg-white p-8 rounded-md shadow-lg w-full sm:w-4/5 lg:w-3/4 xl:w-2/3 max-h-[90%] overflow-y-scroll flex relative">
            {/* Close Button (X Icon) */}
            <IoCloseCircleSharp
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-3xl text-gray-700 cursor-pointer"
            />

            {/* Form */}
            <div className="w-full lg:w-2/3 p-4 space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Quick Inquiry</h2>
              <form className="space-y-4" onSubmit={handleInquirySubmit}>
                <div className="flex space-x-6">
                  <div className="w-full sm:w-1/2">
                    <Label value="Your Name" />
                    <TextInput
                      type="text"
                      id="name"
                      name="name"
                      placeholder="name"
                      onChange={handleChange}
                      className="w-full "
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <Label value="Email" />

                    <TextInput
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-6">
                  <div className="w-full sm:w-1/2">
                    <Label value="Phone Number" />
                    <PhoneInput
                      id="number"
                      name="number"
                      placeholder="Phone Number"
                      onChange={handlePhoneChange}
                      defaultCountry="NP"
                      international
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <Label value="Services" />
                    <select
                      id="services"
                      name="services"
                      required
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    >
                      <option>Select Services</option>
                      {trainingAndServices.map((item, index) => (
                        <option key={index} value={item.title}>
                          {item.title}
                        </option>
                        
                      ))}
                      <option>Web Development</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <Label value="Message" />
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    className="p-2"
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r bg-blue-950 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : (
                      "Send"
                    )}
                  </button>
                  {errorMessage && (
                    <Alert
                      className="md:pt-5 mb-2 w-80 items-center"
                      color="failure"
                    >
                      {errorMessage}
                    </Alert>
                  )}
                </div>
              </form>
            </div>

            {/* Company Contact Info on the Right */}
            <div className="hidden sm:inline w-full sm:w-1/3 p-4 border-l border-gray-300  ">
              <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
              <p className="mb-2 text-sm">
                <strong>Email:</strong> nextinfosys@gmail.com
              </p>
              <p className="mb-2 text-sm">
                <strong>Phone:</strong> 9863163060 , 081-534134
              </p>
              <p className="text-sm">
                <strong>Address:</strong> Kohalpur-11,Banke, Nepal
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
