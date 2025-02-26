// EssayFeedback.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EssayCard from "../../components/essays/EssayCard";
import Badge from "../../components/common/Badge";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { formatters } from "../../utils/formatters";
// Mock Data Imports
import { mockUsers } from "../../data/mockUsers";
import { mockEssays } from "../../data/mockEssays";
import { mockInterviews } from "../../data/mockInterviews";
import tutorService from "../../services/tutorService";

const EssayFeedback = () => {
  const [essays, setEssays] = useState([]);
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [feedback, setFeedback] = useState({
    score: 0,
    feedback: "",
    modelAnswerFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  // Mock tutor data
  const tutor = mockUsers.tutors[0];

  // Fetch essays on component mount
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const response = await tutorService.getAllEssays();
        setEssays(response.essays);
      } catch (error) {
        console.error("Failed to fetch essays:", error);
      }
    };
    fetchEssays();
  }, []);

  const handleStartReview = (essay) => {
    setSelectedEssay(essay);
    if (essay.status !== "Completed") {
      setFeedback({
        score: 0,
        feedback: "",
        modelAnswerFile: null,
      });
    }
  };

  const handleSubmitFeedback = async () => {
    setLoading(true);
    try {
      const data = {
        essayID: selectedEssay._id,
        score: feedback.score,
        feedback: feedback.feedback,
        modelAnswerFile: feedback.modelAnswerFile,
      };

      const response = await tutorService.markEssay(data);

      if (response?.paymentUrl) {
        // Redirect to Stripe payment page
        window.location.href = response.paymentUrl;
      } else {
        setErrors({
          submit: "Failed to get payment link. Please try again.",
        });
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setErrors({
        submit:
          error?.message || "Failed to submit feedback. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter essays based on search and status
  const filteredEssays =
    essays?.filter(
      (essay) =>
        (statusFilter === "all" || essay.status === statusFilter) &&
        (searchQuery === "" ||
          essay.title.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Essay Reviews
            </h1>
            <p className="mt-2 text-gray-600">
              Review and provide feedback on assigned essays
            </p>
          </div>
          {/* Status Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border-gray-200 bg-white shadow-sm focus:border-red-500 focus:ring-red-500 transition-all"
            >
              <option value="all">All Essays</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border-gray-200 bg-white shadow-sm focus:border-red-500 focus:ring-red-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Essays List */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <LoadingSpinner />
          ) : filteredEssays.length === 0 ? (
            <div className="text-center py-12 backdrop-blur-lg bg-white/30 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-gray-500">No essays found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEssays.map((essay) => (
                <div
                  key={essay._id}
                  className={`backdrop-blur-lg bg-white/30 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-102 hover:-translate-y-1
                    ${
                      selectedEssay?._id === essay._id
                        ? "border-2 border-red-500"
                        : "border border-gray-100"
                    }`}
                  onClick={() => handleStartReview(essay)}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {essay.title}
                        </h3>
                        <p className="mt-1 text-gray-600">{essay.subject}</p>
                      </div>
                      <Badge
                        variant={
                          essay.status === "Completed" ? "success" : "info"
                        }
                      >
                        {essay.status}
                      </Badge>
                    </div>
                    <div className="mt-auto space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Word Count:</span>{" "}
                        {essay.wordCount}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Academic Level:</span>{" "}
                        {essay.academicLevel}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Request Type:</span>{" "}
                        {essay.studentRequest}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Submitted:</span>{" "}
                        {new Date(essay.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Essay Details and Feedback Form */}
        {selectedEssay && (
          <div className="lg:col-span-4 space-y-6">
            {/* Essay Details */}
            <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedEssay.title}
              </h2>
              <div className="space-y-6">
                {/* Essay File */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    Essay File
                  </h3>
                  <a
                    href={selectedEssay.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    View Essay PDF
                  </a>
                </div>

                {/* Marking Scheme if available */}
                {selectedEssay.markingScheme && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      Marking Scheme
                    </h3>
                    <a
                      href={selectedEssay.markingScheme}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      View Marking Scheme
                    </a>
                  </div>
                )}

                {/* Show Model Answer for completed essays if available */}
                {selectedEssay.status === "Completed" &&
                  selectedEssay.modelURL && (
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-medium text-gray-700">
                        Model Answer
                      </h3>
                      <a
                        href={selectedEssay.modelURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        View Model Answer
                      </a>
                    </div>
                  )}
              </div>
            </div>

            {/* Feedback Section with updated styling */}
            <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
              {selectedEssay.status === "Completed" ? (
                // View-only feedback for completed essays
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Score</h3>
                  <p className="mt-1">{selectedEssay.score}</p>
                </div>
              ) : (
                // Editable feedback form for in-progress essays
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Score
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={feedback.score || ""}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? "" : parseInt(e.target.value);
                      setFeedback((prev) => ({ ...prev, score: value }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter score (1-10)"
                  />
                  {feedback.score !== "" &&
                    (feedback.score < 1 || feedback.score > 10) && (
                      <p className="mt-1 text-sm text-red-600">
                        Score must be between 1 and 10
                      </p>
                    )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Feedback
                </label>
                <textarea
                  value={feedback.feedback}
                  onChange={(e) =>
                    setFeedback((prev) => ({
                      ...prev,
                      feedback: e.target.value,
                    }))
                  }
                  rows={6}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {selectedEssay.studentRequest === "Feedback and Model Answer" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Model Answer File
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setFeedback((prev) => ({
                        ...prev,
                        modelAnswerFile: e.target.files[0],
                      }))
                    }
                    className="mt-1 block w-full"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedEssay(null)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitFeedback}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayFeedback;
