import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CourseTemplate() {
  const { id } = useParams();
  const location = useLocation();
  const course = location.state?.course;

  console.log(course);
  return (
    <main className="flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl  mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {course.title}{" "}
      </h1>
      <img
        src={course.image}
        alt={course.title}
        className="mt-10 p-3 w-72 object-cover"
      />
      <div className="flex justify-between p-3 border-b border-x-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>2025/10/10</span>
        <span>7 mins read</span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content "></div>
    </main>
  );
}
