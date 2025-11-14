import { useState, useEffect, useCallback } from "react";
import HomeService from "../services/HomeService";
import toast from "react-hot-toast";

export function useHome() {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const [bannerRes, catRes, serviceRes] = await Promise.all([
        HomeService.getBanners(),
        HomeService.getCategories(),
        HomeService.getServices(),
      ]);
      setBanners(bannerRes.data);
      setCategories(catRes.data);
      setServices(serviceRes.data);
    } catch {
      toast.error("Failed to load home data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  return { banners, categories, services, loading, reload: loadHomeData };
}
