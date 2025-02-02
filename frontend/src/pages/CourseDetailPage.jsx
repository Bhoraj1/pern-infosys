import { useParams } from "react-router-dom";
import CourseTemplate from "../components/Courses/CourseTemplate";
import { useEffect, useState } from "react";
// import courses from "../data/coursesData";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  // const course = courses.find((course) => course.id === parseInt(id));

  useEffect(() => {  // This useEffect fetches all courses from the backend and stores them in the "courses" state.
    const fetchCourseDetail = async () => {
      try {
        const response = await fetch(`/api/backend6/getTrainings`); //
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.trainings);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourseDetail();
  }, []);

  useEffect(() => { // This useEffect compares the fetched courses with the ID from useParams and sets the selected course.
    if (courses.length > 0) {
      const selectedCourse = courses.find((course) => course._id === id);
      setCourse(selectedCourse);
    }
  }, [courses, id]);
  if (!course) {
    return <div className="p-6">Course not found.</div>;
  }
  return (
    <div className="p-6">
      <CourseTemplate course={course} />
    </div>
  );
}
