import {
  FaGamepad,
  FaClipboardList,
  FaTasks,
  FaUserFriends,
  FaExchangeAlt,
  FaWallet,
  FaArrowDown,
  FaEye,
} from "react-icons/fa";

const StatsCards = () => {
  const stats = [
    { title: "Games", value: 12, icon: <FaGamepad /> },
    { title: "Surveys", value: 8, icon: <FaClipboardList /> },
    { title: "Tasks", value: 15, icon: <FaTasks /> },
    { title: "Referrals", value: 5, icon: <FaUserFriends /> },
    { title: "Transactions", value: 1, icon: <FaExchangeAlt /> },
    { title: "Deposit", value: "$0", icon: <FaWallet /> },
    { title: "Withdraw", value: "$0", icon: <FaArrowDown /> },
    { title: "Viewed Ads", value: 0, icon: <FaEye /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative rounded-2xl p-8 bg-white border-2 border-gray-200 
                     shadow-[0_8px_30px_rgb(0,0,0,0.06)] 
                     transition-all duration-300 
                     hover:shadow-[0_25px_50px_-15px_rgba(249,115,22,0.4)]
                     hover:border-orange-500
                     hover:-translate-y-2
                     before:absolute before:inset-0 before:rounded-2xl 
                     before:bg-gradient-to-b before:from-transparent before:to-black/[0.02]
                     before:pointer-events-none"
        >
          {/* Top Row */}
          <div className="flex items-center justify-between relative mb-8">
            <h3 className="text-base font-semibold text-gray-700 
                           tracking-wide uppercase">
              {stat.title}
            </h3>

            {/* Icon with enhanced styling */}
            <div
              className="w-16 h-16 flex items-center justify-center rounded-2xl 
                         bg-gradient-to-br from-orange-50 to-amber-50
                         text-orange-500 shadow-md
                         transition-all duration-300
                         group-hover:from-orange-500 group-hover:to-orange-600 
                         group-hover:text-white group-hover:shadow-xl 
                         group-hover:shadow-orange-500/30 group-hover:scale-110
                         group-hover:rotate-3"
            >
              <span className="text-3xl filter drop-shadow-md">
                {stat.icon}
              </span>
            </div>
          </div>

          {/* Value with enhanced styling */}
          <div className="relative">
            <p className="text-4xl font-bold text-gray-900 
                         tracking-tight mb-2">
              {stat.value}
            </p>
            
            {/* Decorative line */}
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 
                          rounded-full opacity-30 group-hover:opacity-100 
                          transition-opacity duration-300" />
            
            {/* Mini metric indicator */}
            <div className="absolute top-0 right-0 text-xs font-medium 
                          text-gray-400 group-hover:text-orange-400
                          transition-colors duration-300">
              • active
            </div>
          </div>

          {/* Enhanced background pattern */}
          <div className="absolute inset-0 rounded-2xl 
                        bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.08),_transparent_70%)]
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                        pointer-events-none" />
          
          {/* Floating particles effect */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500/20 
                        rounded-full blur-sm group-hover:bg-orange-500/40
                        transition-all duration-300" />
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-orange-500/10 
                        rounded-full blur-sm group-hover:bg-orange-500/30
                        transition-all duration-300 delay-100" />
        </div>
      ))}
    </div>
  );
};

export default StatsCards;