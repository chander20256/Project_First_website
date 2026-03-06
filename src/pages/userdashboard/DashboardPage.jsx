import React from 'react'
import WelcomeSection from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/WelcomeSection'
import RecentTransactions from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/RecentTransactions'
import StatsCards from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/StatsCards'
import Leaderboard from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/Leaderboard'
import QuickActions from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/QuickActions'

function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <WelcomeSection />
      <RecentTransactions />
      <Leaderboard />
      <StatsCards />
      <QuickActions />
    </div>
  );
}

export default DashboardPage
