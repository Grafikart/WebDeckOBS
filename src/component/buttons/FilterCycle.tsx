import React, { ReactNode, useState } from "react";
import { Button, ButtonColors } from "./Button";
import { filter } from "ionicons/icons";
import { useObs } from "../OBSProvider";

interface FilterCycleProps {
  scene: string;
  filters?: string[];
  colors?: ButtonColors[];
  children: ReactNode;
}

export function FilterCycle({
  scene,
  filters = ["show", "hide"],
  children,
  colors = [ButtonColors.blue, ButtonColors.grey],
}: FilterCycleProps) {
  const [state, setState] = useState(0);
  const obs = useObs();
  const cycle = () => {
    const newState = state + 1 >= filters.length ? 0 : state + 1;
    obs.send("SetSourceFilterVisibility", {
      sourceName: scene,
      filterName: filters[newState],
      filterEnabled: true,
    });
    setState(newState);
  };

  return (
    <Button color={colors[state]} onClick={cycle}>
      {children}
    </Button>
  );
}
