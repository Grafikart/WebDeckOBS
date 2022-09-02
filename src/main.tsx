import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { OBSContextProvider } from './component/OBSProvider';
import { StreamDeck } from './component/StreamDeck';
import { ScenesSwitcher } from './component/buttons/SceneSwitcher';
import { Sounds } from './component/buttons/Sounds';
import { Row } from './component/Row';
import { RefreshButton } from './component/RefreshButton';

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
          <Sounds scene="Sounds" />
        </Row>
      </StreamDeck>
      <RefreshButton />
    </OBSContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
