import React, { useState, useEffect } from 'react';
import TutorService from '../../services/tutorService';
import { toast } from 'react-toastify';
import Loading from '../../components/common/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';

const TutoringProfile = () => {
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        subject: '',
        hourlyRate: 0,
        description: '',
        status: 'Available',
    });
    const [availability, setAvailability] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    });

    // Time slots for availability
    const timeSlots = [
        '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
        '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'
    ];

    useEffect(() => {
        fetchTutoringProfile();
    }, []);

    const fetchTutoringProfile = async () => {
        try {
            const response = await TutorService.getTutoringProfile();
            setProfile(response.profile);
            if (response.profile) {
                setFormData({
                    subject: response.profile.subject || '',
                    hourlyRate: response.profile.hourlyRate || 0,
                    description: response.profile.description || '',
                    status: response.profile.status || 'Available',
                });
                // Convert availability days to capitalize first letter
                const formattedAvailability = {};
                Object.entries(response.profile.availability || {}).forEach(([key, value]) => {
                    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
                    formattedAvailability[formattedKey] = value;
                });
                setAvailability(formattedAvailability);
            }
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch tutoring profile');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleToggleTimeSlot = (day, timeSlot) => {
        setAvailability(prev => ({
            ...prev,
            [day]: prev[day].includes(timeSlot)
                ? prev[day].filter(slot => slot !== timeSlot)
                : [...prev[day], timeSlot]
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            // Convert availability days back to lowercase for API
            const formattedAvailability = {};
            Object.entries(availability).forEach(([key, value]) => {
                formattedAvailability[key.toLowerCase()] = value;
            });
            
            const updatedData = {
                ...formData,
                availability: formattedAvailability
            };
            
            const response = await TutorService.updateTutoringProfile(updatedData);
            setProfile(response.profile);
            setIsEditing(false);
            toast.success('Tutoring profile updated successfully');
        } catch (error) {
            toast.error('Failed to update tutoring profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Tutoring Profile</h1>
                        <div>
                            {isEditing ? (
                                <div className="space-x-4">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Profile Information */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hourly Rate (£)</label>
                                <input
                                    type="number"
                                    name="hourlyRate"
                                    value={formData.hourlyRate}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-500"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column - Availability Schedule */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Availability Schedule</h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-6">
                                    {Object.keys(availability).map((day) => (
                                        <div key={day}>
                                            <h3 className="text-sm font-medium text-gray-900 mb-2">{day}</h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {timeSlots.map((slot) => (
                                                    <button
                                                        key={slot}
                                                        onClick={() => isEditing && handleToggleTimeSlot(day, slot)}
                                                        disabled={!isEditing}
                                                        className={`px-3 py-2 text-sm rounded-md border ${
                                                            availability[day].includes(slot)
                                                                ? 'bg-red-50 border-red-500 text-red-700'
                                                                : 'border-gray-300 hover:border-gray-400'
                                                        } ${!isEditing && 'cursor-default'}`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutoringProfile; 