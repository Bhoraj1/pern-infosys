import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    // <footer className="  bg-blue-950 text-white py-8">
    //   <div className="bottom-0 container md:mx-auto my-0 grid grid-cols-1 md:grid-cols-4 gap-6 md:p-0 pl-6">
    //     {/* Company Info */}
    //     <div>
    //       <h4 className="font-bold font-tw-cen text-lg mb-4">Next Infosys</h4>
    //       <p className="text-sm">
    //         Providing top-notch IT training and courses for all levels. Join us
    //         to enhance your skills.
    //       </p>
    //       <Button className=" mt-9 ">
    //         <Link
    //           to="/verify-certificate"
    //           className={` nav-link ${
    //             location.pathname == "/verify-certificate" ? "active" : ""
    //           } `}
    //         >
    //           Verify Certificate
    //         </Link>
    //       </Button>
    //     </div>

    //     {/* Quick Links */}
    //     <div>
    //       <h4 className="font-bold font-tw-cen text-lg mb-4">Quick Links</h4>
    //       <ul className="space-y-2">
    //         <li>
    //           <a href="/about" className="hover:text-blue-400">
    //             About Us
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/courses" className="hover:text-blue-400">
    //             Courses
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/contact" className="hover:text-blue-400">
    //             Contact
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/privacy" className="hover:text-blue-400">
    //             Privacy Policy
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     {/* Social Media Icons */}
    //     <div>
    //       <h4 className="font-bold font-tw-cen text-lg mb-4">Social Media</h4>
    //       <ul className="space-y-2">
    //         <li>
    //           <a
    //             href="https://www.facebook.com/nextinfosysbanke"
    //             target="_blank"
    //             className="flex hover:text-blue-400"
    //           >
    //             <FaFacebook className="m-1" /> Facebook
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="https://www.instagram.com/next.infosys/"
    //             target="_blank"
    //             className=" flex hover:text-blue-400"
    //           >
    //             <FaInstagram className="m-1" /> Instagram
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="https://www.twitter.com/nextinfosys"
    //             target="_blank"
    //             className="flex hover:text-blue-400"
    //           >
    //             <FaTiktok className="m-1" /> Tiktok
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="https://www.linkedin.com/nextinfosys"
    //             target="_blank"
    //             className=" flex hover:text-blue-400"
    //           >
    //             <FaYoutube className="m-1" /> Youtube
    //           </a>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Contact Info */}
    //     <div>
    //       <h4 className="font-bold font-tw-cen text-lg mb-4">Contact</h4>
    //       <ul className="space-y-2 text-sm">
    //         <li>
    //           Email:{" "}
    //           <a href="mailto:info@company.com" className="hover:text-blue-400">
    //             nextinfosys@gmail.com
    //           </a>
    //         </li>
    //         <li>
    //           Phone:{" "}
    //           <a href="tel:+1234567890" className="hover:text-blue-400">
    //             9863163060 , 081-534134
    //           </a>
    //         </li>
    //         <li>Address: Kohalpur-11,Banke, Nepal</li>
    //       </ul>
    //     </div>
    //   </div>

    //   {/* Bottom Bar */}
    //   <div className="text-center mt-8 border-t border-gray-700 pt-4">
    //     <p className="text-sm">
    //       &copy; 2024 Next Infosys. All Rights Reserved.
    //     </p>
    //   </div>
    // </footer>
    <footer className="bg-blue-950 px-4 sm:px-6 pt-12 pb-6 font-sans">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium">RESOURCES</h6>
          <ul className="space-y-2.5">
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Graphic Design Tools
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Video Editing Tools
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Image Enhancer
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Remove Backgrounds
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Photo Enhancement
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Explore All Tools
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium">HELPFUL LINKS</h6>
          <ul className="space-y-2.5">
            <li>
              <a
                href="/about"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/courses"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Career Opportunities
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Become a Contributor
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Brand Guidelines
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Upcoming Events
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Search Insights
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Latest Articles
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium">POLICIES</h6>
          <ul className="space-y-2.5">
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                User Agreement
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Data Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Copyright Notice
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Cookie Usage Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[13px] text-gray-400 hover:text-white"
              >
                Manage Cookies
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium">SOCIAL MEDIA</h6>
          <ul className="flex space-x-4">
            <li>
              <a
                target="_blank"
                href="https://www.facebook.com/nextinfosysbanke"
              >
                <FaFacebook className="fill-[#F79F35] w-8 h-8" />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.linkedin.com/nextinfosys">
                <FaLinkedin className="fill-[#F79F35] w-8 h-8" />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.instagram.com/next.infosys">
                <FaInstagram className="fill-[#F79F35] w-8 h-8" />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.twitter.com/nextinfosys">
                <FaTwitter className="fill-[#F79F35] w-8 h-8" />
              </a>
            </li>
          </ul>
          <div className="!mt-8">
            <h6 className="text-[13px] text-gray-400 font-medium">
              Get exclusive assets sent straight to your inbox
            </h6>
            <div className="mt-4">
              <a
                href="/"
                className="bg-[#F79F35] hover:bg-[#F79F35] text-sm text-white font-medium py-3 px-6 tracking-wide rounded"
              >
                Quick Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-600" />

      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-gray-400 text-[13px]">
          Next Infosys Copyright © {new Date().getFullYear()}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
