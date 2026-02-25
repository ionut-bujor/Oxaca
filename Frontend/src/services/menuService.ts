
import type { MenuItem } from "../types";
import { MOCK_MENU_ITEMS } from "../mockData";
import { apiClient } from "../api/apiClient";
import  { mapMenuItemDtoToDomain } from "./menuMapper";
import type {BackendMenuItem } from "./menuMapper";


/**
 * Domain Service Layer: Handles business logic and data retrieval.
 */
export const menuService = {
  async fetchMenuItems(): Promise<MenuItem[]> {
    try {
      // Fetch raw data from backend (SQL-aligned structure)
      const rawData = await apiClient.get<BackendMenuItem[]>('/api/v1/menu', { 
        // Note: In a real app, MOCK_MENU_ITEMS would also be in the BackendMenuItem format
        // for testing, but here we'll assume the API returns the SQL structure.
        mockData: [] 
      });

      // If we have real data, map it. Otherwise, use our domain-ready mocks.
      if (rawData && rawData.length > 0) {
        return rawData.map(mapMenuItemDtoToDomain);
      }

      return MOCK_MENU_ITEMS;
    } catch (error) {
      console.error("Critical error fetching menu items", error);
      return MOCK_MENU_ITEMS; // Fallback to mocks for development
    }
  }
};
