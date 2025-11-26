import api from "../libs/api";

const AssignmentService = {
  assign: (payload) => api.post("/assign-customers", payload),
};

export default AssignmentService;
