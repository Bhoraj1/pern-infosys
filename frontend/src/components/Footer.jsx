import { Button } from "flowbite-react";
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="  bg-blue-950 text-white py-8">
      <div className="bottom-0 container md:mx-auto my-0 grid grid-cols-1 md:grid-cols-4 gap-6 md:p-0 pl-6">
        {/* Company Info */}
        <div>
          <h4 className="font-bold font-tw-cen text-lg mb-4">Next Infosys</h4>
          <p className="text-sm">
            Providing top-notch IT training and courses for all levels. Join us
            to enhance your skills.
          </p>
          <Button className=" mt-9 ">
            <Link
              to="/verify-certificate"
              className={` nav-link ${
                location.pathname == "/verify-certificate" ? "active" : ""
              } `}
            >
              Verify Certificate
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold font-tw-cen text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/courses" className="hover:text-blue-400">
                Courses
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        {/* Social Media Icons */}
        <div>
          <h4 className="font-bold font-tw-cen text-lg mb-4">Social Media</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.facebook.com/nextinfosysbanke"
                target="_blank"
                className="flex hover:text-blue-400"
              >
                <FaFacebook className="m-1" /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/next.infosys/"
                target="_blank"
                className=" flex hover:text-blue-400"
              >
                <FaInstagram className="m-1" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/nextinfosys"
                target="_blank"
                className="flex hover:text-blue-400"
              >
                <FaTiktok className="m-1" /> Tiktok
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/nextinfosys"
                target="_blank"
                className=" flex hover:text-blue-400"
              >
                <FaYoutube className="m-1" /> Youtube
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold font-tw-cen text-lg mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a href="mailto:info@company.com" className="hover:text-blue-400">
                nextinfosys@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:text-blue-400">
                9863163060 , 081-534134
              </a>
            </li>
            <li>Address: Kohalpur-11,Banke, Nepal</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm">
          &copy; 2024 Next Infosys. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
