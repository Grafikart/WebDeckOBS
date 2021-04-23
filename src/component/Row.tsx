import React, { ReactNode } from "react";

export function Row({ children }: { children: ReactNode }) {
  return <div className="row">{children}</div>;
}
