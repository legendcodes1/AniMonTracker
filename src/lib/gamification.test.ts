import { describe, expect, it } from "vitest";
import { getLevelProgress, levelForXp, xpForLevel } from "./gamification";

describe("gamification level curve", () => {
  it.each([
    [1, 0],
    [2, 50],
    [3, 200],
    [4, 450],
    [5, 800],
  ])("level %i starts at %i XP", (level, xp) => {
    expect(xpForLevel(level)).toBe(xp);
    expect(levelForXp(xp)).toBe(level);
  });

  it("does not level up before the next threshold", () => {
    expect(levelForXp(49)).toBe(1);
    expect(levelForXp(199)).toBe(2);
    expect(levelForXp(449)).toBe(3);
  });

  it("calculates progress within the current level", () => {
    expect(getLevelProgress({ level: 2, xp: 125 })).toEqual({
      earned: 75,
      needed: 150,
      percent: 50,
      nextLevelXp: 200,
    });
  });

  it("clamps malformed values safely", () => {
    expect(xpForLevel(-2)).toBe(0);
    expect(levelForXp(-100)).toBe(1);
    expect(getLevelProgress({ level: 2, xp: 500 }).percent).toBe(100);
  });
});
