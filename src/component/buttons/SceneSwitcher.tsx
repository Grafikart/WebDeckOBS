import React from "react";
import { Button, ButtonColors } from "./Button";
import { useCurrentScene, useObs, useScenes } from "../OBSProvider";
import { Icon, Icons } from "../Icon";

interface SceneSwitcherProps {
  scene: string;
}

interface ScenesSwitcherProps {
  ignore?: string;
}

export function ScenesSwitcher({ ignore = "📦" }: ScenesSwitcherProps) {
  const scenes = useScenes();
  return (
    <>
      {scenes
        .filter((s) => !s.name.startsWith(ignore))
        .map((scene) => (
          <SceneSwitcher key={scene.name} scene={scene.name} />
        ))}
    </>
  );
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
      <Icon name={Icons.scene} />
      {scene}
    </Button>
  );
}
