// Profile.js
import React, { useState } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import SettingsForm from '../../components/profile/SettingsForm';
import ActivityLog from '../../components/profile/ActivityLog';
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';


const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Get mock student data
  const student = mockUsers.students[0];

  // Calculate activity stats
  const stats = [
    {
      name: 'Essays Submitted',
      value: student.stats.essaysSubmitted
    },
    {
      name: 'Interviews Completed',
      value: student.stats.interviewsCompleted
    },
    {
      name: 'Average Score',
      value: '8.5/10'
    },
    {
      name: 'Days Active',
      value: '45'
    }
  ];

  // Get user activities (combine essays and interviews)
  const activities = [
    ...mockEssays
      .filter(essay => essay.studentId === student.id)
      .map(essay => ({
        type: 'essay',
        title: essay.title,
        status: essay.status,
        date: essay.submittedAt
      })),
    ...mockInterviews
      .filter(interview => interview.studentId === student.id)
      .map(interview => ({
        type: 'interview',
        title: `${interview.subject} Interview`,
        status: interview.status,
        date: interview.datetime
      }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSaveProfile = (formData) => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header with Stats */}
      <ProfileHeader
        user={student}
        stats={stats}
        showEdit={!isEditing}
        onEdit={() => setIsEditing(true)}
      />

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {['profile', 'activity'].map((tab) => (
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
                {tab === 'profile' ? 'Profile Settings' : 'Activity Log'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' ? (
            isEditing ? (
              <SettingsForm
                user={student}
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
                        {student.firstName} {student.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Email</span>
                      <span className="block mt-1 text-sm text-gray-900">{student.email}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Target University</span>
                      <span className="block mt-1 text-sm text-gray-900">{student.targetUniversity}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Target Course</span>
                      <span className="block mt-1 text-sm text-gray-900">{student.targetCourse}</span>
                    </div>
                  </div>
                </div>

                {/* Subscription Details */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Subscription Details</h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Current Plan</span>
                      <span className="block mt-1 text-sm text-gray-900">{student.subscription.plan}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Valid Until</span>
                      <span className="block mt-1 text-sm text-gray-900">
                        {new Date(student.subscription.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <ActivityLog activities={activities} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;