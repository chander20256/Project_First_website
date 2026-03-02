const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted (demo)');
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;