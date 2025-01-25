import React, { useState, useEffect } from 'react';
import StudentService from '../../services/studentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEdit = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    major: '',
    university: '',
    bio: '',
    dateOfBirth: '',
    profilePicture: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(user){
        setFormData({
            major: user.major || '',
            university: user.university || '',
            bio: user.bio || '',
            dateOfBirth: user.dateOfBirth || '',
            profilePicture: null,
          })
    }
  },[user])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

    const handleSave = async () => {
        setLoading(true);
        try {
            const dataToSend = {};
            if (formData.major) dataToSend.major = formData.major;
            if (formData.university) dataToSend.university = formData.university;
            if (formData.bio) dataToSend.bio = formData.bio;
            if (formData.dateOfBirth) dataToSend.dateOfBirth = formData.dateOfBirth;
            if (formData.profilePicture) dataToSend.profilePicture = formData.profilePicture;

            const response = await StudentService.updateProfile(dataToSend);
            toast.success(response.message);
            onSave(response.updatedStudent || response.newStudent);
        } catch (error) {
            toast.error(error.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b">
        Edit Profile
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-2">
              Major
            </label>
            <input
              type="text"
              name="major"
              id="major"
              value={formData.major}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
              University
            </label>
            <input
              type="text"
              name="university"
              id="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          ></textarea>
        </div>

        {!user?.dateOfBirth && (
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
          </div>
        )}

        <div>
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;