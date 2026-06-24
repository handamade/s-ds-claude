import { spacingScale } from "../src/scales/spacing.js";
import { sizeScale } from "../src/scales/sizes.js";
import { radiusScale } from "../src/scales/radius.js";
import { typographyScale } from "../src/scales/typography.js";

// ── Helpers ───────────────────────────────────────────────────────

function pxToRem(px: number): string {
  if (px === 0) return "0";
  return `${px / 16}rem`;
}

// ── Scale CSS custom properties ──────────────────────────────────

/**
 * Generate CSS custom properties for all scales.
 * These go inside the :root block in base.css.
 */
export function emitScaleVarsCSS(): string {
  const lines: string[] = [];

  // Spacing
  for (const px of spacingScale) {
    lines.push(`    --ds-space-${px}: ${pxToRem(px)};`);
  }

  lines.push("");

  // Sizes
  for (const px of sizeScale) {
    lines.push(`    --ds-size-${px}: ${pxToRem(px)};`);
  }

  lines.push("");

  // Radius
  for (const px of radiusScale) {
    lines.push(`    --ds-radius-${px}: ${pxToRem(px)};`);
  }
  lines.push(`    --ds-radius-full: 9999px;`);

  lines.push("");

  // Typography
  for (const step of typographyScale) {
    lines.push(
      `    --ds-text-${step.name}-size: ${pxToRem(step.fontSize)};`,
    );
    lines.push(
      `    --ds-text-${step.name}-line: ${pxToRem(step.lineHeight)};`,
    );
    lines.push(
      `    --ds-text-${step.name}-weight: ${step.cssWeight};`,
    );
  }

  lines.push("");

  // Font stacks
  lines.push(
    `    --ds-font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";`,
  );
  lines.push(
    `    --ds-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;`,
  );

  return lines.join("\n");
}

// ── Utility classes ──────────────────────────────────────────────

/**
 * Generate utility classes for spacing, sizing, and typography.
 * Wrapped in @layer ds.utilities.
 */
export function emitUtilitiesCSS(): string {
  const lines: string[] = [];

  lines.push("@layer ds.utilities {");

  // Gap utilities
  for (const px of spacingScale) {
    lines.push(`  .ds-gap-${px} { gap: var(--ds-space-${px}); }`);
  }

  lines.push("");

  // Padding utilities
  for (const px of spacingScale) {
    lines.push(`  .ds-p-${px} { padding: var(--ds-space-${px}); }`);
    lines.push(
      `  .ds-px-${px} { padding-inline: var(--ds-space-${px}); }`,
    );
    lines.push(
      `  .ds-py-${px} { padding-block: var(--ds-space-${px}); }`,
    );
  }

  lines.push("");

  // Margin utilities
  for (const px of spacingScale) {
    lines.push(`  .ds-m-${px} { margin: var(--ds-space-${px}); }`);
    lines.push(
      `  .ds-mx-${px} { margin-inline: var(--ds-space-${px}); }`,
    );
    lines.push(
      `  .ds-my-${px} { margin-block: var(--ds-space-${px}); }`,
    );
  }

  lines.push("");

  // Typography utilities
  for (const step of typographyScale) {
    lines.push(
      `  .ds-text-${step.name} {`,
    );
    lines.push(
      `    font-size: var(--ds-text-${step.name}-size);`,
    );
    lines.push(
      `    line-height: var(--ds-text-${step.name}-line);`,
    );
    lines.push(
      `    font-weight: var(--ds-text-${step.name}-weight);`,
    );
    lines.push(`  }`);
  }

  lines.push("}");

  return lines.join("\n") + "\n";
}
