export interface TypographyStep {
  /** CSS custom property suffix, e.g. "sm", "base", "lg" */
  name: string;
  /** Font size in px */
  fontSize: number;
  /** Line height in px */
  lineHeight: number;
  /** Semantic weight name */
  weight: "regular" | "medium" | "semibold" | "bold";
  /** CSS font-weight numeric value */
  cssWeight: number;
}

export const typographyScale: TypographyStep[] = [
  { name: "xs", fontSize: 12, lineHeight: 16, weight: "regular", cssWeight: 400 },
  { name: "sm", fontSize: 14, lineHeight: 20, weight: "regular", cssWeight: 400 },
  { name: "base", fontSize: 16, lineHeight: 24, weight: "regular", cssWeight: 400 },
  { name: "lg", fontSize: 18, lineHeight: 28, weight: "medium", cssWeight: 500 },
  { name: "xl", fontSize: 20, lineHeight: 28, weight: "semibold", cssWeight: 600 },
  { name: "2xl", fontSize: 24, lineHeight: 32, weight: "semibold", cssWeight: 600 },
  { name: "3xl", fontSize: 30, lineHeight: 36, weight: "bold", cssWeight: 700 },
  { name: "4xl", fontSize: 36, lineHeight: 40, weight: "bold", cssWeight: 700 },
];
