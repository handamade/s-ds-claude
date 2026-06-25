import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip.js";

describe("Tooltip", () => {
  it("does not show tooltip content by default", () => {
    render(
      <Tooltip content="Help text">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("shows tooltip on focus and hides on blur", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Trigger" });

    await user.tab();
    expect(trigger).toHaveFocus();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Help text");

    await user.tab();
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("sets aria-describedby on trigger when visible", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Descriptive text">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Trigger" });

    expect(trigger).not.toHaveAttribute("aria-describedby");

    await user.tab();
    const tooltip = screen.getByRole("tooltip");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("removes aria-describedby when hidden", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Text">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Trigger" });

    await user.tab();
    expect(trigger).toHaveAttribute("aria-describedby");

    await user.tab();
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("applies placement class", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Bottom tooltip" placement="bottom">
        <button>Trigger</button>
      </Tooltip>,
    );
    await user.tab();
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.className).toContain("bottom");
  });

  it("defaults to top placement", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Top tooltip">
        <button>Trigger</button>
      </Tooltip>,
    );
    await user.tab();
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.className).toContain("top");
  });

  it("preserves child event handlers", async () => {
    const user = userEvent.setup();
    let focused = false;
    render(
      <Tooltip content="Text">
        <button onFocus={() => { focused = true; }}>Trigger</button>
      </Tooltip>,
    );
    await user.tab();
    expect(focused).toBe(true);
  });
});
