import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EssayCard from '../../components/essays/EssayCard';
import StudentService from '../../services/studentService';
import { helpers } from '../../utils/helpers';
import Loading from '../../components/common/LoadingSpinner';

const EssayList = () => {
    const [essays, setEssays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [searchQuery, setSearchQuery] = useState('');
    const [isEssayModalOpen, setIsEssayModalOpen] = useState(false);
    const [selectedEssayFile, setSelectedEssayFile] = useState(null);

    const filterOptions = [
        { value: 'all', label: 'All Essays' },
        { value: 'Pending', label: 'Pending Review' },
        { value: 'In Progress', label: 'Under Review' },
        { value: 'Completed', label: 'Reviewed' },
    ];

    const sortOptions = [
        { value: 'date', label: 'Latest First' },
        { value: 'title', label: 'Title' },
        { value: 'subject', label: 'Subject' }
    ];



    useEffect(() => {
        const fetchEssays = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await StudentService.getAllEssays();
                setEssays(response.essays);
            } catch (err) {
                setError(err.message || 'Failed to load essays.');
            } finally {
                setLoading(false);
            }
        };

        fetchEssays();
    }, []);


    const handleViewPdf = (fileUrl) => {
        setSelectedEssayFile(fileUrl);
        setIsEssayModalOpen(true)
    };

    const closeEssayModal = () => {
        setIsEssayModalOpen(false);
        setSelectedEssayFile(null);
    };


    const filteredEssays = essays
        .filter(essay => {
            const matchesStatus = statusFilter === 'all' || essay.status === statusFilter;
            const matchesSearch = searchQuery === '' ||
                essay.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                essay.subject?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title?.localeCompare(b.title);
                case 'subject':
                    return a.subject?.localeCompare(b.subject);
                case 'date':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
    }
    return (
        <div className="space-y-6">
            {/* Header with Action */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Essays</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage and track your essay submissions
                        </p>
                    </div>
                    <Link
                        to="/student/essay-upload"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <svg
                            className="-ml-1 mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Upload New Essay
                    </Link>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Status Filter */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        >
                            {filterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort By */}
                    <div>
                        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                            Sort By
                        </label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            type="text"
                            id="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title or subject..."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                    </div>
                </div>
            </div>

            {/* Essays List */}
            <div className="space-y-4">
                {filteredEssays.length > 0 ? (
                    filteredEssays.map((essay) => (
                        <EssayCard
                            key={essay._id}
                            essay={essay}
                            onViewPdf={() => handleViewPdf(essay.fileUrl)}
                        />
                    ))
                ) : (
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
                                : statusFilter !== 'all'
                                    ? `No essays with status "${helpers.capitalizeWords(statusFilter)}"`
                                    : 'Get started by uploading your first essay'}
                        </p>
                        {!searchQuery && statusFilter === 'all' && (
                            <div className="mt-6">
                                <Link
                                    to="/student/essay-upload"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                                >
                                    Upload New Essay
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Summary Stats */}
            {filteredEssays.length > 0 && (
                <div className="text-sm text-gray-500 text-right">
                    Showing {filteredEssays.length} {filteredEssays.length === 1 ? 'essay' : 'essays'}
                </div>
            )}
            {/* PDF Modal */}
            {isEssayModalOpen && selectedEssayFile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Essay PDF</h2>
                            <button onClick={closeEssayModal} className="text-gray-500 hover:text-gray-700">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Render the PDF viewer or link here */}
                        <iframe src={selectedEssayFile} width="100%" height="600px"></iframe>
                        <p className="text-gray-600 mt-4">If the PDF does not display, <a href={selectedEssayFile} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">click here to open it in a new tab</a>.</p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default EssayList;