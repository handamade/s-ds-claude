import type {
  CapOp,
  DeltaOp,
  SetOp,
  SlotRef,
  TokenDef,
  TokenRef,
} from "./types.js";

// ── Channel operation builders ──────────────────────────────────────

export function set(value: number): SetOp {
  return { op: "set", value };
}

export function delta(value: number): DeltaOp {
  return { op: "delta", value };
}

export function cap(value: number): CapOp {
  return { op: "cap", value };
}

// ── Source proxies ──────────────────────────────────────────────────

export const slot: Record<string, SlotRef> = new Proxy(
  {} as Record<string, SlotRef>,
  {
    get(_target, prop: string): SlotRef {
      return { type: "slot", name: prop };
    },
  },
);

export const ref: Record<string, TokenRef> = new Proxy(
  {} as Record<string, TokenRef>,
  {
    get(_target, prop: string): TokenRef {
      return { type: "ref", name: prop };
    },
  },
);

// ── Token builder ───────────────────────────────────────────────────

export function token(def: TokenDef): TokenDef {
  return { ...def };
}
