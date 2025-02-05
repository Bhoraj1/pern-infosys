import { FaQuoteRight, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useReview } from "../store/ContextAPI";
export default function Review() {
  const { reviews } = useReview();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="w-3.5 h-3.5 text-[#ff0000]" />);
      } else if (i - 0.5 === rating) {
        stars.push(
          <FaStarHalfAlt key={i} className="w-3.5 h-3.5 text-[#ff0000]" />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className="w-3.5 h-3.5 text-[#CED5D8]" />
        );
      }
    }
    return stars;
  };
  return (
    <div className="p-4 font-[sans-serif] ">
      <div className="max-w-6xl max-lg:max-w-3xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-blue-950 text-3xl font-bold">
            What our happy client say
          </h2>
          <p className="text-sm text-gray-500 mt-6 leading-relaxed">
            Veniam proident aute magna anim excepteur et ex consectetur velit
            ullamco veniam minim aute sit. Elit occaecat officia et laboris
            Lorem minim. Officia do aliqua adipisicing ullamco in.
          </p>
        </div>
        <div className=" grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-10 max-md:justify-center max-md:max-w-md mx-auto mt-16 ">
          {reviews.map((item, index) => (
            <div key={index} className="w-full shadow-lg lg:p-8 p-4 rounded-md bg-white relative duration-700 hover:scale-[1.07]">
              <div className="bg-[#F79F35] flex items-center justify-center w-12 h-12 max-lg:w-10 max-lg:h-10 rounded-full absolute -top-5 -right-5">
                <FaQuoteRight className="text-white w-4 h-4" />
              </div>

              <div className="flex items-center  ">
                <img
                  src={item.image}
                  className="w-14 h-14 rounded-full shadow-xl border-2 border-white"
                />

                <div className="ml-4">
                  <h6 className="text-sm font-semibold">{item.name}</h6>
                  <div className="flex space-x-1 mt-2">
                    {renderStars(item.rating)}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm leading-relaxed">{item.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
