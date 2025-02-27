import React, { useState, useEffect } from "react";
import StudentService from "../../services/studentService";
import { toast } from "react-toastify";
import Loading from "../../components/common/LoadingSpinner";

const TutorList = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    purpose: "",
    selectedDay: "",
    selectedTime: "",
  });

  // Filters
  const [studyLevelFilter, setStudyLevelFilter] = useState("all");
  const [sortBy, setSortBy] = useState("experience");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const response = await StudentService.getAllTutors();
      console.log(response);
      setTutors(response.tutors);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSession = async () => {
    try {
      const date = getNextDayDate(bookingData.selectedDay);
      const [startTimeStr, endTimeStr] = bookingData.selectedTime.split("-");

      // Create Date objects for the selected day and time
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const [startHour, startMinute] = startTimeStr.split(":").map(Number);
      const [endHour, endMinute] = endTimeStr.split(":").map(Number);

      // Create UTC dates
      const startTime = new Date(
        Date.UTC(year, month - 1, day, startHour, startMinute)
      );
      const endTime = new Date(
        Date.UTC(year, month - 1, day, endHour, endMinute)
      );

      const sessionData = {
        tutorId: selectedTutor._id,
        purpose: bookingData.purpose,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };

      const response = await StudentService.bookTutoringSession(sessionData);

      // Set payment type before redirecting to Stripe
      localStorage.setItem("paymentType", "tutoring");

      if (response?.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        toast.error("Failed to get payment link. Please try again.");
      }

      setIsBookingModalOpen(false);
      setSelectedTutor(null);
      setBookingData({ purpose: "", selectedDay: "", selectedTime: "" });
    } catch (err) {
      toast.error(err.message || "Failed to book session");
    }
  };

  const filteredTutors = tutors
    .filter((tutor) => {
      const matchesLevel =
        studyLevelFilter === "all" || tutor.studyLevel === studyLevelFilter;
      const matchesSearch =
        searchQuery === "" ||
        tutor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLevel && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "experience") {
        return b.experience - a.experience;
      }
      return b.hourlyRate - a.hourlyRate;
    });

  // Add this helper function to get the next occurrence of a weekday
  const getNextDayDate = (dayName) => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date();
    const targetDay = days.indexOf(dayName.toLowerCase());
    const todayDay = today.getDay();

    let daysUntilTarget = targetDay - todayDay;
    // If the target day has passed this week, go to next week
    if (daysUntilTarget < 0) {
      daysUntilTarget += 7;
    }
    // If it's the same day (daysUntilTarget === 0), keep today's date

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    return targetDate;
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 p-6">
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Study Level
            </label>
            <select
              value={studyLevelFilter}
              onChange={(e) => setStudyLevelFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="all">All Levels</option>
              <option value="PhD">PhD</option>
              <option value="Masters">Masters</option>
              <option value="Bachelors">Bachelors</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="experience">Experience</option>
              <option value="hourlyRate">Hourly Rate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutors..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="flex flex-col space-y-4">
        {filteredTutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left side - Profile Picture */}
              <div className="w-full md:w-1/4 flex-shrink-0">
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={tutor.profilePicture}
                    alt={tutor.fullName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Right side - Information */}
              <div className="flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{tutor.fullName}</h3>
                  <p className="text-md text-gray-500">{tutor.subject}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <p>
                    <span className="font-medium">University:</span>{" "}
                    {tutor.university}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {tutor.experience} years
                  </p>
                  <p>
                    <span className="font-medium">Rate:</span> $
                    {tutor.hourlyRate}/hour
                  </p>
                  <p>
                    <span className="font-medium">Study Level:</span>{" "}
                    {tutor.studyLevel}
                  </p>
                </div>
                <p className="text-gray-600 mb-4">{tutor.description}</p>
                <div className="flex justify-end mt-auto">
                  <button
                    onClick={() => {
                      setSelectedTutor(tutor);
                      setIsBookingModalOpen(true);
                    }}
                    className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              Book Session with {selectedTutor.fullName}
            </h2>
            <div className="space-y-4">
              {/* Day Selection - Single Row */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Day
                </label>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {Object.keys(selectedTutor.availability).map((day) => (
                    <button
                      key={day}
                      onClick={() =>
                        setBookingData({
                          ...bookingData,
                          selectedDay: day,
                          selectedTime: "",
                        })
                      }
                      className={`flex-shrink-0 p-2 rounded-md border ${
                        bookingData.selectedDay === day
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-300 hover:border-red-500"
                      }`}
                    >
                      <div className="text-center">
                        <div>{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                        <div className="text-xs text-gray-500">
                          {getNextDayDate(day).toLocaleDateString()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection - Only show if day is selected */}
              {bookingData.selectedDay && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedTutor.availability[bookingData.selectedDay].map(
                      (timeSlot) => (
                        <button
                          key={timeSlot}
                          onClick={() =>
                            setBookingData({
                              ...bookingData,
                              selectedTime: timeSlot,
                            })
                          }
                          className={`p-2 rounded-md border ${
                            bookingData.selectedTime === timeSlot
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-gray-300 hover:border-red-500"
                          }`}
                        >
                          {timeSlot}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Purpose Input - Only show if time is selected */}
              {bookingData.selectedTime && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Purpose
                  </label>
                  <textarea
                    value={bookingData.purpose}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        purpose: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    rows="3"
                    placeholder="Describe the purpose of your session..."
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookSession}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !bookingData.selectedDay ||
                    !bookingData.selectedTime ||
                    !bookingData.purpose
                  }
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorList;
