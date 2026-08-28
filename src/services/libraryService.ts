import { apiClient } from "../lib/apiClient";
import type { LibraryItem, CreateLibraryItemRequest, UpdateLibraryItemRequest } from "../types/library";

// Get all library items for current user
export const getLibraryItems = async (userId?: string): Promise<LibraryItem[]> => {
  try {
    const data = await apiClient<LibraryItem[]>("/library", {
      params: userId ? { user_id: userId } : undefined,
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("API library fetch failed, returning empty list:", error);
    return [];
  }
};

// Add item to library
export const addToLibrary = async (data: CreateLibraryItemRequest): Promise<LibraryItem> => {
  return await apiClient<LibraryItem>("/library", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Update library item
export const updateLibraryItem = async (
  itemId: string,
  newItem: UpdateLibraryItemRequest
): Promise<LibraryItem> => {
  return await apiClient<LibraryItem>(`/library/${itemId}`, {
    method: "PUT",
    body: JSON.stringify(newItem),
  });
};

// Delete library item
export const deleteLibraryItem = async (itemId: string): Promise<void> => {
  await apiClient(`/library/${itemId}`, {
    method: "DELETE",
  });
};