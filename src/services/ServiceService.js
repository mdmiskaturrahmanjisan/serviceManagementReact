import api from "../libs/api";

const ServiceService = {
  getAll: () => api.get("/services"),

  getCategories: () => api.get("/categories"),

  create: (data) => api.post("/services", data),

  update: (id, data) => api.put(`/services/${id}`, data),

  remove: (id) => api.delete(`/services/${id}`),

  attachMedia: (payload) => api.post("/media/attach", payload),
};

export default ServiceService;
