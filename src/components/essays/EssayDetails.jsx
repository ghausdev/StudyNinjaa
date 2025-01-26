import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentService from '../../services/studentService';
import Loading from '../../components/common/LoadingSpinner';
import { helpers } from '../../utils/helpers';

const EssayDetails = () => {
    const { essayId } = useParams();
    const [essay, setEssay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEssay = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await StudentService.getEssayById(essayId);
                setEssay(response.essay);
            } catch (err) {
                setError(err.message || 'Failed to load essay details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEssay();
    }, [essayId]);

    const openLinkInNewTab = (url) => {
        if(url){
            window.open(url, '_blank');
        }
    };

    const downloadFile = (url, fileName) => {
         if (url) {
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
    }

    if (!essay) {
        return <div className="text-gray-500 text-center mt-8">Essay not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 text-gray-800">
            <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2">{essay.title}</h2>

            <div className="mb-4">
                <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">{essay.subject}</span>
                    <span className="mx-2">•</span>
                    <span>{essay.wordCount} words</span>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-700 font-medium">Status: <span className={`font-normal ${essay.status === 'Completed' ? 'text-green-500' : 'text-yellow-600'}`}>{helpers.capitalizeWords(essay.status)}</span></p>
                <p className="text-gray-700 font-medium">Submitted: <span className="font-normal">{helpers.formatDateTime(essay.createdAt)}</span></p>
                {essay.status === 'Completed' && (
                    <p className="text-gray-700 font-medium">Reviewed Date: <span className="font-normal">{helpers.formatDateTime(essay.updatedAt)}</span></p>
                )}
            </div>

            <div className="mb-4">
                <p className="text-gray-700 font-medium">Student Request:</p>
                <p className="text-gray-700">{essay.studentRequest}</p>
            </div>
            {essay.comments && (
                <div className="mb-4">
                    <p className="text-gray-700 font-medium">Comments:</p>
                    <p className="text-gray-700">{essay.comments}</p>
                </div>
            )}
            <div className="mb-4">
                <p className="text-gray-700 font-medium">Academic Level:</p>
                <p className="text-gray-700">{essay.academicLevel}</p>
            </div>
            {essay.status === 'Completed' && (
                <div className="mb-4">
                    {essay.feedback && (
                        <div className="bg-red-50 p-4 rounded-lg">
                            <p className="text-gray-700 font-medium mb-2">Feedback:</p>
                            <div className="text-gray-700 whitespace-pre-line">{essay.feedback}</div>
                            <div className="flex items-center mt-2">
                                <p className="text-gray-700 font-medium mr-2">Score: </p>
                                <p className="text-gray-700 font-medium">{essay.score}/10</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-4 flex flex-col space-y-2">
                {essay.fileUrl && (
                    <div className='flex justify-end space-x-2'>
                        <button
                            onClick={() => openLinkInNewTab(essay.fileUrl)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            View Essay File
                        </button>
                        <button
                            onClick={() => downloadFile(essay.fileUrl, `${essay.title.replace(/ /g, '_') || 'essay'}.pdf`)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Download Essay File
                        </button>
                    </div>
                )}
                {essay.markingScheme && (
                    <div className='flex justify-end space-x-2'>
                        <button
                            onClick={() => openLinkInNewTab(essay.markingScheme)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            View Marking Scheme File
                        </button>
                        <button
                            onClick={() => downloadFile(essay.markingScheme, 'marking_scheme.pdf')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Download Marking Scheme File
                        </button>
                    </div>
                )}
                {essay.modelURL && (
                    <div className='flex justify-end space-x-2'>
                        <button
                            onClick={() => openLinkInNewTab(essay.modelURL)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            View Model File
                        </button>
                        <button
                            onClick={() => downloadFile(essay.modelURL, 'model.pdf')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Download Model File
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EssayDetails;