const QuizStatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 font-['DM_Sans',sans-serif] shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {label}
        </p>
        <div className="p-2 rounded-lg bg-orange-50">
          <Icon className="w-5 h-5 text-orange-600" />
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
        {value}
      </p>
    </div>
  );
};

export default QuizStatCard;
