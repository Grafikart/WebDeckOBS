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

export function useScenes(): OBSScene[] {
  return useContext(OBSContext).scenes;
}

export function useScene(sceneName: string): OBSScene | undefined {
  return useContext(OBSContext).scenes.find((s) => s.name === sceneName);
}

export function useSources(sceneName: string, groupName?: string): OBSSource[] {
  let sources = useScene(sceneName)?.sources || [];
  if (groupName) {
    sources = sources.find((s) => s.name === groupName)?.groupChildren || [];
  }
  return sources;
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
  const [currentScene, setCurrentScene] = useState<string>("");
  const obsRef = useRef<OBSWebsocket>(new OBSWebsocket());
  const [error, setError] = useState<Error | null>(null);

  useEffect(function () {
    const obs = obsRef.current;
    const onSwitchScene = (data: { "scene-name": string }) => {
      setCurrentScene(data["scene-name"]);
    };
    const connect = () => {
      setError(null);
      obs
        .connect(hostname, password)
        .then(() => {
          obs.send("GetSceneList", {}, (data) => {
            setScenes(data.scenes);
            setCurrentScene(data["current-scene"]);
          });
        })
        .catch((err) => {
          setError(err);
        });
    };
    const disconnect = () => {
      obs.close();
    };

    connect();

    // window.addEventListener("focus", connect);
    // window.addEventListener("blur", disconnect);

    obs.on("SwitchScenes", onSwitchScene);

    return () => {
      obs.off("SwitchScenes", onSwitchScene);
      window.removeEventListener("focus", connect);
      window.removeEventListener("blur", disconnect);
    };
  }, []);

  return (
    <OBSContext.Provider value={{ scenes, obsRef, currentScene }}>
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
