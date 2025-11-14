import { useEffect, useState } from "react";
import ServiceService from "../services/ServiceService";

export default function useService() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchServices = async () => {
    const res = await ServiceService.getAll();
    setServices(res.data);
  };

  const fetchCategories = async () => {
    const res = await ServiceService.getCategories();
    setCategories(res.data);
  };

  const createService = (data) => ServiceService.create(data);

  const updateService = (id, data) => ServiceService.update(id, data);

  const deleteService = (id) => ServiceService.remove(id);

  const attachMedia = (payload) => ServiceService.attachMedia(payload);

  useEffect(() => {
    (async () => {
      await fetchServices();
      await fetchCategories();
    })();
  }, []);

  return {
    services,
    categories,
    fetchServices,
    createService,
    updateService,
    deleteService,
    attachMedia,
  };
}
