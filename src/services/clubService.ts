import { apiClient } from "../lib/apiClient";
import { Club, ClubMember, DiscussionPost } from "../types/club";

export const getClubs = async (): Promise<Club[]> => {
  try {
    const data = await apiClient<Club[]>("/clubs");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("Failed to fetch clubs:", error);
    return [];
  }
};

export const getClubById = async (clubId: string): Promise<Club> => {
  const data = await apiClient<Club | Club[]>(`/clubs/${clubId}`);
  return Array.isArray(data) ? data[0] : data;
};

export const checkClubMembership = async (clubId: string, userId: string): Promise<boolean> => {
  try {
    const data = await apiClient<{ isMember: boolean }>(`/clubs/${clubId}/members/${userId}`);
    return !!data?.isMember;
  } catch {
    return false;
  }
};

export const joinClub = async (clubId: string, userId: string): Promise<any> => {
  return await apiClient(`/clubs/${clubId}/join`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
};

export const leaveClub = async (clubId: string, userId: string): Promise<any> => {
  return await apiClient(`/clubs/${clubId}/leave`, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
  });
};

export const createClub = async (clubData: Partial<Club>): Promise<Club> => {
  return await apiClient<Club>("/clubs", {
    method: "POST",
    body: JSON.stringify(clubData),
  });
};

export const getClubDiscussions = async (clubId: string): Promise<DiscussionPost[]> => {
  try {
    const data = await apiClient<DiscussionPost[]>(`/clubs/${clubId}/discussions`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const createClubDiscussion = async (
  clubId: string,
  content: string
): Promise<DiscussionPost> => {
  return await apiClient<DiscussionPost>(`/clubs/${clubId}/discussions`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};
