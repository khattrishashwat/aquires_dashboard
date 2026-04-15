import React from 'react'
import Card from '@/components/dashboard/card'

const Dashboard = () => {
  const dashboardData = {
    totalTransactions: {
      value: '2,45,678',
      subtitle: "Today's volume",
      trend: '↑ 12.5%',
      comparison: 'vs yesterday'
    },
    successRate: {
      value: '96.8%',
      subtitle: 'vs 96.5% yesterday',
      trend: '↑ 0.3%',
      comparison: 'vs yesterday'
    },
    failures: {
      value: '7,851',
      subtitle: 'Declined transactions',
      trend: '↑ 8.2%',
      comparison: 'vs yesterday'
    },
    avgTAT: {
      value: '267 ms',
      subtitle: 'P95 = 524 ms',
      trend: '↓ 15%',
      comparison: 'faster'
    },
    tps: {
      value: '2,845',
      subtitle: 'Transactions per second',
      trend: '↑ 9.2%',
      comparison: 'vs yesterday'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <Card data={dashboardData} />
    </div>
  )
}

export default Dashboard