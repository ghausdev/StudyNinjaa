import React, { useState, useEffect } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import { formatters } from '../../utils/formatters';
import StudentService from '../../services/studentService';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (isAuthenticated) {
          const dashboardResponse = await StudentService.getStudentDashboard();
          setDashboardData(dashboardResponse);
 
        

         
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Skeleton Welcome Message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="mt-2 h-4 w-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Skeleton Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-4 h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Skeleton Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!dashboardData) {
    return <div>No dashboard data available.</div>;
  }

  const stats = [
    {
      title: 'Essays Submitted',
      value: dashboardData?.essaysSubmitted?.toString() || '0', // Use optional chaining for safety
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),

    },
    {
      title: 'Interviews Completed',
      value: dashboardData?.interviewsCompleted?.toString() || '0',// Use optional chaining for safety
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
 
    },
    {
      title: 'Average Percentage',
      value: dashboardData?.averagePercentage || '0 %',// Use optional chaining for safety
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),

    },
  ];



  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening with your applications
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
      <QuickActions userRole="student" />

      </div>








     

    
  );
};

export default Dashboard;