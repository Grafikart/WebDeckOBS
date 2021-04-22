import React, { Children, ReactNode } from "react";

export function StreamDeck({children}: {children: ReactNode}) {
  return (
    <div className="grid">
      {children}
    </div>
  );
}
