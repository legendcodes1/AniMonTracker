import type { LibraryItem, CreateLibraryItemRequest, UpdateLibraryItemRequest } from '../types/library';

const API_BASE_URL = 'http://localhost:3000/api';

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('supabase_token');
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Get all library items for current user
export const getLibraryItems = async (): Promise<LibraryItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/library`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch library items');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching library items:', error);
    throw error;
  }
};

// Add item to library
export const addToLibrary = async (
  request: CreateLibraryItemRequest
): Promise<LibraryItem> => {
  try {
    const response = await fetch(`${API_BASE_URL}/library`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add to library: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding to library:', error);
    throw error;
  }
};

// Update library item
export const updateLibraryItem = async (itemId: string,request: UpdateLibraryItemRequest): Promise<LibraryItem> => {
  try {
    const response = await fetch(`${API_BASE_URL}/library/${itemId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update library item: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating library item:', error);
    throw error;
  }
};

// Delete library item
export const deleteLibraryItem = async (itemId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/library/${itemId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete library item');
    }

    // DELETE typically returns no content
    if (response.status !== 204) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error deleting library item:', error);
    throw error;
  }
};