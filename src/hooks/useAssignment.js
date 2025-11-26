import { useState } from "react";
import toast from "react-hot-toast";
import AssignmentService from "../services/AssignmentService";

export const useAssignment = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const assignCustomers = async (deliveryManId, polygon) => {
    setLoading(true);
    try {
      const res = await AssignmentService.assign({
        delivery_man_id: deliveryManId,
        polygon: polygon,
      });

      setCustomers(res.data);
      toast.success("Customers assigned successfully");
      return res.data;
    } catch (error) {
      toast.error("Failed to assign customers");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { customers, loading, assignCustomers };
};
