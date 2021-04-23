export interface OBSWebsocketRequests {
  GetAuthRequired: {};
  Authenticate: { auth: string };
  GetSceneList: {};
  SetCurrentScene: { "scene-name": string };
  RestartMedia: { sourceName: string };
  SetCurrentTransition: { "transition-name": string };
  SetSourceFilterVisibility: {
    sourceName: string;
    filterName: string;
    filterEnabled: boolean;
  };
  SetSceneItemProperties: {
    item: string;
    visible: boolean;
  };
}

export enum OBSWebsocketStatuses {
  OK = "ok",
  ERROR = "error",
}

interface OBSWebsocketDefaultResponse {
  status?: OBSWebsocketStatuses;
  error?: string;
  "message-id"?: string;
}

interface OBSMediaResponse {
  sourceName: string;
  "update-type": string;
}

export interface OBSWebsocketResponses {
  Authenticate: OBSWebsocketDefaultResponse;
  Exiting: OBSWebsocketDefaultResponse;
  Error: OBSWebsocketDefaultResponse;
  SetCurrentTransition: OBSWebsocketDefaultResponse;
  SetCurrentScene: OBSWebsocketDefaultResponse;
  RestartMedia: OBSWebsocketDefaultResponse;
  SetSceneItemProperties: OBSWebsocketDefaultResponse;
  SetSourceFilterVisibility: OBSWebsocketDefaultResponse;
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
  MediaRestarted: OBSMediaResponse;
  MediaEnded: OBSMediaResponse;
  SourceFilterVisibilityChanged: {
    filterEnabled: boolean;
    filterName: string;
    sourceName: string;
  } & OBSWebsocketDefaultResponse;
  TransitionEnd: {
    name: string;
    type: string;
    duration: number;
    "to-scene": string;
  } & OBSWebsocketDefaultResponse;
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
  groupChildren?: OBSSource[];
}

export interface OBSScene {
  name: string;
  sources: OBSSource[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": { name: string };
    }
  }
}
