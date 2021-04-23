import React, { ReactNode } from "react";
import {
  IoTvOutline,
  IoMusicalNoteOutline,
  IoMusicalNotesOutline,
  IoChatbubblesOutline,
  IoSearchOutline,
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoCameraOutline,
} from "react-icons/io5";
import { IconType } from "react-icons";

export enum Icons {
  scene = "scene",
  sound = "sound",
  music = "music",
  tchat = "tchat",
  zoom = "zoom",
  left = "left",
  right = "right",
  camera = "camera",
}

export function Icon({ name }: { name: Icons }) {
  switch (name) {
    case Icons.scene:
      return <IoTvOutline />;
    case Icons.sound:
      return <IoMusicalNoteOutline />;
    case Icons.music:
      return <IoMusicalNotesOutline />;
    case Icons.tchat:
      return <IoChatbubblesOutline />;
    case Icons.zoom:
      return <IoSearchOutline />;
    case Icons.left:
      return <IoArrowBackCircleOutline />;
    case Icons.right:
      return <IoArrowForwardCircleOutline />;
    case Icons.camera:
      return <IoCameraOutline />;
  }
  return null;
}
