// Dashboard.js
import React, { useState, useEffect } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatters } from '../../utils/formatters';
import TutorService from '../../services/tutorService';

// Import mock data
// Mock Data Imports
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    essaysReviewed: 0,
    interviewsConducted: 0,
    rating: 0,
    earnings: '$0.00'
  });
  const [pendingEssays, setPendingEssays] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await TutorService.getDashboard();
        setDashboardData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate stats using real data
  const stats = [
    {
      title: 'Essays Reviewed',
      value: dashboardData.essaysReviewed.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
  
    },
    {
      title: 'Interviews Conducted',
      value: dashboardData.interviewsConducted.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),

    },
    {
      title: 'Rating',
      value: dashboardData.rating.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
   
    },
    {
      title: 'Earnings',
      value: dashboardData.earnings,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
   
    }
  ];


  return (
    <div className="space-y-6">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Welcome Message */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back!
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  You have {pendingEssays.length} essays pending review and {upcomingInterviews.length} upcoming interviews
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {formatters.formatDate(new Date())}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Quick Actions */}
          <QuickActions userRole="tutor" />
        </>
      )}
    </div>
  );
};

export default Dashboard;