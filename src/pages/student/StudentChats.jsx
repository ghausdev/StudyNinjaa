import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import StudentService from '../../services/studentService';
import { io } from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';


const StudentChats = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:9001', {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
      if (user?._id) {
        newSocket.emit('join', user._id);
      }
    });

    setSocket(newSocket);
    loadChats();

    return () => newSocket.disconnect();
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        setMessages(prev => [...prev, {
          id: message._id,
          sender: message.sender === user._id ? 'student' : 'tutor',
          content: message.content,
          timestamp: new Date(message.timestamp)
        }]);
      });
    }
  }, [socket, user]);

  const loadChats = async () => {
    try {
      const response = await StudentService.getAllChatContacts();
      setChats(response.tutors);
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  };

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    try {
      const response = await StudentService.getMessages(chat._id);
      setMessages(response.messages.map(msg => ({
        id: msg._id,
        sender: msg.sender === user._id ? 'student' : 'tutor',
        content: msg.content,
        timestamp: new Date(msg.timestamp)
      })));
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat || !socket) return;

    socket.emit('sendMessage', {
      sender: user.id,
      recipient: selectedChat._id,
      content: newMessage
    });

    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Essay Chats</h1>
          <p className="mt-1 text-sm text-gray-500">
            Communicate with your tutors about your essays
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-200px)]">
          <div className="grid grid-cols-12 h-full">
            {/* Chat List */}
            <div className="col-span-4 border-r border-gray-200">
              <div className="p-4 border-b">
                <input
                  type="text"
                  placeholder="Search chats..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="overflow-y-auto h-[calc(100%-73px)]">
                {chats.map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => handleChatSelect(chat)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedChat?._id === chat._id ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <img
                          src={chat.profilePicture || `https://ui-avatars.com/api/?name=${chat.name}`}
                          alt={chat.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{chat.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="col-span-8 flex flex-col h-full">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedChat.profilePicture || `https://ui-avatars.com/api/?name=${selectedChat.name}`}
                        alt={selectedChat.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h2 className="font-medium text-gray-900">{selectedChat.name}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg p-3 ${
                            msg.sender === 'student'
                              ? 'bg-red-100 text-red-900'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {msg.timestamp?.toLocaleTimeString() || ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentChats; 