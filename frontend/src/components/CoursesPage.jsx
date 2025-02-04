import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CoursesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const isCoursePage = location.pathname === "/courses";
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/backend6/getTrainings");
        if (!response.ok) {
          console.log("Failed to fetch courses");
        } else {
          const data = await response.json();
          setCourses(data.trainings);
          if (data.trainings.length < 8) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleShowMore = async () => {
    const startIndex = courses.length;
    try {
      const res = await fetch(
        `/api/backend6/getTrainings?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setCourses((prev) => [...prev, ...data.trainings]);
        if (data.trainings.length < 8) {
          setShowMore(false);
        }
        navigate("/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCourseClick = (course) => {
    const courseTitleSlug = course.title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/course/${courseTitleSlug}`, { state: { course } });
  };
  return (
    <>
      <div
        className={`ml-20 sm:ml-16 ${
          isCoursePage ? "mt-28" : "mt-10"
        }  font-tw-cen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in `}
      >
        {courses.map((course) => (
          <div
            className="w-64 bg-white rounded-xl shadow-lg relative transition-all duration-500 hover:scale-[1.07] h-[340px]"
            key={course.id}
          >
            <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded-lg z-20 ">
              {course.course_duration}
            </div>
            <a onClick={() => handleCourseClick(course)}>
              <img
                className="rounded-t-xl h-40 w-full object-cover"
                src={course.image}
              />
            </a>
            <div className="p-3">
              <a onClick={() => handleCourseClick(course)}>
                <h5 className="pb-4 text-xl flex flex-col  h-full">
                  {course.title}
                </h5>
              </a>
              <p
                onClick={() => handleCourseClick(course)}
                className="font-normal p-1 text-gray-700 dark:text-gray-400 relative line-clamp-3"
              >
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-[#F79F35] self-center text-lg py-7"
        >
          Show More
        </button>
      )}
    </>
  );
}
