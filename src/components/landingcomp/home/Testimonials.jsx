const testimonials = [
  { name: 'John Doe', quote: 'This app changed my life!', role: 'Developer' },
  { name: 'Jane Smith', quote: 'Absolutely love the design.', role: 'Designer' },
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="italic mb-4">"{t.quote}"</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;