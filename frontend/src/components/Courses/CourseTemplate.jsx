import { useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";

export default function CourseTemplate({ course }) {
  const navigate = useNavigate();

  const handleEnroll = () => {
    // console.log(course);
    navigate(`/register/${course._id}`, {
      state: { course },
    });
  };
  console.log(course);
  // return (
  //   // <div className="m-11">
  //   //   <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
  //   //   <p className="mb-4 text-gray-700">{course.description}</p>

  //   //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //   //     {/* Course Details */}
  //   //     <div>
  //   //       <h2 className="text-xl font-semibold mb-2">Course Details</h2>
  //   //       <ul className="space-y-2 text-sm text-gray-600">
  //   //         <li>
  //   //           <strong>Duration:</strong>
  //   //           {course.courseDuration}
  //   //         </li>
  //   //         <li>
  //   //           <strong>Fees:</strong> ${course.totalAmount}
  //   //         </li>
  //   //         <li>
  //   //           <strong>Level:</strong>
  //   //           {"All level"}
  //   //         </li>
  //   //       </ul>
  //   //     </div>

  //   //     {/* Instructor Details */}
  //   //     <div>
  //   //       <h2 className="text-xl font-semibold mb-2">Instructor</h2>
  //   //       <p>{course.instructorName}</p>
  //   //       <p className="text-gray-600 text-sm"></p>
  //   //     </div>
  //   //   </div>

  //   //   {/* Syllabus */}
  //   //   <div className="mt-6">
  //   //     <h2 className="text-xl font-semibold mb-2">Syllabus</h2>
  //   //     <ul className="list-disc pl-5 text-gray-600">
  //   //       {course.syllabus.map((topic, index) => (
  //   //         <li key={index}>{topic}</li>
  //   //       ))}
  //   //     </ul>
  //   //   </div>

  //   //   {/* Enroll Button */}
  //   //   <div className="mt-6">
  //   //     <button
  //   //       onClick={handleEnroll}
  //   //       className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
  //   //     >
  //   //       Admission now
  //   //     </button>
  //   //   </div>
  //   // </div>

  //   <div className="max-w-full mx-auto my-14">
  //     <div className="bg-white overflow-hidden transform transition-all duration-500 ">
  //       {/* Course Title */}
  //       <h1 className="text-5xl font-extrabold text-blue-950 mb-6">
  //         {course.title}
  //       </h1>

  //       {/* Course Description */}
  //       <p className="text-lg text-gray-700 mb-8 leading-relaxed">
  //         {course.description}
  //       </p>

  //       {/* Course Duration */}
  //       <div className="mb-8">
  //         <span className="inline-block bg-gradient-to-r from-blue-800 to-blue-950 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
  //           {course.courseDuration}
  //         </span>
  //       </div>

  //       {/* Syllabus Section */}
  //       <div className="mb-8">
  //         <h2 className="text-3xl font-bold text-gray-900 mb-6">Syllabus</h2>
  //         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //           <li className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
  //             <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
  //             <span className="text-gray-700">{course.syllabus}</span>
  //           </li>
  //         </ul>
  //       </div>

  //       {/* Instructor Section */}
  //       <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
  //         <img
  //           className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
  //           src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232"
  //           alt="Instructor"
  //         />
  //         <div className="text-center sm:text-left">
  //           <h3 className="text-2xl font-bold text-gray-900">
  //             {course.instructorName}
  //           </h3>
  //           <p className="text-gray-600">Senior Frontend Developer</p>
  //           <p className="text-gray-600 mt-2">{course.instructorBio}</p>
  //         </div>
  //       </div>

  //       {/* Enroll Button */}
  //       <div className="mt-8 text-center">
  //         <Button
  //           onClick={handleEnroll}
  //           className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transform transition-all duration-300 hover:scale-105"
  //         >
  //           Enroll Now
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <main className="flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl  mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {course.title}{" "}
      </h1>
      <img
        src={course.image}
        alt={course.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-x-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>2025/10/10</span>
        <span>7 mins read</span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content "
        dangerouslySetInnerHTML={{
          __html: `
          <h1 class="text-4xl p-3">UI/UX Design</h1>
          <div class="flex flex-col gap-7">
          <p>
            Welcome to the UI/UX Design Course! This course covers everything from wireframing to prototyping, helping you learn how to create intuitive user interfaces.
          </p>
          <p>
            You will explore the fundamental principles of design and usability testing, ensuring your designs are both visually appealing and functional.
          </p>
          </div>
        `,
        }}
      ></div>
    </main>
  );
}
