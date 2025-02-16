import React, { useState, useEffect } from 'react';
import TutorService from '../../services/tutorService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEdit = ({ user, onCancel, onSave }) => {
    const STUDY_LEVELS = ["GCSE", "A-Level", "Bachelor", "Masters", "PhD"];
    const [formData, setFormData] = useState({
        university: '',
        StudyLevel: '',
        yearsOfExperience: '',
        motivation: '',
        subjects: [],
        profilePicture: null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                university: user.university || '',
                StudyLevel: user.StudyLevel || '',
                yearsOfExperience: user.yearsOfExperience || '',
                motivation: user.motivation || '',
                subjects: user.subjects || [],
                profilePicture: null,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubjectsChange = (e, index, field) => {
        const newSubjects = [...formData.subjects];
        if (field === 'levels') {
            newSubjects[index][field] = e.target.value.split(',').map(level => level.trim());
        } else {
            newSubjects[index][field] = e.target.value;
        }
        setFormData(prev => ({ ...prev, subjects: newSubjects }));
    };

    const addSubject = () => {
        setFormData(prev => ({
            ...prev,
            subjects: [...prev.subjects, { name: '', levels: [] }]
        }));
    };

    const removeSubject = (index) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await TutorService.updateTutorProfile(formData);
            toast.success('Profile updated successfully');
            onSave(response.tutor);
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
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
                        <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                            University
                        </label>
                        <input
                            type="text"
                            name="university"
                            id="university"
                            value={formData.university}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="StudyLevel" className="block text-sm font-medium text-gray-700 mb-2">
                            Study Level
                        </label>
                        <select
                            name="StudyLevel"
                            id="StudyLevel"
                            value={formData.StudyLevel}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select Study Level</option>
                            {STUDY_LEVELS.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                            Years of Experience
                        </label>
                        <input
                            type="number"
                            name="yearsOfExperience"
                            id="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div> */}
                </div>

                <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                        Motivation
                    </label>
                    <textarea
                        name="motivation"
                        id="motivation"
                        rows="4"
                        value={formData.motivation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-gray-700">Subjects</label>
                        <button
                            type="button"
                            onClick={addSubject}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Add Subject
                        </button>
                    </div>
                    {formData.subjects.map((subject, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Subject Name"
                                    value={subject.name}
                                    onChange={(e) => handleSubjectsChange(e, index, 'name')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    multiple
                                    value={subject.levels}
                                    onChange={(e) => {
                                        const selectedLevels = Array.from(e.target.selectedOptions, option => option.value);
                                        const newSubjects = [...formData.subjects];
                                        newSubjects[index].levels = selectedLevels;
                                        setFormData(prev => ({ ...prev, subjects: newSubjects }));
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    {STUDY_LEVELS.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => removeSubject(index)}
                                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit; 