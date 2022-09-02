import React, {
  createContext,
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { OBSScene, OBSSource } from "../obs/types";
import { OBSWebsocket } from "../obs/OBSWebsocket";
import { Icon, Icons } from "./Icon";
import { OBSEventTypes } from 'obs-websocket-js'

interface OBSContextProviderProps {
  children: ReactNode;
  hostname: string;
  password: string;
}

const OBSContext = createContext({
  scenes: [] as OBSScene[],
  sources: [] as OBSSource[],
  obsRef: { current: new OBSWebsocket() },
  currentScene: "",
});

export function useScenes(): OBSScene[] {
  return useContext(OBSContext).scenes;
}

export function useScene(sceneName: string): OBSScene | undefined {
  return useContext(OBSContext).scenes.find((s) => s.name === sceneName);
}

export function useSources(groupName?: string): OBSSource[] {
  return useContext(OBSContext).sources.filter(s => s.groupName === groupName);
}

export function useCurrentScene(): string {
  return useContext(OBSContext).currentScene;
}

export function useObs(): OBSWebsocket {
  return useContext(OBSContext).obsRef.current;
}

export function OBSContextProvider({
  children,
  hostname,
  password,
}: OBSContextProviderProps) {
  const [scenes, setScenes] = useState<OBSScene[]>([]);
  const [sources, setSources] = useState<OBSSource[]>([]);
  const [currentScene, setCurrentScene] = useState<string>("");
  const obsRef = useRef<OBSWebsocket>(new OBSWebsocket());
  const [error, setError] = useState<Error | null>(null);

  useEffect(function () {
    const obs = obsRef.current;
    const onSwitchScene = (data: OBSEventTypes['CurrentProgramSceneChanged']) => {
      setCurrentScene(data.sceneName);
      setSources([])
    };
    const connect = () => {
      setError(null);
      setSources([]);
      obs
        .connect(hostname, password)
        .then(() => {
          if (scenes.length === 0) {
            obs.send("GetSceneList", undefined, (data) => {
              setScenes(data.scenes as OBSScene[]);
              setCurrentScene(data.currentProgramSceneName);
            });
          }
        })
        .catch((err) => {
          setError(err);
        });
    };
    const disconnect = () => {
      obs.close();
    };

    connect();

    window.addEventListener("focus", connect);
    window.addEventListener("blur", disconnect);

    obs.on("CurrentProgramSceneChanged", onSwitchScene);

    return () => {
      obs.off("CurrentProgramSceneChanged", onSwitchScene);
      window.removeEventListener("focus", connect);
      window.removeEventListener("blur", disconnect);
    };
  }, []);

  return (
    <OBSContext.Provider value={{ scenes, obsRef, currentScene, sources }}>
      {error && (
        <ReconnectModal
          hostname={hostname}
          password={password}
          error={`${error}`}
        />
      )}
      {children}
    </OBSContext.Provider>
  );
}

function ReconnectModal({
  hostname,
  password,
  error,
}: {
  hostname: string;
  password: string;
  error: string;
}) {
  const onSubmit = (evt: SyntheticEvent<HTMLFormElement, Event>) => {
    evt.preventDefault();
    const data = new FormData(evt.target as HTMLFormElement);
    window.location.href = `${window.location.pathname}?hostname=${data.get(
      "hostname"
    )}&password=${data.get("password")}`;
  };

  return (
    <form className="modal" onSubmit={onSubmit}>
      <p>
        La connexion a échouée <br />
        <small>{error}</small>
      </p>
      <div className="spaced">
        <input
          type="text"
          placeholder="Hôte : 192.168.0.X"
          defaultValue={hostname}
          name="hostname"
        />
        <input
          type="text"
          placeholder="Mot de passe"
          defaultValue={password}
          name="password"
        />
        <button className="button">
          <Icon name={Icons.refresh} />
          Se reconnecter
        </button>
      </div>
    </form>
  );
}
