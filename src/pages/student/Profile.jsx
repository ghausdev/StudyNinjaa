import React, { useState, useEffect } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileEdit from './ProfileEdit';
import StudentService from '../../services/studentService';
import { toast } from 'react-toastify';
import Loading from '../../components/common/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchProfileAndStats = async () => {
          setLoading(true);
          try {
            const profileData = await StudentService.getProfile();
            const dashboardData = await StudentService.getStudentDashboard();

            setStudent(profileData.student);
            setStats([
                {
                  name: 'Essays Submitted',
                  value: dashboardData.essaysSubmitted || 0
                },
                {
                  name: 'Interviews Completed',
                  value: dashboardData.interviewsCompleted || 0
                },
                {
                    name: 'Average Score',
                    value: dashboardData.averagePercentage || 'N/A'
                }
              ]);

          } catch (error) {
             toast.error(error.message || 'Failed to fetch profile.');
          } finally {
            setLoading(false);
          }
        };
        fetchProfileAndStats();
    }, []);

    const handleEditProfile = () => {
      setIsEditing(true);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
    };

    const handleSaveProfile = (updatedStudent) => {
      setStudent(updatedStudent);
      setIsEditing(false);
    };

    if (loading) {
        return  <Loading />;
    }

    if (!student) {
      return <div className="text-center mt-8 text-red-500">Could not load user profile.</div>
    }

    return (
      <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
              <ProfileHeader
                user={student}
                stats={stats}
                showEdit={!isEditing}
                onEdit={handleEditProfile}
              />

              <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                    {isEditing ? (
                        <ProfileEdit 
                            user={student} 
                            onCancel={handleCancelEdit} 
                            onSave={handleSaveProfile} 
                        />
                    ) : (
                    <div className="space-y-6">
                        <div className="bg-gray-100 p-5 rounded-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Full Name', value: student?.userId?.name },
                                { label: 'Email', value: student?.userId?.email },
                                { label: 'Major', value: student?.major },
                                { label: 'University', value: student?.university },
                                ...(student?.bio ? [{ label: 'Bio', value: student?.bio }] : []),
                                ...(student?.dateOfBirth ? 
                                    [{ 
                                        label: 'Date of Birth', 
                                        value: new Date(student?.dateOfBirth).toLocaleDateString() 
                                    }] : 
                                    []
                                )
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                                    <span className="block text-sm font-medium text-gray-500 mb-1">
                                        {item.label}
                                    </span>
                                    <span className="block text-sm text-gray-900 font-semibold">
                                        {item.value || 'Not provided'}
                                    </span>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    )}
                </div>
              </div>
          </div>
      </div>
    );
};

export default Profile;