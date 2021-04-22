import "./main.css";
import React from "react";
import ReactDOM from "react-dom";
import { OBSContextProvider } from "./component/OBSProvider";
import { StreamDeck } from "./component/StreamDeck";

ReactDOM.render(
  <React.StrictMode>
    <OBSContextProvider hostname="192.168.0.50:4444" password="obscontrol">
      <StreamDeck />
    </OBSContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
