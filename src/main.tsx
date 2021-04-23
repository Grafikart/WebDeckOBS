import "./main.css";
import React from "react";
import ReactDOM from "react-dom";
import { OBSContextProvider } from "./component/OBSProvider";
import { StreamDeck } from "./component/StreamDeck";
import { ScenesSwitcher } from "./component/buttons/SceneSwitcher";
import { Sounds } from "./component/buttons/Sounds";
import { Icon, Icons } from "./component/Icon";
import { FilterCycle } from "./component/buttons/FilterCycle";
import { FilterToggle } from "./component/buttons/FilterToggle";
import { TransitionUpdater } from "./component/TransitionUpdater";

ReactDOM.render(
  <React.StrictMode>
    <OBSContextProvider hostname="192.168.0.50:4444" password="obscontrol">
      <StreamDeck>
        <ScenesSwitcher />
        <Sounds scene="Stream" group="Sounds" />
        <FilterCycle scene="📦 Tchat">
          <Icon name={Icons.tchat} />
          <span>Tchat</span>
        </FilterCycle>
        <FilterToggle scene="Stream" filter="zoom">
          <Icon name={Icons.zoom} />
          <span>Zoomer</span>
        </FilterToggle>
        <FilterToggle scene="Stream" filter="default">
          <Icon name={Icons.right} />
          <span>À droite</span>
        </FilterToggle>
        <FilterToggle scene="Stream" filter="left">
          <Icon name={Icons.left} />
          <span>À gauche</span>
        </FilterToggle>
        <Sounds scene="Stream" group="Music" icon={Icons.music} />
        <TransitionUpdater />
      </StreamDeck>
    </OBSContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
