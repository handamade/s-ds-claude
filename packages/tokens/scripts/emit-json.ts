import type { ResolvedTheme } from "../src/dsl/resolver.js";

/**
 * Emit a JSON string containing the resolved theme tokens.
 * Used for Figma/docs and other tooling that needs static color values.
 */
export function emitResolvedJSON(
  themeName: string,
  resolved: ResolvedTheme,
): string {
  return JSON.stringify(
    {
      theme: themeName,
      tokens: resolved,
    },
    null,
    2,
  ) + "\n";
}
