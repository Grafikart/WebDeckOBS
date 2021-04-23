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
import { Buttons } from "./component/buttons/Buttons";
import { Row } from "./component/Row";
import { RefreshButton } from "./component/RefreshButton";

const url = new URL(window.location.href);
const host = url.searchParams.get("host") || "192.168.0.50:4444";
const password = url.searchParams.get("password") || "";

ReactDOM.render(
  <React.StrictMode>
    <OBSContextProvider hostname={host} password={password}>
      <StreamDeck>
        <Row>
          <ScenesSwitcher />
        </Row>
        <Row>
          <FilterCycle scene="📦 Tchat">
            <Icon name={Icons.tchat} />
            <span>Tchat</span>
          </FilterCycle>
          <Buttons>
            <FilterToggle scene="Stream" filter="zoom">
              <Icon name={Icons.zoom} />
              <span>Zoomer</span>
            </FilterToggle>
            <FilterToggle scene="Stream" filter="left">
              <Icon name={Icons.left} />
              <span>À gauche</span>
            </FilterToggle>
            <FilterToggle scene="Stream" filter="default">
              <Icon name={Icons.right} />
              <span>À droite</span>
            </FilterToggle>
          </Buttons>
        </Row>
        <Row>
          <Sounds scene="Stream" group="Sounds" />
        </Row>
        <Row>
          <Sounds scene="Stream" group="Music" icon={Icons.music} />
        </Row>
        <TransitionUpdater />
      </StreamDeck>
      <RefreshButton />
    </OBSContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
