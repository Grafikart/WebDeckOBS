import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { OBSScene } from "../obs/types";
import { OBSWebsocket } from "../obs/OBSWebsocket";
import { useAsyncEffect } from "../utils/hooks";

interface OBSContextInterface {
  scenes: OBSScene[];
  obsRef: React.MutableRefObject<OBSWebsocket>;
  currentScene: string;
}

interface OBSContextProviderProps {
  children: ReactNode;
  hostname: string;
  password: string;
}

const OBSContext = createContext<OBSContextInterface>({
  scenes: [],
  obsRef: { current: new OBSWebsocket() },
  currentScene: "",
});

export function useScenes() {
  return useContext(OBSContext).scenes;
}

export function useCurrentScene() {
  return useContext(OBSContext).currentScene;
}

export function useObs() {
  return useContext(OBSContext).obsRef.current;
}

export function OBSContextProvider({
  children,
  hostname,
  password,
}: OBSContextProviderProps) {
  const [scenes, setScenes] = useState<OBSScene[]>([]);
  const [currentScene, setCurrentScene] = useState<string>("");
  const obsRef = useRef<OBSWebsocket>(new OBSWebsocket());

  useAsyncEffect(async function () {
    const obs = obsRef.current;
    await obs.connect(hostname, password);
    obs.send("GetSceneList", {}, (data) => {
      setScenes(data.scenes);
      setCurrentScene(data["current-scene"]);
    });
    obs.on("SwitchScenes", (data) => {
      setCurrentScene(data["scene-name"]);
    });
  });

  return (
    <OBSContext.Provider value={{ scenes, obsRef, currentScene }}>
      {children}
    </OBSContext.Provider>
  );
}
