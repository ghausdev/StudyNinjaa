import React from 'react';
import { helpers } from '../../utils/helpers';

const ProfileHeader = ({
  user,
  stats,
  showEdit = true,
  onEdit
}) => {
  const getInitials = (name) => {
    return helpers.getInitials(name);
  };


  console.log("user gh",user);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-8">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={`${user.name}`}
                className="h-24 w-24 rounded-full object-cover border-4 border-red-100"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center border-4 border-red-200">
                <span className="text-3xl font-bold text-red-700">
                  {getInitials(user?.name)}
                </span>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left w-full">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
              
              {showEdit && (
                <button
                  onClick={onEdit}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-4 bg-gray-100 rounded-lg p-4">
                {stats.map(stat => (
                  <div key={stat.name} className="text-center">
                    <div className="text-2xl font-bold text-black">{stat.value}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider">
                      {stat.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;