import { Button, Textarea, TextInput } from "flowbite-react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaCheck,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-950 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-950">
            Let's discuss your next digital transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-6 h-6 text-[#F79F35] mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-blue-950">
                    Head Office
                  </h3>
                  <p className="text-gray-600">Goal Park, Kohalpur,Banke</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="w-6 h-6 text-[#F79F35]" />
                <a
                  href="tel:+11234567890"
                  className="ml-4 text-gray-600 hover:text-indigo-600"
                >
                  081534134
                </a>
              </div>
              <div className="flex items-center">
                <FaWhatsapp className="w-7 h-7 text-[#F79F35]" />
                <a
                  href="tel:+11234567890"
                  className="ml-4 text-gray-600 hover:text-blue-950 hover:font-semibold"
                >
                  9860501440/ 9868075900
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-6 h-6 text-[#F79F35]" />
                <a
                  target="_blank"
                  href="mailto:om.nextinfosys@gmail.com"
                  className="ml-4 text-gray-600 hover:text-blue-950 hover:font-semibold"
                >
                  om.nextinfosys@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <FaGlobe className="w-6 h-6 text-[#F79F35]" />
                <a
                  target="_blank"
                  href="https://nextinfosys.com.np/"
                  className="ml-4 text-gray-600 hover:text-blue-950 hover:font-semibold"
                >
                  www.nextinfosys.com.np
                </a>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Website Development",
                "Software Development",
                "Mobile App Development",
                "IT Training",
                "Digital Marketing",
                "Domain & Hosting",
                "CCTV Installation",
                "Computer Accessories",
                "Smart Boards",
                "IT Consulting",
              ].map((service) => (
                <div key={service} className="flex items-center">
                  <FaCheck className="w-4 h-4 text-[#F79F35] mr-2" />
                  <span className="text-gray-600">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row: Contact Form & Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <form className="space-y-6">
              <h1 className="flex justify-center items-center text-3xl font-bold text-blue-950">
                Leave a Message
              </h1>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <TextInput type="text" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <TextInput type="email" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea rows="5" required />
              </div>
              <Button type="submit" className="bg-blue-950">Send Message</Button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.338184964582!2d81.68238557420392!3d28.197036103725967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399865004e18c1c3%3A0x1c86cafd35392ba!2sNext%20Infosys%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1738940415878!5m2!1sen!2snp"
              width="100%"
              height="570"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
