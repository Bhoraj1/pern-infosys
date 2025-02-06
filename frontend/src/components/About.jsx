import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function About() {
  return (
    <section className=" body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="w-full bg-gray-300 rounded-lg overflow-hidden  flex items-end justify-start relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.338184964582!2d81.68238557420392!3d28.197036103725967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399865004e18c1c3%3A0x1c86cafd35392ba!2sNext%20Infosys%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1738832556144!5m2!1sen!2snp"
            width="800"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className=" bg-white flex flex-col  w-full md:mt-0 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Company Details
          </h2>

          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <FaMapMarkerAlt className="text-indigo-500 w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Our Address
              </h3>
              <p className="text-gray-600">
                123 Business Street, City, Country
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <FaEnvelope className="text-indigo-500 w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600">info@company.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <FaPhone className="text-indigo-500 w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About Us</h3>
            <p className="text-gray-600 leading-relaxed">
              We are a leading company in the industry, dedicated to providing
              high-quality services and solutions to our clients. Our team of
              experts is committed to innovation and excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
