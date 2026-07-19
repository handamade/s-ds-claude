/** Dialog component tokens (--psi-dialog-*). Elevated surface (bg-secondary,
 * unlike Card's transparent-on-canvas); backdrop reuses the heavy scrim the
 * NavBar glass treatment uses (D50). */
export const dialogVars: Record<string, string> = {
  bg: "var(--psi-bg-secondary)",
  border: "var(--psi-border-faint)",
  backdrop: "var(--psi-scrim-heavy)",
  "title-fg": "var(--psi-fg-primary)",
};
