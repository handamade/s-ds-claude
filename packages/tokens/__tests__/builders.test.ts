import { describe, expect, it } from "vitest";
import { token, set, delta, cap, slot, ref } from "../src/dsl/builders.js";

describe("token builder", () => {
  it("creates a token from a slot with set()", () => {
    const t = token({ from: slot.accent, l: set(0.65) });
    expect(t.from).toEqual({ type: "slot", name: "accent" });
    expect(t.l).toEqual({ op: "set", value: 0.65 });
    expect(t.c).toBeUndefined();
    expect(t.h).toBeUndefined();
    expect(t.alpha).toBeUndefined();
  });

  it("creates a token from a ref with alpha", () => {
    const t = token({ from: ref.fgPrimary, alpha: 0.7 });
    expect(t.from).toEqual({ type: "ref", name: "fgPrimary" });
    expect(t.alpha).toBe(0.7);
  });

  it("creates a token with cap()", () => {
    const t = token({ from: slot.accent, l: set(0.65), c: cap(0.23) });
    expect(t.c).toEqual({ op: "cap", value: 0.23 });
  });

  it("creates a token with delta()", () => {
    const t = token({ from: slot.canvas, l: delta(-0.017) });
    expect(t.l).toEqual({ op: "delta", value: -0.017 });
  });
});
