import { beforeEach, describe, expect, it, vi } from "vitest";

const { apiRequest } = vi.hoisted(() => ({
  apiRequest: vi.fn(),
}));

vi.mock("@/lib/apiClient", () => ({
  apiRequest,
  ApiError: class ApiError extends Error {
    body = "";
    statusText = "";
  },
  getAccessToken: vi.fn(),
}));

import { checkMembership, fetchClubMembers } from "./clubService";

describe("club membership service", () => {
  beforeEach(() => {
    apiRequest.mockReset();
  });

  it("uses backend-provided membership eligibility", async () => {
    apiRequest.mockResolvedValue({
      isMember: false,
      canJoin: false,
      reason: "This club is full",
    });

    await expect(checkMembership("club-1", "user-1")).resolves.toEqual({
      isMember: false,
      canJoin: false,
      reason: "This club is full",
    });
    expect(apiRequest).toHaveBeenCalledWith("/clubs/club-1/members/user-1");
  });

  it("fails closed when eligibility is missing", async () => {
    apiRequest.mockResolvedValue({ isMember: false });

    await expect(checkMembership("club-1", "user-1")).resolves.toEqual({
      isMember: false,
      canJoin: false,
      reason: undefined,
    });
  });

  it("loads the real club member roster", async () => {
    const members = [
      {
        id: "user-1",
        username: "AnimeFan",
        avatar_url: "avatar.jpg",
        role: "Member",
        joined_at: "2026-10-01T00:00:00.000Z",
      },
    ];
    apiRequest.mockResolvedValue(members);

    await expect(fetchClubMembers("club-1")).resolves.toEqual(members);
    expect(apiRequest).toHaveBeenCalledWith("/clubs/club-1/members");
  });

  it("rejects an invalid member roster response", async () => {
    apiRequest.mockResolvedValue({ members: [] });

    await expect(fetchClubMembers("club-1")).rejects.toThrow(
      "Club members endpoint returned an unexpected response",
    );
  });
});
