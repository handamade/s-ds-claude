import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const name = process.argv[2];
if (!name) {
  console.error("Usage: pnpm new-theme <name>");
  process.exit(1);
}

const dir = resolve(import.meta.dirname, "../src/themes/customers");
const file = resolve(dir, `${name}.ts`);

if (existsSync(file)) {
  console.error(`Theme "${name}" already exists at ${file}`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const template = `import type { Palette, SlotMap } from "../../dsl/types.js";

export const ${name}Palette: Palette = {
  // Replace with brand OKLCH anchors
  dark: { l: 0.25, c: 0.02, h: 250 },
  light: { l: 0.95, c: 0.005, h: 250 },
  brand: { l: 0.55, c: 0.21, h: 260 },
  white: { l: 1.0, c: 0, h: 0 },
  black: { l: 0.0, c: 0, h: 0 },
};

export const ${name}Slots: SlotMap = {
  ink: "dark",
  canvas: "light",
  accent: "brand",
  success: "brand",
  warning: "brand",
  danger: "brand",
};
`;

writeFileSync(file, template);
console.log(`Created ${file}`);
console.log(`Next: edit the palette, then run "pnpm build" to generate ${name}.css`);
