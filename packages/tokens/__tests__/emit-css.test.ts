import { describe, expect, it } from "vitest";
import { emitBaseCSS, emitThemeCSS } from "../scripts/emit-css.js";
import { defaultPalette, defaultSlots } from "../src/palettes/default.js";
import { lightTheme } from "../src/themes/light.js";

describe("emitBaseCSS", () => {
  it("emits palette vars inside @layer ds.base", () => {
    const css = emitBaseCSS(defaultPalette);
    expect(css).toContain("@layer ds.base");
    expect(css).toContain("--ds-palette-obsidian");
    expect(css).toContain("--ds-palette-sapphire");
    expect(css).toContain("oklch(");
  });
});

describe("emitThemeCSS", () => {
  it("emits semantic tokens inside @layer ds.theme", () => {
    const css = emitThemeCSS("light", lightTheme, defaultPalette, defaultSlots);
    expect(css).toContain("@layer ds.theme");
    expect(css).toContain("--ds-bg-primary");
    expect(css).toContain("--ds-fg-accent");
    expect(css).toContain("--ds-fill-tint-accent");
  });

  it("light theme targets :root and [data-ds-theme='light']", () => {
    const css = emitThemeCSS("light", lightTheme, defaultPalette, defaultSlots);
    expect(css).toContain(":root");
    expect(css).toContain('[data-ds-theme="light"]');
  });

  it("uses live oklch(from var(...) ...) form for slot-sourced tokens", () => {
    const css = emitThemeCSS("light", lightTheme, defaultPalette, defaultSlots);
    expect(css).toMatch(/oklch\(from var\(--ds-palette-/);
  });

  it("uses live var() form for ref-sourced tokens", () => {
    const css = emitThemeCSS("light", lightTheme, defaultPalette, defaultSlots);
    expect(css).toMatch(/oklch\(from var\(--ds-fg-primary\)/);
  });
});
