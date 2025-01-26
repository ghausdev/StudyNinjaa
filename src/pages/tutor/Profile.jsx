// Profile.js
import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileEdit from './ProfileEdit';
import TutorService from '../../services/tutorService';
import { toast } from 'react-toastify';
import Loading from '../../components/common/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchProfileAndStats = async () => {
      setLoading(true);
      try {
        const response = await TutorService.getTutorProfile();
        console.log('Profile Data:', response.tutor);
        const dashboardData = await TutorService.getDashboard();
        
        setTutor(response.tutor);
        setStats([
          {
            name: 'Essays Reviewed',
            value: dashboardData?.essaysReviewed || 0
          },
          {
            name: 'Interviews Conducted',
            value: dashboardData?.interviewsConducted || 0
          },
          {
            name: 'Rating',
            value: `${dashboardData?.rating || 0}/5.0`
          },
          {
            name: 'Earnings',
            value: dashboardData?.earnings || '0.00'
          }
        ]);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(error.message || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndStats();
  }, []);

  const handleEditProfile = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);
  const handleSaveProfile = (updatedTutor) => {
    setTutor(updatedTutor);
    setIsEditing(false);
  };

  if (loading) return <Loading />;
  if (!tutor) return <div className="text-center mt-8 text-red-500">Could not load tutor profile.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader
          user={{
            name: tutor.name,
            email: tutor.email,
            profilePicture: tutor.profilePicture
          }}
          stats={stats}
          showEdit={!isEditing}
          onEdit={handleEditProfile}
        />

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            {isEditing ? (
              <ProfileEdit
                user={tutor}
                onCancel={handleCancelEdit}
                onSave={handleSaveProfile}
              />
            ) : (
              <div className="space-y-8">
                {/* Academic Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'University', value: tutor.university },
                      { label: 'Study Level', value: tutor.StudyLevel },
                      { label: 'Years of Experience', value: `${tutor.yearsOfExperience} years` },
                      { label: 'Motivation', value: tutor.motivation }
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                        <span className="block text-sm font-medium text-gray-500 mb-1">
                          {item.label}
                        </span>
                        <span className="block text-sm text-gray-900 font-semibold">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

               

                {/* Subjects and Levels */}
                {tutor.subjects?.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                      Subjects and Levels
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {tutor.subjects.map((subject, index) => (
                        <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                          <span className="block text-sm font-medium text-gray-500 mb-1">
                            {subject.name}
                          </span>
                          <span className="block text-sm text-gray-900 font-semibold">
                            {subject.levels.join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;