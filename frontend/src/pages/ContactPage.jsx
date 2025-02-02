import { Label, Textarea, TextInput } from "flowbite-react";
import PhoneInput from "react-phone-number-input";
import { FaLocationDot } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";

export default function ContactPage() {
  return (
    <div>
      <div className="bg-blue-950 pt-10 border border-b-2">
        <div className="bg-blue-950 text-white pt-7 pb-6">
          <h1 className="text-4xl font-bold text-center">Contact Us</h1>
          <p className="text-center text-lg mt-2 text-gray-300">
            We are here to help. Get in touch with us!
          </p>
        </div>
        {/* Three fields */}
        <div className="ml-5 flex flex-col justify-center sm:flex sm:flex-row gap-8 mt-7 cursor-pointer">
          {/* Location */}
          <div
            className=" w-80 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg"
            style={{ backgroundColor: "#BCC4DB" }}
          >
            <FaLocationDot className="text-blue-950" size={"40px"} />
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-sm text-gray-600">Kohalpur-11, Banke, Nepal</p>
          </div>

          {/* Phone Number */}
          <div
            className="w-80 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg"
            style={{ backgroundColor: "#BCC4DB" }}
          >
            <MdAddCall className="text-blue-950" size={"40px"} />
            <h3 className="text-lg font-semibold">Phone Number</h3>
            <p className="text-sm text-gray-600">9866890859</p>
          </div>

          {/* Email */}
          <div
            className=" w-80 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg"
            style={{ backgroundColor: "#BCC4DB" }}
          >
            <MdEmail className="text-blue-950" size={"40px"} />
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-sm text-gray-600">nextinfosys@gmail.com</p>
          </div>
        </div>
      </div>

      <div className=" ml-7 sm:ml-24 text-black pt-10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Send us a message</h1>
        <p className=" text-sm sm:text-lg mt-2 text-gray-500">
          We are here to help. Get in touch with us!
        </p>
      </div>
      {/* Form */}
      <div className=" lg:w-2/4 p-4 ml-3 sm:ml-20">
        <form className="space-y-4">
          <div className="flex space-x-6">
            <div className="w-full sm:w-1/2">
              <Label value="Your Name" />
              <TextInput
                type="text"
                id="name"
                name="name"
                placeholder="name"
                className="w-full "
              />
            </div>
            <div className="w-full sm:w-1/2">
              <Label value="Email" />

              <TextInput
                type="email"
                id="email"
                name="email"
                placeholder="yourcompany@example.com"
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
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              >
                <option value="">Select Service</option>
                <option value="CCTV Installation">CCTV Installation</option>
                <option value="Networking Setup">Networking Setup</option>
                <option value="IT Consultation">IT Consultation</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <Label value="Message" />
            <Textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              rows="6"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
