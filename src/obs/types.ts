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
  sceneName: string;
  sceneIndex: number;
  [s: string]: any;
}

export interface OBSSource {
  sourceName: string;
  sourceType: number;
  groupName: string;
  isGroup: boolean | null,
  sceneItemEnabled: boolean,
  sceneItemId: number,
  [s: string]: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": { name: string };
    }
  }
}
