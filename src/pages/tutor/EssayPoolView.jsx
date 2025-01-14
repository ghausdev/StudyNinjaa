import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EssayPoolView = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data structure for essays
  const mockEssays = [
    {
      id: 1,
      title: "Analysis of Shakespeare's Macbeth",
      subject: "English Literature",
      level: "A-Level", // Corrected capitalization
      wordCount: 2500,
      postedDate: "2024-01-08",
      payment: 75.00,
      status: "pending",
      studentId: "st123"
    },
    {
        id: 2,
        title: "The Impact of the Industrial Revolution",
        subject: "History",
        level: "GCSE",
        wordCount: 2000,
        postedDate: "2024-01-10",
        payment: 60.00,
        status: "pending",
        studentId: "st456"
    },
    {
        id: 3,
        title: "Introduction to Calculus",
        subject: "Mathematics",
        level: "A-Level",
        wordCount: 1800,
        postedDate: "2024-01-12",
        payment: 80.00,
        status: "pending",
        studentId: "st789"
    },
    {
      id: 4,
      title: 'Advanced Thermodynamics',
      subject: 'Physics',
      level: 'Bachelors',
      wordCount: 3000,
      postedDate: '2024-01-15',
      payment: 120.00,
      status: 'pending',
      studentId: 'st012'
    },
    {
        id: 5,
        title: "Ethical Leadership in Business",
        subject: "Business",
        level: "Masters",
        wordCount: 3500,
        postedDate: "2024-01-18",
        payment: 150.00,
        status: "pending",
        studentId: "st345"
    },
    {
      id: 6,
      title: 'Quantum Mechanics Research',
      subject: 'Research Topics',
      level: 'PhD',
      wordCount: 4000,
      postedDate: '2024-01-20',
      payment: 200.00,
      status: 'pending',
      studentId: 'st678'
    }
  ];

    const educationLevels = [
        { value: 'all', label: 'All Levels' }, // Added "all" option
        { value: 'GCSE', label: 'GCSE' },
        { value: 'A-Level', label: 'A-Level' },
        { value: 'Bachelors', label: 'Bachelor\'s Degree' },
        { value: 'Masters', label: 'Master\'s Degree' },
        { value: 'PhD', label: 'PhD' }
    ];

  const subjects = {
     'GCSE': ['English Literature', 'Mathematics', 'History', 'Sciences'],
    'A-Level': ['English Literature', 'Mathematics', 'History', 'Physics', 'Chemistry'],
    'Bachelors': ['English', 'Computer Science', 'Engineering', 'Business', 'Physics'],
    'Masters': ['Advanced Engineering', 'Business Administration', 'Literature'],
      'PhD': ['Research Topics', 'Thesis Review']
  };

  const handleAcceptEssay = (essayId) => {
    // Implementation for accepting essay
    console.log('Accepting essay:', essayId);
  };

    const filteredEssays = mockEssays.filter(essay => {
      const matchesLevel = selectedLevel === 'all' || essay.level === selectedLevel;
        const matchesSubject = selectedSubject === 'all' ||
            (subjects[selectedLevel] && subjects[selectedLevel].includes(essay.subject));
      const matchesSearch = essay.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLevel && matchesSubject && matchesSearch;
});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Essay Pool</h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse and accept essays for review
            </p>
          </div>
          <div className="flex space-x-4">
          <select
                value={selectedLevel}
                onChange={(e) => {
                    setSelectedLevel(e.target.value)
                    setSelectedSubject('all'); // Reset subject
                }}
                className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
                {educationLevels.map(level => (
                    <option key={level.value} value={level.value}>
                        {level.label}
                    </option>
                ))}
            </select>
            <select
              value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="all">All Subjects</option>
              {selectedLevel !== 'all' && subjects[selectedLevel]?.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Essay Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEssays.map((essay) => (
          <div
            key={essay.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-red-500 transition-colors"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                  {essay.title}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {essay.level}
                </span>
              </div>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-500">
                  Subject: {essay.subject}
                </p>
                <p className="text-sm text-gray-500">
                  Word Count: {essay.wordCount}
                </p>
                <p className="text-sm text-gray-500">
                  Posted: {new Date(essay.postedDate).toLocaleDateString()}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Payment: £{essay.payment.toFixed(2)}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleAcceptEssay(essay.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Accept Essay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEssays.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No essays found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery
              ? 'No essays match your search criteria'
              : 'There are currently no essays available for review'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EssayPoolView;