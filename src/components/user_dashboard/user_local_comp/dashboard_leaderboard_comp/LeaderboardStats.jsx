import { motion } from "framer-motion";
import { Users, Zap, DollarSign } from "lucide-react";

const stats = [
  {
    title: "Total Players",
    value: "1,245",
    raw: 1245,
    icon: Users,
    accent: "from-orange-400 to-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconColor: "text-orange-500",
    suffix: "",
  },
  {
    title: "Total Points",
    value: "98,765",
    raw: 98765,
    icon: Zap,
    accent: "from-black to-gray-700",
    bg: "bg-gray-50",
    border: "border-gray-200",
    iconColor: "text-black",
    suffix: "pts",
  },
  {
    title: "Avg Daily Earnings",
    value: "$54",
    raw: 54,
    icon: DollarSign,
    accent: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconColor: "text-orange-500",
    suffix: "/day",
  },
];

const LeaderboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-2xl border ${stat.border} ${stat.bg} p-5 flex items-center gap-4 shadow-sm`}
          >
            {/* Icon circle */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.accent} flex items-center justify-center shadow-md flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
                {stat.title}
              </p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-black" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-xs font-bold text-gray-400 uppercase">{stat.suffix}</span>
                )}
              </div>
            </div>

            {/* Decorative corner dot */}
            <div className={`absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br ${stat.accent} opacity-10`} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default LeaderboardStats;