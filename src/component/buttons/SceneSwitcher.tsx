import React from "react";
import { Button, ButtonColors } from "./Button";
import { useCurrentScene, useObs } from "../OBSProvider";

interface SceneSwitcherProps {
  scene: string;
}

export function SceneSwitcher({ scene }: SceneSwitcherProps) {
  const currentScene = useCurrentScene();
  const obs = useObs();
  const changeScene = () => {
    obs.send("SetCurrentScene", { ["scene-name"]: scene });
  };
  return (
    <Button
      color={currentScene === scene ? ButtonColors.blue : undefined}
      onClick={changeScene}
    >
      {scene}
    </Button>
  );
}
