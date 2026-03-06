const WalletQuickActions = () => {
  const actions = [
    { icon: "📊", label: "Earnings Report" },
    { icon: "📧", label: "Payment Settings" },
    { icon: "📱", label: "Mobile Money" },
    { icon: "⚙️", label: "Support" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {actions.map((action, index) => (
        <button
          key={index}
          className="bg-gray-50 border rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-100 transition"
        >
          <span className="text-2xl">{action.icon}</span>
          <span className="text-sm">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default WalletQuickActions;
