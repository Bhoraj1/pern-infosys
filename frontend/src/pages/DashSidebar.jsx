import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaFileInvoiceDollar, FaHome, FaTimes } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdDashboard } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";
import { MdTune } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { PiStudentBold } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/adminRedux/adminSlice";
import toast from "react-hot-toast";

export default function DashSidebar() {
  const location = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubMenu2, setOpenSubMenu2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      // setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/admin/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message || "Failed to sign out");
      } else {
        localStorage.clear();
        dispatch(logout());
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const toggleDropdown = (dropdown) => {
    setIsSubMenuOpen(isSubMenuOpen === dropdown ? null : dropdown);
  };

  const toggleSubMenu = (dropdown2) => {
    setOpenSubMenu2(openSubMenu2 === dropdown2 ? null : dropdown2);
  };

  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-5 left-24 z-[100] bg-[#F79F35] text-white p-2 rounded-md lg:hidden"
      >
        {sidebarOpen ? (
          <FaTimes className="w-4 h-4" />
        ) : (
          <FaBars className="w-4 h-4" />
        )}
      </button>
      <div
        id="sidebar-collapse-menu"
        className={`bg-[#081028] shadow-lg h-screen fixed top-20 left-0 overflow-auto z-[99] lg:w-[270px] transition-transform duration-500 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className=" px-4">
          <ul className="space-y-2 mt-6">
            {/*Dashboard */}
            <li>
              <a
                onClick={() => toggleDropdown("dashboard")}
                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
              >
                <MdDashboard className={`w-[18px] h-[18px] mr-3 `} />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Dashboard
                </span>
                <FiChevronDown
                  className={`arrowIcon ml-auto transition-all duration-500  ${
                    isSubMenuOpen === "dashboard" ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </a>
              <ul
                className={`sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                  isSubMenuOpen === "dashboard" ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                <li>
                  <a
                    href="/dashboard"
                    className={`text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300`}
                  >
                    <span>Analytics</span>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className={`text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300`}
                  >
                    <span>Logistics</span>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className={`text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300`}
                  >
                    <span>Academy</span>
                  </a>
                </li>
              </ul>
            </li>

            {/*Home */}
            <li>
              <a
                onClick={() => toggleDropdown("home")}
                href="javascript:void(0)"
                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
              >
                <FaHome className="w-[18px] h-[18px] mr-3" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Home
                </span>
                <FiChevronDown
                  className={`arrowIcon ml-auto transition-all duration-500  ${
                    isSubMenuOpen === "home" ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </a>
              <ul
                className={`sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                  isSubMenuOpen === "home" ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                {/*inner submenu */}
                <li>
                  <a
                    onClick={() => toggleSubMenu("services")}
                    className="text-gray-300 text-sm flex cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Services Management</span>
                    <FiChevronDown
                      className={`arrowIcon  ml-auto transition-al duration-500  ${
                        openSubMenu2 === "services" ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </a>
                  <ul
                    className={`sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                      openSubMenu2 === "services" ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("services");
                        navigate("/dashboard?tab=service-form");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Add Services
                    </a>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("faq");
                        navigate("/dashboard?tab=services");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Services Dashboard
                    </a>
                  </ul>
                </li>
                <li>
                  <a
                    onClick={() => toggleSubMenu("faq")}
                    className="text-gray-300 text-sm flex cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>FAQ Management</span>
                    <FiChevronDown
                      className={`arrowIcon  ml-auto transition-al duration-500  ${
                        openSubMenu2 === "faq" ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </a>
                  <ul
                    className={`sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                      openSubMenu2 === "faq" ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("faq");
                        navigate("/dashboard?tab=add-faq");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Add FAQ
                    </a>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("faq");
                        navigate("/dashboard?tab=faq-dash");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      FAQ Dashboard
                    </a>
                  </ul>
                </li>
                <li>
                  <a
                    onClick={() => toggleSubMenu("team")}
                    className="text-gray-300 text-sm flex cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Team Management</span>
                    <FiChevronDown
                      className={`arrowIcon  ml-auto transition-al duration-500  ${
                        openSubMenu2 === "team" ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </a>
                  <ul
                    className={`sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                      openSubMenu2 === "team" ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("team");
                        navigate("/dashboard?tab=add-team");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Add Team
                    </a>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("team");
                        navigate("/dashboard?tab=team-dash");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Team Dashboard
                    </a>
                  </ul>
                </li>
                <li>
                  <a
                    onClick={() => toggleSubMenu("review")}
                    className="text-gray-300 text-sm flex cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Review Management</span>
                    <FiChevronDown
                      className={`arrowIcon  ml-auto transition-al duration-500  ${
                        openSubMenu2 === "review" ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </a>
                  <ul
                    className={`sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                      openSubMenu2 === "review" ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("review");
                        navigate("/dashboard?tab=add-review");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Add Review
                    </a>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("review");
                        navigate("/dashboard?tab=review-dash");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Review Dashboard
                    </a>
                  </ul>
                </li>
                <li>
                  <a
                    onClick={() => toggleSubMenu("blog")}
                    className="text-gray-300 text-sm flex cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Blog Management</span>
                    <FiChevronDown
                      className={`arrowIcon  ml-auto transition-al duration-500  ${
                        openSubMenu2 === "blog" ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </a>
                  <ul
                    className={`sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                      openSubMenu2 === "blog" ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("blog");
                        navigate("/dashboard?tab=blog-form");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Post Blog
                    </a>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubMenu("blog");
                        navigate("/dashboard?tab=blog-dash");
                      }}
                      className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                    >
                      Blog Dashboard
                    </a>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <a
                onClick={() => toggleDropdown("shedules")}
                href="javascript:void(0)"
                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
              >
                <FaCalendarAlt className="w-[18px] h-[18px] mr-3" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Schedules
                </span>
                <FiChevronDown
                  className={`arrowIcon ml-auto transition-all duration-500  ${
                    isSubMenuOpen === "shedules" ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </a>
              <ul
                className={`sub-menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                  isSubMenuOpen === "shedules" ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                <li>
                  <a
                    href="javascript:void(0)"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Date</span>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Time</span>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a
                onClick={() => toggleDropdown("audience")}
                href="javascript:void(0)"
                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
              >
                <IoPeople className="w-[18px] h-[18px] mr-3" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Users Dashboard
                </span>
                <MdKeyboardArrowDown
                  className={`arrowIcon ml-auto transition-transform duration-500 ${
                    isSubMenuOpen === "audience" ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </a>
              <ul
                className={`sub-menu ml-8 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  isSubMenuOpen === "audience" ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                <li>
                  <Link
                    to="/dashboard?tab=inquiry-user"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Inquiry-Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=admissions"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Total Admissions</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                onClick={() => toggleDropdown("training")}
                href="javascript:void(0)"
                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
              >
                <FaChalkboardTeacher className="w-[18px] h-[18px] mr-3" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Training Mangement
                </span>

                <MdKeyboardArrowDown
                  className={`arrowIcon ml-auto transition-transform duration-500 ${
                    isSubMenuOpen === "training" ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </a>
              <ul
                className={`sub-menu ml-8 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  isSubMenuOpen === "training" ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                <li>
                  <Link
                    to="/dashboard?tab=add-training"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Add Training</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=all-training"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Training Dashboard</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <a
                onClick={() => toggleDropdown("services")}
                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
              >
                <PiStudentBold className="w-[18px] h-[18px] mr-3" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Student Management
                </span>
                <MdKeyboardArrowDown
                  className={`arrowIcon ml-auto transition-transform duration-500 ${
                    isSubMenuOpen === "services" ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </a>
              <ul
                className={`sub-menu ml-8 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  isSubMenuOpen === "services" ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                <li>
                  <Link
                    to="/dashboard?tab=admission-form"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Student Admission Form</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=student-dahsboard"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Students Dashboard</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/dashboard?tab=create-billing"
                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
              >
                <FaFileInvoiceDollar className="w-[18px] h-[18px] mr-3" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Update Bill
                </span>
                <MdKeyboardArrowDown
                  className={`arrowIcon ml-auto transition-transform duration-500 ${
                    isSubMenuOpen ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </Link>
            </li>

            <li>
              <a
                onClick={() => toggleDropdown("actions")}
                className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
              >
                <ImSwitch className="w-[18px] h-[18px] mr-3" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  Actions
                </span>
                <MdKeyboardArrowDown className="arrowIcon ml-auto transition-all duration-500 transform -rotate-90" />
              </a>
              <ul
                className={`sub-menu ml-8 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  isSubMenuOpen === "actions" ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                <li>
                  <a
                    href="javascript:void(0)"
                    className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300"
                  >
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a className="text-gray-300 text-sm block cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2 transition-all duration-300">
                    <span onClick={handleSignout}>Logout</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <hr className="border-gray-600 my-6" />
          <div>
            <ul className="space-y-2 mb-20">
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
                >
                  <RiShieldCheckFill className="w-[18px] h-[18px] mr-3" />
                  <span>Security</span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-300 text-sm flex items-center cursor-pointer hover:bg-[#0b1739] rounded-md px-3 py-2.5 transition-all duration-300"
                >
                  <MdTune className="w-[18px] h-[18px] mr-3 " />
                  <span>Preferences</span>
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center cursor-pointer">
              <img
                src="https://readymadeui.com/profile.webp"
                className="w-9 h-9 rounded-full border-2 border-gray-600 shrink-0"
              />
              <div className="ml-4">
                <p className="text-sm text-gray-300 whitespace-nowrap">
                  John Doe
                </p>
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  Active free account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
