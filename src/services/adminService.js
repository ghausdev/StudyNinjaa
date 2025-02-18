import api from "./server";

class AdminService {
  async getUnapprovedTutors() {
    const response = await api.get("/admin/getUnapprovedTutors");
    return response.data;
  }

  async approveTutor(tutorId, approvalData) {
    const response = await api.post("/admin/approveTutor", {
      tutorId,
      ...approvalData,
    });
    return response.data;
  }

  getStudyLevelOptions() {
    return ["GCSE", "A-Level", "Bachelor", "Masters", "PhD"];
  }
}

export default new AdminService();
