import {
  cloneElement,
  useId,
  useState,
  useCallback,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./tooltip.module.css";

type Placement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip content. */
  content: ReactNode;
  /** The trigger element (must accept ref, onMouseEnter/Leave, onFocus/Blur). */
  children: ReactElement<Record<string, unknown>>;
  /** Preferred placement. @default "top" */
  placement?: Placement;
}

const placementClass: Record<Placement, string> = {
  top: styles.top,
  bottom: styles.bottom,
  left: styles.left,
  right: styles.right,
};

export function Tooltip({
  content,
  children,
  placement = "top",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const trigger = cloneElement(children, {
    "aria-describedby": visible ? id : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      const childOnMouseEnter = children.props.onMouseEnter as
        | ((e: React.MouseEvent) => void)
        | undefined;
      childOnMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      const childOnMouseLeave = children.props.onMouseLeave as
        | ((e: React.MouseEvent) => void)
        | undefined;
      childOnMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      const childOnFocus = children.props.onFocus as
        | ((e: React.FocusEvent) => void)
        | undefined;
      childOnFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      const childOnBlur = children.props.onBlur as
        | ((e: React.FocusEvent) => void)
        | undefined;
      childOnBlur?.(e);
    },
  });

  return (
    <span className={styles.wrapper}>
      {trigger}
      {visible && (
        <span
          id={id}
          role="tooltip"
          className={[styles.tooltip, placementClass[placement]]
            .filter(Boolean)
            .join(" ")}
        >
          {content}
        </span>
      )}
    </span>
  );
}
