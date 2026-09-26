import { apiRequest } from "@/lib/apiClient";
import type {
  AddSearchResultToLibraryRequest,
  CreateLibraryItemRequest,
  LibraryItem,
  UpdateLibraryItemRequest,
} from "@/types/library";

export const addToLibrary = async (data: CreateLibraryItemRequest): Promise<LibraryItem> => {
  try {
    return await apiRequest<LibraryItem>("/library", { method: "POST", body: data });
  } catch (error) {
    console.error("Error adding to library:", error);
    throw error;
  }
};

export const addSearchResultToLibrary = async (
  data: AddSearchResultToLibraryRequest,
): Promise<LibraryItem> => {
  try {
    return await apiRequest<LibraryItem>("/library", { method: "POST", body: data });
  } catch (error) {
    console.error("Error adding to library:", error);
    throw error;
  }
};

export const updateLibraryItem = async (
  itemId: string,
  data: UpdateLibraryItemRequest,
): Promise<LibraryItem> => {
  try {
    return await apiRequest<LibraryItem>(`/library/${itemId}`, { method: "PUT", body: data });
  } catch (error) {
    console.error("Error updating library item:", error);
    throw error;
  }
};

export const deleteLibraryItem = async (itemId: string): Promise<void> => {
  try {
    await apiRequest<void>(`/library/${itemId}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting library item:", error);
    throw error;
  }
};
