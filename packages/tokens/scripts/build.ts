import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { defaultPalette, defaultSlots } from "../src/palettes/default.js";
import { lightTheme } from "../src/themes/light.js";
import { darkTheme } from "../src/themes/dark.js";
import { validate } from "../src/dsl/validator.js";
import { resolve } from "../src/dsl/resolver.js";

import { emitBaseCSS, emitThemeCSS } from "./emit-css.js";
import { emitResolvedJSON } from "./emit-json.js";
import { emitTokenTypes } from "./emit-types.js";
import { emitScaleVarsCSS, emitUtilitiesCSS } from "./emit-utilities.js";

// ── Config ────────────────────────────────────────────────────────

const themes: Record<string, typeof lightTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const distDir = join(__dirname, "..", "dist");
const resolvedDir = join(distDir, "resolved");
const typesDir = join(distDir, "types");

// ── Build ─────────────────────────────────────────────────────────

function build(): void {
  console.log("[tokens] Building...");

  // Create output directories
  mkdirSync(distDir, { recursive: true });
  mkdirSync(resolvedDir, { recursive: true });
  mkdirSync(typesDir, { recursive: true });

  // 1. Emit base CSS: palette vars + scale vars
  const paletteCSS = emitBaseCSS(defaultPalette);
  const scaleVars = emitScaleVarsCSS();
  // Inject scale vars into the :root block (before the closing braces)
  const baseCSS = paletteCSS.replace(
    /(\s*}\n})\n$/,
    `\n\n${scaleVars}\n$1\n`,
  );
  writeFileSync(join(distDir, "base.css"), baseCSS);
  console.log("  wrote dist/base.css");

  // 2. For each theme: validate, resolve, emit CSS + JSON
  for (const [themeName, themeDef] of Object.entries(themes)) {
    // Validate
    validate(themeDef, defaultSlots);
    console.log(`  validated ${themeName} theme`);

    // Resolve (static values for JSON)
    const resolved = resolve(themeDef, defaultPalette, defaultSlots);

    // Emit theme CSS (live oklch formulas)
    const themeCSS = emitThemeCSS(
      themeName,
      themeDef,
      defaultPalette,
      defaultSlots,
    );
    writeFileSync(join(distDir, `${themeName}.css`), themeCSS);
    console.log(`  wrote dist/${themeName}.css`);

    // Emit resolved JSON
    const json = emitResolvedJSON(themeName, resolved);
    writeFileSync(join(resolvedDir, `${themeName}.json`), json);
    console.log(`  wrote dist/resolved/${themeName}.json`);
  }

  // 3. Emit TypeScript types
  const types = emitTokenTypes(themes);
  writeFileSync(join(typesDir, "index.ts"), types);
  console.log("  wrote dist/types/index.ts");

  // 4. Emit utility classes
  const utilitiesCSS = emitUtilitiesCSS();
  writeFileSync(join(distDir, "utilities.css"), utilitiesCSS);
  console.log("  wrote dist/utilities.css");

  console.log("[tokens] Build complete.");
}

build();
