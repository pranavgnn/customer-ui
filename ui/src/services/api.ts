import { Customer } from "../types";

const API_BASE_URL = "/api";

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const CustomerApi = {
  // Original method (kept for backward compatibility)
  getAll: async (): Promise<Customer[]> => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }
    const data = await response.json();
    return data.content || [];
  },

  // New paginated method
  getPaginated: async (
    page: number = 0,
    size: number = 10,
    sort: string = "id,asc"
  ): Promise<PaginatedResponse<Customer>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
    });

    const response = await fetch(`${API_BASE_URL}/customers?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    return response.json();
  },

  getById: async (id: number): Promise<Customer> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`);
      if (!response.ok) throw new Error("Failed to fetch customer");
      return response.json();
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  },

  create: async (customer: Omit<Customer, "id">): Promise<Customer> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
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
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete customer");
    } catch (error) {
      console.error(`Error deleting customer ${id}:`, error);
      throw error;
    }
  },
};
