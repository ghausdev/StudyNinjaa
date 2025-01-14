// Profile.js
import React, { useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import SettingsForm from '../../components/profile/SettingsForm';
import ActivityLog from '../../components/profile/ActivityLog';
import { helpers } from '../../utils/helpers';
import { formatters } from '../../utils/formatters';
// Mock Data Imports
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Get mock tutor data
  const tutor = mockUsers.tutors[0];

  // Calculate activity stats
  const stats = [
    {
      name: 'Essays Reviewed',
      value: tutor.stats.essaysReviewed
    },
    {
      name: 'Interviews Conducted',
      value: tutor.stats.interviewsConducted
    },
    {
      name: 'Average Rating',
      value: `${tutor.rating}/5.0`
    },
    {
      name: 'Earnings',
      value: formatters.formatCurrency(4500)
    }
  ];

  // Get tutor activities (combine essays and interviews)
  const activities = [
    ...mockEssays
      .filter(essay => essay.tutorId === tutor.id)
      .map(essay => ({
        type: 'essay_review',
        title: `Reviewed essay: ${essay.title}`,
        status: essay.status,
        date: essay.reviewedAt || essay.submittedAt
      })),
    ...mockInterviews
      .filter(interview => interview.tutorId === tutor.id)
      .map(interview => ({
        type: 'interview',
        title: `${interview.subject} Interview`,
        status: interview.status,
        date: interview.datetime
      }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSaveProfile = async (formData) => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header with Stats */}
      <ProfileHeader
        user={tutor}
        stats={stats}
        showEdit={!isEditing}
        onEdit={() => setIsEditing(true)}
      />

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {['profile', 'activity', 'earnings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap
                  ${activeTab === tab
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {helpers.capitalizeWords(tab)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            isEditing ? (
              <SettingsForm
                user={tutor}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Full Name</span>
                      <span className="block mt-1 text-sm text-gray-900">
                        {tutor.firstName} {tutor.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Email</span>
                      <span className="block mt-1 text-sm text-gray-900">{tutor.email}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">University</span>
                      <span className="block mt-1 text-sm text-gray-900">{tutor.university}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Qualification</span>
                      <span className="block mt-1 text-sm text-gray-900">{tutor.qualification}</span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Specializations</h3>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {tutor.specializations.map((specialization) => (
                        <span
                          key={specialization}
                          className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
                        >
                          {specialization}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Availability Schedule */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Availability Schedule</h3>
                  <div className="mt-4 space-y-4">
                    {tutor.availability.map((slot) => (
                      <div key={slot.day} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{slot.day}</span>
                        <div className="text-sm text-gray-500">
                          {slot.slots.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}

          {activeTab === 'activity' && (
            <ActivityLog activities={activities} />
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              {/* Earnings Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-sm font-medium text-gray-500">This Month</h4>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {formatters.formatCurrency(1200)}
                  </p>
                  <p className="mt-1 text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-sm font-medium text-gray-500">Last Month</h4>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {formatters.formatCurrency(950)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-sm font-medium text-gray-500">Total Earnings</h4>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {formatters.formatCurrency(4500)}
                  </p>
                </div>
              </div>

              {/* Recent Earnings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Earnings</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activities
                        .filter(activity => activity.type === 'essay_review' || activity.type === 'interview')
                        .slice(0, 5)
                        .map((activity, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatters.formatDate(activity.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${activity.type === 'essay_review' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {activity.type === 'essay_review' ? 'Essay Review' : 'Interview'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {activity.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                              {formatters.formatCurrency(activity.type === 'essay_review' ? 50 : 75)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;