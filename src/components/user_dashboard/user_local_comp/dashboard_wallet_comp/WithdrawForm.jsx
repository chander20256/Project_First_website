const actions = [
  { icon: "📊", label: "Earnings Report",  desc: "View full report"   },
  { icon: "📧", label: "Payment Settings", desc: "Manage payouts"     },
  { icon: "📱", label: "Mobile Money",     desc: "Link mobile wallet" },
  { icon: "⚙️", label: "Support",          desc: "Get help"           },
];

const WalletQuickActions = () => {
  return (
    <div className="mt-4 font-['DM_Sans',sans-serif]">
      <h3 className="text-sm font-bold text-black mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-start gap-2 hover:border-orange-400 hover:bg-orange-50 transition-all duration-150 text-left outline-none"
          >
            <span className="text-2xl">{action.icon}</span>
            <div>
              <p className="text-sm font-semibold text-black leading-tight">
                {action.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {action.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletQuickActions;