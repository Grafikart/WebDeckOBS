import React, { memo, useEffect, useState } from 'react';
import { useObs, useScenes } from '../OBSProvider';
import { Button, ButtonColors } from './Button';
import { Icon, Icons } from '../Icon';
import { images } from '../../images';
import { OBSSource } from '../../obs/types'

export interface SoundsProps {
  scene: string;
}

/**
 * Crée un bouton pour chaque son présent dans la scène passée en paramètre
 */
export const Sounds = memo(({ scene }: SoundsProps) => {
  const obs = useObs()
  const [sources, setSources] = useState([] as OBSSource[])
  const isConnected = useScenes().length > 0

  useEffect(() => {
    obs.send('GetSceneItemList', { sceneName: scene }, (data) => setSources(data.sceneItems.reverse() as OBSSource[]))
  }, [isConnected])


  return (
    <>
      {sources.map((source) => (
        <Sound scene={scene} name={source.sourceName} id={source.sceneItemId} key={source.sceneItemId}/>
      ))}
    </>
  );
})

export function Sound ({
                         name,
                         scene,
                         id
                       }: {
  name: string;
  scene: string;
  id: number;
}) {
  const obs = useObs();
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    obs.send('SetSceneItemEnabled', {
      sceneName: scene,
      sceneItemId: id,
      sceneItemEnabled: !isPlaying
    });
  };

  useEffect(() => {
    const offRestart = obs.on('MediaInputPlaybackStarted', (data) => {
      console.log(data.inputName)
      if (data.inputName === name) {
        setIsPlaying(true);
      }
    });

    const offEnded = obs.on('MediaInputPlaybackEnded', (data) => {
      if (data.inputName === name) {
        setIsPlaying(false);
        obs.send('SetSceneItemEnabled', {
          sceneName: scene,
          sceneItemId: id,
          sceneItemEnabled: !isPlaying
        });
      }
    });

    return () => {
      offRestart();
      offEnded();
    };
  });

  const image = images[name];

  return (
    <Button
      color={isPlaying ? ButtonColors.green : ButtonColors.purple}
      onClick={toggleSound}
    >
      <Icon name={Icons.sound}/>
      <span>{name}</span>
      <img src={image} alt=""/>
    </Button>
  );
}
