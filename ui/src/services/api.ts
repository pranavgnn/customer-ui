import { Customer } from "../types";

const API_BASE_URL = "/api";

export const CustomerApi = {
  getAll: async (): Promise<Customer[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customer`);
      if (!response.ok) throw new Error("Failed to fetch customers");
      return response.json();
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Customer> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customer/${id}`);
      if (!response.ok) throw new Error("Failed to fetch customer");
      return response.json();
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  },

  create: async (customer: Omit<Customer, "id">): Promise<Customer> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error("Failed to create customer");
      return response.json();
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  },

  update: async (
    id: number,
    customer: Omit<Customer, "id">
  ): Promise<Customer> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error("Failed to update customer");
      return response.json();
    } catch (error) {
      console.error(`Error updating customer ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete customer");
    } catch (error) {
      console.error(`Error deleting customer ${id}:`, error);
      throw error;
    }
  },
};
