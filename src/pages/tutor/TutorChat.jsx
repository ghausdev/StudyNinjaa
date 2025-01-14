import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EssayChat = () => {
  const { essayId } = useParams();
  const navigate = useNavigate();
  const [essay, setEssay] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(null);
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEssayDetails = async () => {
      try {
        // Mock API call
        const response = await fetch(`/api/essays/${essayId}`);
        const data = await response.json();
        setEssay(data);

        // Set initial 24-hour countdown
        const acceptedTime = new Date(data.acceptedAt);
        const deadline = new Date(acceptedTime.getTime() + 24 * 60 * 60 * 1000);
        setTimeRemaining(deadline - new Date());
      } catch (error) {
        console.error('Failed to fetch essay details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEssayDetails();
  }, [essayId]);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining === null) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          // Time's up - automatically reject
          handleTimeUp();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTimeUp = async () => {
    try {
      // Mock API call to reject the essay
      await fetch(`/api/essays/${essayId}/reject`, { method: 'POST' });
      navigate('/tutor/essay-pool');
    } catch (error) {
      console.error('Failed to reject essay:', error);
    }
  };

  const formatTimeRemaining = (ms) => {
    if (ms <= 0) return '00:00:00';
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Mock API call
      await fetch(`/api/essays/${essayId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content: newMessage }),
      });

      setMessages(prev => [...prev, {
        id: Date.now(),
        content: newMessage,
        sender: 'tutor',
        timestamp: new Date().toISOString()
      }]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {essay?.title}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Discussing essay details with student
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-500">Time Remaining</div>
            <div className={`text-2xl font-bold ${
              timeRemaining < 1000 * 60 * 60 ? 'text-red-600' : 'text-gray-900'
            }`}>
              {formatTimeRemaining(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Essay Details */}
        <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Subject</p>
            <p className="font-medium text-gray-900">{essay?.subject}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Word Count</p>
            <p className="font-medium text-gray-900">{essay?.wordCount} 2000</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Level</p>
            <p className="font-medium text-gray-900">{essay?.qualification}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Request Type</p>
            <p className="font-medium text-gray-900">
              {essay?.requestType === 'feedback_model' ? 'Feedback + Model Answer' : 'Feedback Only'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-6 space-y-4"
        >
          {/* System Welcome Message */}
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-sm">
              <p className="text-sm text-gray-600">
                Chat started. Please discuss and confirm the word count within 24 hours.
              </p>
            </div>
          </div>

          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'tutor' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-sm px-4 py-2 rounded-lg ${
                message.sender === 'tutor' 
                  ? 'bg-red-100 text-red-900' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/tutor/essay-pool')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel Review
            </button>
            <button
              onClick={async () => {
                try {
                  await fetch(`/api/essays/${essayId}/confirm`, { method: 'POST' });
                  navigate(`/tutor/essay-feedback/${essayId}`);
                } catch (error) {
                  console.error('Failed to confirm review:', error);
                }
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Confirm Word Count & Begin Review
            </button>
          </div>
        </div>
      </div>

      {/* Warning Message if less than 1 hour remaining */}
      {timeRemaining < 1000 * 60 * 60 && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Time is running out!
              </h3>
              <p className="mt-1 text-sm text-red-700">
                You have less than 1 hour to reach an agreement on the word count. If no agreement is reached, the essay will be automatically returned to the pool.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssayChat;