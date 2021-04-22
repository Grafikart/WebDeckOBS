import React, { useEffect, useState } from "react";
import { useObs, useScene } from "../OBSProvider";
import { Button, ButtonColors } from "./Button";

/**
 * Crée un bouton pour chaque son présent dans la scène passée en paramètre
 *
 * @param scene Scène contenant les sons à lancer
 */
export function Sounds({ scene }: { scene: string }) {
  const sources = useScene(scene)?.sources || [];
  return (
    <>
      {sources.map((source) => (
        <Sound name={source.name} key={source.name} />
      ))}
    </>
  );
}

export function Sound({ name }: { name: string }) {
  const obs = useObs();
  const [isPlaying, setIsPlaying] = useState(false);
  const playSound = () => {
    obs.send("RestartMedia", { sourceName: name });
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
      }
    });

    return () => {
      offRestart();
      offEnded();
    };
  });

  return (
    <Button
      color={isPlaying ? ButtonColors.green : ButtonColors.blue}
      onClick={playSound}
    >
      <ion-icon name="musical-note-outline" />
      {name}
    </Button>
  );
}
