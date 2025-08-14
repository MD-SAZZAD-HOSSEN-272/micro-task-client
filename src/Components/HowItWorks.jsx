const HowItWorks = () => {
  const steps = [
    {
      title: "1. Sign Up",
      desc: "Create your account as a buyer or a worker in seconds.",
      icon: "📝",
    },
    {
      title: "2. Post or Apply for Tasks",
      desc: "Buyers post tasks, workers browse and apply easily.",
      icon: "🧠",
    },
    {
      title: "3. Complete & Earn",
      desc: "Workers complete tasks and get paid instantly after approval.",
      icon: "💰",
    },
  ];

  return (
    <section
      data-aos="fade-right"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1000"
      className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl "
    >
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {steps.map((step, i) => (
          <div key={i} className="bg-white shadow p-6 rounded-xl">
            <div className="text-5xl mb-4">{step.icon}</div>
            <h4 className="text-xl font-semibold">{step.title}</h4>
            <p className="text-gray-600 mt-2">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
