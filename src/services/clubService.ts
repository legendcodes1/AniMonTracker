import { apiRequest, ApiError, getAccessToken } from "@/lib/apiClient";
import { env } from "@/lib/env";

export interface Club {
  id: string;
  name: string;
  description: string;
  group_avatar_url: string;
  memberCount: number;
  creator_id?: string;
  [key: string]: unknown;
}

export interface CreateClubRequest {
  name: string;
  description: string;
  group_avatar_url: string;
  userId: string;
  createdBy: string;
}

export interface MembershipStatus {
  isMember: boolean;
}

const requireBaseUrl = (): void => {
  if (!env.apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL is not configured");
  }
};

const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const readErrorText = async (response: Response): Promise<string> => {
  try {
    return await response.text();
  } catch {
    return "";
  }
};

export async function fetchClubs(): Promise<Club[]> {
  requireBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${env.apiBaseUrl}/api/clubs`, {
      headers: await authHeader(),
    });
  } catch (error) {
    throw new ApiError(
      error instanceof Error ? error.message : "Network request failed",
      0,
      "Network Error",
      "",
    );
  }

  if (!response.ok) {
    const errorBody = await readErrorText(response);
    throw new Error(
      `Failed to fetch clubs (${response.status} ${response.statusText}): ${errorBody.slice(0, 200)}`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("json")) {
    const responseBody = await readErrorText(response);
    throw new Error(
      `Clubs endpoint returned ${contentType || "an unknown content type"}: ${responseBody.slice(0, 200)}`,
    );
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Clubs endpoint returned an unexpected response");
  }

  return data as Club[];
}

export async function fetchClubById(clubId: string): Promise<Club | null> {
  const data = await apiRequest<Club | Club[]>(`/clubs/${clubId}`);

  if (Array.isArray(data)) {
    return data[0] ?? null;
  }

  return data ?? null;
}

export async function fetchUserClubs(userId: string): Promise<Club[]> {
  const data = await apiRequest<unknown>(`/clubs/${userId}`);
  return Array.isArray(data) ? (data as Club[]) : [];
}

export async function checkMembership(
  clubId: string,
  userId: string,
): Promise<MembershipStatus> {
  const data = await apiRequest<MembershipStatus>(
    `/clubs/${clubId}/members/${userId}`,
  );
  return { isMember: data.isMember || false };
}

export async function joinClub(clubId: string, userId: string): Promise<void> {
  try {
    await apiRequest<unknown>(`/clubs/${clubId}/members/${userId}`, {
      method: "POST",
    });
  } catch (error) {
    const detail =
      error instanceof ApiError ? `: ${error.body || error.statusText}` : "";
    throw new Error(`Failed to join group${detail}`);
  }
}

export async function leaveClub(clubId: string, userId: string): Promise<void> {
  await apiRequest<void>(`/clubs/${clubId}/members/${userId}`, {
    method: "DELETE",
  });
}

export async function createClub(payload: CreateClubRequest): Promise<Club> {
  try {
    return await apiRequest<Club>("/clubs", { method: "POST", body: payload });
  } catch (error) {
    const detail =
      error instanceof ApiError ? `: ${error.body || error.statusText}` : "";
    throw new Error(`Failed to create group${detail}`);
  }
}
