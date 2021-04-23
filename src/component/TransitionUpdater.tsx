import React, { useEffect } from "react";
import { Button } from "./buttons/Button";
import { useObs } from "./OBSProvider";

/**
 * Change la transition utilisé entre les scènes en fonction de la scène affichée (en attendant que ça soit implémenté dans OBS)
 */
export function TransitionUpdater() {
  const obs = useObs();

  useEffect(() => {
    obs.on("TransitionEnd", (data) => {
      if (data["to-scene"] === "Stream") {
        obs.send("SetCurrentTransition", { "transition-name": "Move" });
      } else if (["Soon", "Pause", ""].includes(data["to-scene"])) {
        obs.send("SetCurrentTransition", { "transition-name": "Courbes" });
      }
    });
  }, []);

  return <Button>Grey</Button>;
}
