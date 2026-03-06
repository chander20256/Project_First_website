const QuickActions = () => {
  const actions = [
    { label: "Spin Wheel", color: "bg-green-500" },
    { label: "Available Tasks", color: "bg-blue-500" },
    { label: "Withdraw", color: "bg-orange-500" },
    { label: "Transaction History", color: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {actions.map((action, index) => (
        <button
          key={index}
          className={`${action.color} text-white py-3 rounded-lg font-medium hover:opacity-90 transition`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
