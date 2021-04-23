import React, { ReactNode } from "react";
export enum ButtonColors {
  blue = "blue",
  red = "red",
  yellow = "yellow",
  purple = "purple",
  green = "green",
  grey = "grey",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColors;
  children: ReactNode;
}

export function Button({
  color = ButtonColors.grey,
  children,
  ...props
}: ButtonProps) {
  const style =
    color !== ButtonColors.grey
      ? {
          background: `var(--${color})`,
        }
      : undefined;
  return (
    <button className={`button is-${color}`} style={style} {...props}>
      {children}
    </button>
  );
}
