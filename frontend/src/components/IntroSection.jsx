export default function IntroSection() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hiddenn">
      <div className="absolute inset-0 animate-zoom ">
        <img
          src="https://nextinfosys.com.np/wp-content/plugins/desert-companion//inc/themes/corpiva/assets/images/slider01.jpg"
          alt="Background Image"
          className="object-cover object-center w-full h-full "
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Welcome to Next Infosys Pvt.Ltd
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover amazing features and services that await you.
        </p>

        <a
          href="#"
          className="bg-[#F79F35] text-gray-900 hover:text-[#221b44] py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
