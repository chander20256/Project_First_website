import { useState, useEffect } from "react";
import { BookOpen, BarChart3, TrendingUp, Users } from "lucide-react";
import QuizStatCard from "./QuizStatCard";

const AdminQuizStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/attempts/admin-stats",
        );
        if (!response.ok) throw new Error("Failed to fetch admin stats");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        setError(err.message);
        setStats({
          totalQuizzes: 0,
          totalAttempts: 0,
          totalEarned: 0,
          totalUsers: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl h-20 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      <QuizStatCard
        icon={BookOpen}
        label="Total Quizzes"
        value={stats.totalQuizzes}
      />
      <QuizStatCard
        icon={BarChart3}
        label="Total Attempts"
        value={stats.totalAttempts}
      />
      <QuizStatCard
        icon={TrendingUp}
        label="Total Earned"
        value={stats.totalEarned}
      />
      <QuizStatCard
        icon={Users}
        label="Active Users"
        value={stats.totalUsers}
      />
    </div>
  );
};

export default AdminQuizStats;
