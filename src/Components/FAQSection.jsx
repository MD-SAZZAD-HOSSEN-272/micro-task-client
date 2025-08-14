import { useState } from "react";

const faqs = [
  {
    question: "How do I post a task?",
    answer:
      "Simply sign in as a buyer, go to your dashboard, and click on 'Post a Task'. Fill out the form and submit.",
  },
  {
    question: "How do workers get paid?",
    answer:
      "Workers receive payment directly after the task is completed and approved by the buyer.",
  },
  {
    question: "Is there any fee for posting tasks?",
    answer:
      "No, posting tasks is completely free. Only the agreed amount is paid to the worker.",
  },
  {
    question: "Can I apply for multiple tasks?",
    answer:
      "Yes! Workers can apply for as many open tasks as they qualify for.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We use industry-standard encryption to protect all user data and payments.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section
      data-aos="fade-up-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1000"
      className=" mx-auto px-4 py-16 bg-gradient-to-r  max-w-7xl from-gray-50 to-gray-100 rounded-2xl mt-16"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left p-4 bg-gray-100 hover:bg-gray-200 transition"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <span className="text-xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 text-gray-600 bg-white">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
