import React from "react";
import { Button, ButtonColors } from "./Button";
import { useCurrentScene, useObs, useScenes } from "../OBSProvider";
import { Icon, Icons } from "../Icon";

interface SceneSwitcherProps {
  scene: string;
}

export function ScenesSwitcher() {
  const scenes = useScenes();
  return (
    <>
      {scenes
        .filter((s) => s.sceneName.match(/^[a-z0-9].*$/i))
        .map((scene) => (
          <SceneSwitcher key={scene.sceneName} scene={scene.sceneName} />
        ))}
    </>
  );
}

export function SceneSwitcher({ scene }: SceneSwitcherProps) {
  const currentScene = useCurrentScene();
  const obs = useObs();
  const changeScene = () => {
    obs.send("SetCurrentProgramScene", { sceneName: scene });
  };
  return (
    <Button
      color={currentScene === scene ? ButtonColors.blue : undefined}
      onClick={changeScene}
    >
      <Icon name={Icons.scene} />
      <span>{scene}</span>
    </Button>
  );
}
