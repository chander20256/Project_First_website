const ActiveTask = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">Active Task</h3>

      <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        {/* Task instructions will load here */}

        <p className="text-gray-500">Task instructions will appear here</p>
      </div>
    </div>
  );
};

export default ActiveTask;
