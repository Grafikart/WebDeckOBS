import React from "react";
import { useScenes } from "./OBSProvider";
import { SceneSwitcher } from "./buttons/SceneSwitcher";

export function StreamDeck() {
  const scenes = useScenes();
  return (
    <div className="grid">
      {scenes.map((scene) => (
        <SceneSwitcher key={scene.name} scene={scene.name} />
      ))}
    </div>
  );
}
