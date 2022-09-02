import React, { useEffect, useState } from "react";
import { useObs } from "./OBSProvider";
import { Icon, Icons } from "./Icon";

export function RefreshButton() {
  const refresh = () => {
    window.location.reload();
  };

  const obs = useObs();
  const [online, setOnline] = useState(true);

  useEffect(() => {
    return obs.on("ExitStarted", () => {
      setOnline(false);
    });
  }, []);

  if (online) {
    return null;
  }

  return (
    <div className="modal">
      <p>La connexion avec le serveur de websocket a été perdue</p>
      <button className="button" onClick={refresh}>
        <Icon name={Icons.refresh} />
        Rafraichir la page
      </button>
    </div>
  );
}
