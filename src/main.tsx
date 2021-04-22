import "./main.css";
import React from "react";
import ReactDOM from "react-dom";
import { OBSContextProvider } from "./component/OBSProvider";
import { StreamDeck } from "./component/StreamDeck";
import { ScenesSwitcher } from "./component/buttons/SceneSwitcher";
import { Sounds } from "./component/buttons/Sounds";

ReactDOM.render(
  <React.StrictMode>
    <OBSContextProvider hostname="192.168.0.35:4444" password="obscontrol">
      <StreamDeck>
        <ScenesSwitcher />
        <Sounds scene="📦 Sounds" />
      </StreamDeck>
    </OBSContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
