import React, { useEffect, useState } from "react";
import { useObs, useSources } from "../OBSProvider";
import { Button, ButtonColors } from "./Button";
import { Icon, Icons } from "../Icon";
import { images } from "../../images";

export interface SoundsProps {
  scene: string;
  group?: string;
  icon?: Icons;
}

/**
 * Crée un bouton pour chaque son présent dans la scène passée en paramètre
 */
export function Sounds({ scene, group, icon }: SoundsProps) {
  const sources = useSources(scene, group);
  return (
    <>
      {sources.map((source) => (
        <Sound name={source.name} key={source.name} icon={icon} />
      ))}
    </>
  );
}

export function Sound({
  name,
  icon = Icons.sound,
}: {
  name: string;
  icon?: Icons;
}) {
  const obs = useObs();
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    obs.send("SetSceneItemProperties", {
      item: name,
      visible: !isPlaying,
    });
  };

  useEffect(() => {
    const offRestart = obs.on("MediaRestarted", (data) => {
      if (data.sourceName === name) {
        setIsPlaying(true);
      }
    });

    const offEnded = obs.on("MediaEnded", (data) => {
      if (data.sourceName === name) {
        setIsPlaying(false);
        obs.send("SetSceneItemProperties", {
          item: name,
          visible: false,
        });
      }
    });

    return () => {
      offRestart();
      offEnded();
    };
  });

  const image = images[name];

  return (
    <Button
      color={isPlaying ? ButtonColors.green : ButtonColors.purple}
      onClick={playSound}
    >
      <Icon name={icon} />
      <span>{name}</span>
      <img src={image} alt="" />
    </Button>
  );
}
