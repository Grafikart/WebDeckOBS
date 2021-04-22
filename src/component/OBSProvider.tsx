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

export function useScene(sceneName: string) {
  return useContext(OBSContext).scenes.find((s) => s.name === sceneName);
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

  useEffect(function () {
    const obs = obsRef.current;
    const onSwitchScene = (data: { "scene-name": string }) => {
      setCurrentScene(data["scene-name"]);
    };
    obs.connect(hostname, password).then(() => {
      obs.send("GetSceneList", {}, (data) => {
        setScenes(data.scenes);
        setCurrentScene(data["current-scene"]);
      });
    });

    obs.on("SwitchScenes", onSwitchScene);

    return () => {
      obs.off("SwitchScenes", onSwitchScene);
    };
  }, []);

  return (
    <OBSContext.Provider value={{ scenes, obsRef, currentScene }}>
      {children}
    </OBSContext.Provider>
  );
}
