import React, { ReactNode } from "react";

export function Buttons({ children }: { children: ReactNode }) {
  const childrenLength = React.Children.toArray(children).length;
  const style = {
    ["--columns"]: childrenLength.toString(),
  } as React.CSSProperties;
  return (
    <div className="buttons" style={style}>
      {children}
    </div>
  );
}
