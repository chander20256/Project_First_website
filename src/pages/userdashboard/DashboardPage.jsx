import React, { useState } from 'react'
import WelcomeLeft from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/WelcomeLeft'
import WelcomeRight from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/WelcomeRight'
import StatsLeft from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/StatsLeft'
import StatsRight from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/StatsRight'
import RecentTransactions from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/RecentTransactions'
import QuickActions from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/QuickActions'
import StatisticsGraph from '../../components/user_dashboard/user_local_comp/dashboard_page_comp/StatisticsGraph'

function DashboardPage() {
  const [selectedStat, setSelectedStat] = useState("tasks");

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Welcome Section - Both sides as cards with consistent styling */}
      <div className="flex gap-6 w-full">
        {/* Welcome Left - Now a proper card */}
        <div className="w-[35%]">
          <div
            className="rounded-2xl p-6 h-full"
            style={{
              background: "#ffffff",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <WelcomeLeft />
          </div>
        </div>
        
        {/* Welcome Right - Card styling */}
        <div className="w-[65%]">
          <div
            className="rounded-2xl p-6 h-full"
            style={{
              background: "#ffffff",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex",
              alignItems: "center",
            }}
          >
            <WelcomeRight />
          </div>
        </div>
      </div>

      {/* Quick Actions - Full Width Card */}
      <div
        className="rounded-2xl p-6 w-full"
        style={{
          background: "#ffffff",
          border: "1px solid #f0f0f0",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <QuickActions />
      </div>

      {/* Stats Section - Cards on Left, Chart on Right */}
      <div className="flex gap-6 w-full">
        <div className="w-[40%]">
          <StatsLeft
            selectedStat={selectedStat}
            onSelectStat={setSelectedStat}
          />
        </div>
        <div className="w-[60%]">
          <StatsRight selectedStat={selectedStat} />
        </div>
      </div>
      
      {/* Statistics Graph - Full Width Card */}
      <StatisticsGraph />

      {/* Recent Transactions - Full Width Card */}
      <RecentTransactions />

    </div>
  );
}

export default DashboardPage;