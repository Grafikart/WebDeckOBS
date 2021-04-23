import React, { ReactNode, useEffect, useState } from "react";
import { Button, ButtonColors } from "./Button";
import { useObs } from "../OBSProvider";

interface FilterToggleProps {
  scene: string;
  filter: string;
  children: ReactNode;
}

/**
 * Active/Désactive un filtre sur une scène
 */
export function FilterToggle({ scene, filter, children }: FilterToggleProps) {
  const obs = useObs();
  const [active, setActive] = useState(false);
  const toggle = () => {
    obs.send("SetSourceFilterVisibility", {
      sourceName: scene,
      filterName: filter,
      filterEnabled: !active,
    });
  };

  useEffect(() => {
    return obs.on("SourceFilterVisibilityChanged", (data) => {
      if (data.sourceName === scene && data.filterEnabled) {
        setActive(data.filterName === filter);
      }
    });
  }, [filter]);

  return (
    <Button
      color={active ? ButtonColors.green : ButtonColors.blue}
      onClick={toggle}
    >
      {children}
    </Button>
  );
}
