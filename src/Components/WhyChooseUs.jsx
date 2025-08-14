const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Fast Payment",
      desc: "Get paid instantly after completing a task.",
      icon: "⚡",
    },
    {
      title: "Reliable Support",
      desc: "We offer 24/7 support for all users.",
      icon: "🤝",
    },
    {
      title: "Secure Platform",
      desc: "We ensure your data and transactions are fully secure.",
      icon: "🔒",
    },
  ];

  return (
    <section
      data-aos="fade-up-right"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1000"
      className="bg-gray-100 py-16 px-4 max-w-7xl mx-auto pb-10 mb-10 rounded-2xl mt-16"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
