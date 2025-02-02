import { useState } from "react";
import { useFaqs } from "../store/ContextAPI";


export default function FAQ() {
  const { faqs } = useFaqs();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  // const { adminDetails } = useSelector((state) => state.admin);
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-y-12 md:grid md:grid-flow-row md:grid-cols-2 md:gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="mb-4 text-blue-950 text-3xl font-bold md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl">
              Get quick answers and insights about no-code app development with
              our FAQ section.
            </p>
          </div>
          <div>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="flex-col items-stretch justify-start border-b border-gray-200"
              >
                <div
                  className="flex cursor-pointer items-center justify-between px-4 py-4 md:pb-7 md:pt-3"
                  onClick={() => toggleFaq(index)}
                >
                  <p className="text-lg font-medium md:text-xl select-none">
                    {faq.question}
                  </p>
                  <div className="ml-6 flex h-6 w-7 self-start md:w-6">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-500 ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M16 12l-8 8 8 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {openFaqIndex === index && (
                  <div className="px-4 sm:px-8 py-4">
                    <p className="text-sm sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
