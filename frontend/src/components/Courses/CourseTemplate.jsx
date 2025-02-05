import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function CourseTemplate() {
  const location = useLocation();
  const course = location.state?.course;
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl h-full mx-auto px-4 py-8 mt-10">
      <div className="rounded-xl p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                ★★★★☆ <span className="ml-2 text-gray-600">(4.5)</span>
              </div>
              <span>•</span>
              <span>12,500+ Students Enrolled</span>
            </div>
            <p className="text-gray-600 mb-6">{course.description}</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Enroll Now
            </button>
          </div>
          <div className="bg-gray-200 rounded-xl h-64 md:h-80">
            <img
              src={course.image}
              alt="course-image"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex border-b mb-8">
            {["overview", "curriculum", "instructor"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-[#F79F35] text-[#F79F35]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>

              {/* Extracting h2 headings from syllabus */}
              {(() => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                  course.syllabus,
                  "text/html"
                );
                const headings = Array.from(doc.querySelectorAll("h2")).map(
                  (h2, index) => (
                    <div key={index} className="border-b py-2">
                      <h3 className="text-lg font-semibold">
                        {h2.textContent}
                      </h3>
                    </div>
                  )
                );
                return headings.length > 0 ? (
                  headings
                ) : (
                  <p>No syllabus available</p>
                );
              })()}
            </div>
          )}

          {activeTab === "curriculum" && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Course Curriculum</h2>
              <div
                className="curriculum-content"
                dangerouslySetInnerHTML={{ __html: course.syllabus }}
              />
            </div>
          )}

          {activeTab === "instructor" && (
            <div className="flex items-start gap-6">
              <img
                src={course.image}
                className="w-16 h-16 rounded-full shadow-xl"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {course.instructor_name}
                </h3>
                <p className="text-gray-600 mb-4">{course.instructor_bio}</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    ★ 4.9 Instructor Rating
                  </div>
                  <div className="flex items-center gap-2">
                    👥 25,000+ Students
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-80">
          <div className="border rounded-xl p-6 sticky top-8">
            <div className="text-3xl font-bold mb-4">$149</div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-4 hover:bg-blue-700 transition">
              Enroll Now
            </button>
            <div className="space-y-4">
              <SidebarItem title="30-Day Money-Back Guarantee" />
              <SidebarItem title="Full Lifetime Access" />
              <SidebarItem title="Certificate of Completion" />
              <SidebarItem title="24/7 Support" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ title }) => (
  <div className="flex items-center gap-3 text-gray-600">✓ {title}</div>
);
