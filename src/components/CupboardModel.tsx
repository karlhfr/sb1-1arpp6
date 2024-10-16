import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function CupboardModel({ position, rotation, isDarkMode }) {
  const group = useRef();
  const [modelError, setModelError] = useState(null);
  const { scene, nodes, materials } = useGLTF('/model.gltf', undefined, (error) => {
    console.error('Error loading model:', error);
    setModelError(error);
  });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = position[1];
      group.current.rotation.y = rotation[1];
    }
  });

  if (modelError) {
    return <mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="red" /></mesh>;
  }

  return (
    <group ref={group} dispose={null}>
      {scene ? (
        <primitive object={scene} scale={[0.1, 0.1, 0.1]} />
      ) : (
        <mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="gray" /></mesh>
      )}
    </group>
  );
}

export default CupboardModel;