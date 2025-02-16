import React, { useState } from "react";

const ProfilePictureSection = ({ handleChange, errors }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreview(url);

      // Call parent handler
      handleChange(e);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>

      <div>
        <label className="text-gray-700 text-sm font-semibold block">
          Upload Your Profile Picture <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 w-full"
            required
          />
          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Profile preview"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Please upload a clear, professional headshot. This will be your
            profile picture and cannot be changed later without admin approval.
          </p>
          {errors?.profilePicture && (
            <p className="text-sm text-red-600 mt-1">{errors.profilePicture}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureSection;
