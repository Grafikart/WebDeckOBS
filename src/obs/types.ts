export interface OBSWebsocketRequests {
  GetAuthRequired: {};
  Authenticate: { auth: string };
  GetSceneList: {};
  SetCurrentScene: { ["scene-name"]: string };
}

export enum OBSWebsocketStatuses {
  OK = "ok",
  ERROR = "error",
}

interface OBSWebsocketDefaultResponse {
  status: OBSWebsocketStatuses;
  error?: string;
  ["message-id"]: string;
}

export interface OBSWebsocketResponses {
  Authenticate: OBSWebsocketDefaultResponse;
  SetCurrentScene: OBSWebsocketDefaultResponse;
  GetSceneList: {
    scenes: OBSScene[];
    ["current-scene"]: string;
  } & OBSWebsocketDefaultResponse;
  GetAuthRequired: {
    authRequired: boolean;
    challenge: string;
    salt: string;
  } & OBSWebsocketDefaultResponse;
  SwitchScenes: {
    "scene-name": string;
    sources: OBSSource[];
  };
}

export interface OBSSource {
  alignment: number;
  cx: number;
  cy: number;
  id: number;
  locked: boolean;
  muted: boolean;
  name: string;
  render: boolean;
  source_cx: number;
  source_cy: number;
  type: string;
  volume: number;
  x: number;
  y: number;
}

export interface OBSScene {
  name: string;
  sources: OBSSource[];
}
