export type Weight = "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
export const WEIGHT_VALUES: Record<Weight, number> = {
  regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900,
};
export type ComboRole = "sans" | "serif" | "mono";
export interface TypographyCombo { fontSize: number; lineHeight: number; weight: Weight; role?: ComboRole; }
export const comboName = (c: TypographyCombo) =>
  `${c.role && c.role !== "sans" ? `${c.role}-` : ""}${c.fontSize}-${c.lineHeight}-${c.weight}`;
export const comboFontVar = (c: TypographyCombo) => `--ds-font-${c.role ?? "sans"}`;

/** Explicit combo list (spec principle 2/4): adding a combo is one line, never a rename. */
export const typographyCombos: TypographyCombo[] = [
  { fontSize: 12, lineHeight: 16, weight: "regular" },
  { fontSize: 12, lineHeight: 16, weight: "medium" },
  { fontSize: 14, lineHeight: 20, weight: "regular" },
  { fontSize: 14, lineHeight: 20, weight: "medium" },
  { fontSize: 16, lineHeight: 20, weight: "regular" },
  { fontSize: 16, lineHeight: 24, weight: "regular" },
  { fontSize: 16, lineHeight: 24, weight: "medium" },
  { fontSize: 18, lineHeight: 28, weight: "medium" },
  { fontSize: 20, lineHeight: 28, weight: "semibold" },
  { fontSize: 24, lineHeight: 32, weight: "medium" },
  { fontSize: 30, lineHeight: 36, weight: "bold" },
  // Serif body tier (WS2 — portfolio coverage)
  { fontSize: 18, lineHeight: 28, weight: "regular", role: "serif" },
  { fontSize: 20, lineHeight: 30, weight: "regular", role: "serif" },
  { fontSize: 20, lineHeight: 32, weight: "regular", role: "serif" },
  { fontSize: 24, lineHeight: 36, weight: "regular", role: "serif" },
  { fontSize: 28, lineHeight: 40, weight: "regular", role: "serif" },
  // Mono label tier (WS2)
  { fontSize: 13, lineHeight: 20, weight: "regular", role: "mono" },
  { fontSize: 14, lineHeight: 20, weight: "regular", role: "mono" },
  { fontSize: 15, lineHeight: 24, weight: "regular", role: "mono" },
  { fontSize: 15, lineHeight: 24, weight: "medium", role: "mono" },
];
