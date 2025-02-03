import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { useTeams } from "../store/ContextAPI";

export default function Teams() {
  const { teams } = useTeams();
  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Meet our team of Engineers, designers, and product managers.
          </h3>
          <p className="text-gray-600 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.Lorem Ipsum has been the industrys standard dummy.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 ">
            {teams.map((item, idx) => (
              <li key={idx}>
                <div className="w-full h-60 sm:h-52 md:h-56 transition-all duration-500 hover:scale-[1.07]">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover object-center shadow-md rounded-xl"
                    alt="image"
                  />
                </div>
                <div className="mt-4 duration-500 hover:scale-[1.07] ">
                  <h4 className="text-lg text-gray-700 font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-[#F79F35] font-semibold">
                    {item.department}
                  </p>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <div className="mt-3 flex gap-4 text-gray-400">
                    <a target="_blank" href={item.socialMedia?.twitter}>
                      <FaTwitter className="w-5 h-5 duration-150 hover:text-[#F79F35]" />
                    </a>
                    <a target="_blank" href={item.socialMedia?.github}>
                      <FaGithub className="w-5 h-5 duration-150 hover:text-[#F79F35]" />
                    </a>
                    <a target="_blank" href={item.socialMedia?.linkedin}>
                      <FaLinkedin className="w-5 h-5 duration-150 hover:text-[#F79F35]" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
