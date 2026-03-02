const features = [
  { title: 'Fast', description: 'Optimized for performance' },
  { title: 'Responsive', description: 'Works on all devices' },
  { title: 'Customizable', description: 'Easy to tweak and extend' },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;