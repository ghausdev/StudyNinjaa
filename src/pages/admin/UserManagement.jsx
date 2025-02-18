import React, { useState, useEffect } from "react";
import Badge from "../../components/common/Badge";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import adminService from "../../services/adminService";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const UserManagement = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [approvalStates, setApprovalStates] = useState({});
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    tutorId: null,
  });

  useEffect(() => {
    fetchUnapprovedTutors();
  }, []);

  const fetchUnapprovedTutors = async () => {
    setLoading(true);
    try {
      const response = await adminService.getUnapprovedTutors();
      setTutors(response.tutors);
      // Initialize approval states
      const initialStates = {};
      response.tutors.forEach((tutor) => {
        initialStates[tutor._id] = {
          approved_essay: tutor.approved_essay || false,
          approved_tutoring: tutor.approved_tutoring || false,
          StudyLevel: tutor.StudyLevel || "",
        };
      });
      setApprovalStates(initialStates);
    } catch (error) {
      toast.error("Error fetching unapproved tutors: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalSubmit = async (tutorId) => {
    const approvalData = approvalStates[tutorId];
    if (!approvalData.StudyLevel) {
      toast.error("Please select a study level");
      return;
    }

    // Open confirmation modal
    setConfirmationModal({
      isOpen: true,
      tutorId,
    });
  };

  const handleConfirmApproval = async () => {
    setLoading(true);
    try {
      const tutorId = confirmationModal.tutorId;
      const approvalData = approvalStates[tutorId];

      await adminService.approveTutor(tutorId, approvalData);

      // Show success message
      toast.success("Tutor approvals updated successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Close modal and refresh data
      setConfirmationModal({ isOpen: false, tutorId: null });
      await fetchUnapprovedTutors();
    } catch (error) {
      toast.error("Error updating tutor approvals: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalChange = (tutorId, field, value) => {
    setApprovalStates((prev) => ({
      ...prev,
      [tutorId]: {
        ...prev[tutorId],
        [field]: value,
      },
    }));
  };

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.dbsDetails?.fullName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tutor.university?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Tutor Approval Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and approve tutors for essay writing and tutoring services
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or university..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Header Section */}
            <div className="p-6 bg-gray-50 border-b">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                  {tutor.profilePicture ? (
                    <img
                      src={tutor.profilePicture}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-300">
                      <span className="text-gray-600">No img</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {tutor.dbsDetails?.fullName || "Name not provided"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {tutor.university || "University not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Experience</h4>
                  <p>{tutor.yearsOfExperience} years</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Eligibility</h4>
                  <Badge variant={tutor.rightToWork ? "success" : "error"}>
                    {tutor.eligibility}
                  </Badge>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject, idx) => (
                    <div key={idx} className="bg-gray-100 rounded-lg p-2">
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-gray-600">
                        {subject.levels.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">
                  Eligibility & Documents
                </h4>

                {/* Eligibility Status */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={tutor.rightToWork ? "success" : "error"}>
                      Right to Work: {tutor.eligibility}
                    </Badge>
                  </div>

                  {/* Eligibility Documents */}
                  {tutor.eligibility === "BritishIrish" && (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">
                        British/Irish Documents:
                      </p>
                      <div className="space-y-2 pl-4">
                        {tutor.documents.BritishIrish.passportURL ? (
                          <button
                            onClick={() =>
                              window.open(
                                tutor.documents.BritishIrish.passportURL,
                                "_blank"
                              )
                            }
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            View Passport
                          </button>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No passport uploaded
                          </p>
                        )}

                        {tutor.documents.BritishIrish.NINumber && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">NI Number:</span>{" "}
                            {tutor.documents.BritishIrish.NINumber}
                          </p>
                        )}

                        {tutor.documents.BritishIrish
                          .UkBornOrAdoptedCertificateURL ? (
                          <button
                            onClick={() =>
                              window.open(
                                tutor.documents.BritishIrish
                                  .UkBornOrAdoptedCertificateURL,
                                "_blank"
                              )
                            }
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            View Birth/Adoption Certificate
                          </button>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No birth/adoption certificate uploaded
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {tutor.eligibility === "EuEeaSwiss" && (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">
                        EU/EEA/Swiss Documents:
                      </p>
                      <div className="space-y-2 pl-4">
                        {tutor.documents.EuEeaSwiss.passportURL ? (
                          <button
                            onClick={() =>
                              window.open(
                                tutor.documents.EuEeaSwiss.passportURL,
                                "_blank"
                              )
                            }
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            View Passport
                          </button>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No passport uploaded
                          </p>
                        )}

                        {tutor.documents.EuEeaSwiss.shareCode && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Share Code:</span>{" "}
                            {tutor.documents.EuEeaSwiss.shareCode}
                          </p>
                        )}

                        {tutor.documents.EuEeaSwiss.DOB && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Date of Birth:</span>{" "}
                            {tutor.documents.EuEeaSwiss.DOB}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {tutor.eligibility === "NonEuEea" && (
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">
                        Non-EU/EEA Documents:
                      </p>
                      <div className="space-y-1 pl-4">
                        {tutor.documents.NonEuEea
                          .biometricResidencePermitURL ? (
                          <button
                            onClick={() =>
                              window.open(
                                tutor.documents.NonEuEea
                                  .biometricResidencePermitURL,
                                "_blank"
                              )
                            }
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            View Biometric Residence Permit
                          </button>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No biometric residence permit uploaded
                          </p>
                        )}

                        {tutor.documents.NonEuEea.validVisaURL ? (
                          <button
                            onClick={() =>
                              window.open(
                                tutor.documents.NonEuEea.validVisaURL,
                                "_blank"
                              )
                            }
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            View Valid Visa
                          </button>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No valid visa uploaded
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* DBS Status */}
                <div className="space-y-2">
                  <Badge variant={tutor.hasDBS ? "success" : "warning"}>
                    DBS Status: {tutor.hasDBS ? "Verified" : "Pending"}
                  </Badge>

                  {tutor.hasDBS && tutor.dbsDetails && (
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Full Name: {tutor.dbsDetails.fullName}</p>
                      <p>
                        Certificate Number: {tutor.dbsDetails.certificateNumber}
                      </p>
                      {tutor.dbsDetails.certificateFileUrl && (
                        <a
                          href={tutor.dbsDetails.certificateFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View DBS Certificate
                        </a>
                      )}
                    </div>
                  )}

                  {!tutor.hasDBS &&
                    tutor.appliedForDBS &&
                    tutor.dbsApplicationDetails && (
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Applied for DBS:</p>
                        <p>Name: {tutor.dbsApplicationDetails.fullName}</p>
                        <p>Email: {tutor.dbsApplicationDetails.email}</p>
                        <p>Phone: {tutor.dbsApplicationDetails.phone}</p>
                      </div>
                    )}
                </div>

                {/* Academic Information */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">
                    Academic Information
                  </h4>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Study Level: {tutor.StudyLevel || "Not specified"}</p>
                    <p>University: {tutor.university || "Not specified"}</p>
                    <p>Years of Experience: {tutor.yearsOfExperience}</p>

                    {tutor.aLevels && tutor.aLevels.length > 0 && (
                      <div>
                        <p className="font-medium">A-Levels:</p>
                        <ul className="list-disc list-inside">
                          {tutor.aLevels.map((aLevel, idx) => (
                            <li key={idx}>{aLevel}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {tutor.universityDocuments.length > 0 && (
                      <div>
                        <p className="font-medium">University Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {tutor.universityDocuments.map((doc, idx) => (
                            <a
                              key={idx}
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Document {idx + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Approval Section */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h4 className="font-semibold text-gray-700">
                  Approval Settings
                </h4>

                <div className="space-y-3">
                  {/* Checkboxes */}
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={
                          approvalStates[tutor._id]?.approved_essay || false
                        }
                        onChange={(e) =>
                          handleApprovalChange(
                            tutor._id,
                            "approved_essay",
                            e.target.checked
                          )
                        }
                        className="rounded text-red-600 focus:ring-red-500"
                      />
                      <span>Approve for Essays</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={
                          approvalStates[tutor._id]?.approved_tutoring || false
                        }
                        onChange={(e) =>
                          handleApprovalChange(
                            tutor._id,
                            "approved_tutoring",
                            e.target.checked
                          )
                        }
                        className="rounded text-red-600 focus:ring-red-500"
                      />
                      <span>Approve for Tutoring</span>
                    </label>
                  </div>

                  {/* Study Level Dropdown */}
                  <div>
                    <select
                      value={approvalStates[tutor._id]?.StudyLevel || ""}
                      onChange={(e) =>
                        handleApprovalChange(
                          tutor._id,
                          "StudyLevel",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    >
                      <option value="">Select Study Level</option>
                      {adminService.getStudyLevelOptions().map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={() => handleApprovalSubmit(tutor._id)}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Update Approvals
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center p-4">
          <LoadingSpinner />
        </div>
      )}

      {filteredTutors.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500">No unapproved tutors found</p>
        </div>
      )}

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ isOpen: false, tutorId: null })}
        onConfirm={handleConfirmApproval}
        title="Confirm Tutor Approval"
        message="Are you sure you want to update this tutor's approval status? This action will affect their ability to provide tutoring services and write essays."
      />
    </div>
  );
};

export default UserManagement;
