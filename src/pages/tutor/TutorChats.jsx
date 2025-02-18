import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TutorService from "../../services/tutorService";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";

const TutorChats = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const chatListRef = useRef(null);
  const messagesAreaRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:9001/", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    setSocket(newSocket);
    loadChats();

    // Move socket event handlers here
    if (user?._id) {
      newSocket.emit("join", user._id);
    }

    newSocket.on("receiveMessage", (message) => {
      console.log("Received message:", message);
      if (
        selectedChat?.id === message.sender ||
        selectedChat?.id === message.recipient
      ) {
        setMessages((prev) => [
          ...prev,
          {
            id: message._id,
            sender: message.senderModel.toLowerCase(),
            content: message.content,
            timestamp: new Date(message.timestamp),
          },
        ]);
      }
    });

    return () => {
      newSocket.off("receiveMessage");
      newSocket.disconnect();
    };
  }, [user, selectedChat]); // Add selectedChat as dependency

  useEffect(() => {
    scrollToBottom();
  }, [messagesEndRef]); //Corrected dependency

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChats = async () => {
    try {
      const response = await TutorService.getAllChatContacts();
      console.log("chats", response);
      setChats(
        response.students.map((student) => ({
          id: student._id,
          studentName: student.name,

          profilePic:
            student.profilePicture ||
            `https://ui-avatars.com/api/?name=${student.name}`,
          timestamp: new Date(),
          lastMessage: "",
          unread: 0,
        }))
      );
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  };

  const loadMessages = async (studentId) => {
    try {
      const response = await TutorService.getMessages(studentId);
      setMessages(
        response.messages.map((msg) => ({
          id: msg._id,
          sender: msg.sender,
          content: msg.content,
          timestamp: new Date(msg.timestamp),
        }))
      );
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat || !socket) return;

    console.log("Sending message:", {
      sender: user.id,
      recipient: selectedChat.id,
      content: newMessage,
    });

    socket.emit("sendMessage", {
      sender: user.id,
      recipient: selectedChat.id,
      content: newMessage,
    });

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "tutor",
        content: newMessage,
        timestamp: new Date(),
      },
    ]);

    setNewMessage("");
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    loadMessages(chat.id);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
          <div className="grid grid-cols-12 flex-1 overflow-hidden">
            <div className="col-span-4 border-r border-gray-200 flex flex-col overflow-hidden">
              <div className="p-4 border-b">
                <input
                  type="text"
                  placeholder="Search chats..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="flex-1 overflow-y-auto" ref={chatListRef}>
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedChat?.id === chat.id ? "bg-red-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <img
                          src={chat.profilePic || "/placeholder.svg"}
                          alt={chat.studentName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {chat.studentName}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {chat.essayTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">
                          {chat.timestamp?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          }) || ""}
                        </span>
                        {chat.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-8 flex flex-col overflow-hidden">
              {selectedChat ? (
                <>
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedChat.profilePic || "/placeholder.svg"}
                        alt={selectedChat.studentName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h2 className="font-medium text-gray-900">
                          {selectedChat.studentName}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {selectedChat.essayTitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                    ref={messagesAreaRef}
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === "tutor"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg p-3 ${
                            msg.sender === "tutor"
                              ? "bg-red-100 text-red-900"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {msg.timestamp?.toLocaleTimeString() || ""}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
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

export default TutorChats;
