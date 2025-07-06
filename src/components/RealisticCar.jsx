import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Color } from "three";
import { Text } from "@react-three/drei";
import { useState } from "react";

export function RealisticCar({ 
  position = [0, 0, 0], 
  project, 
  onClick, 
  baseColor = "#ff0000" 
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const carRef = useRef();
  
  const gltf = useLoader(
    GLTFLoader,
    "/models/car/scene.gltf"
  );
  
  useEffect(() => {
    if (gltf && gltf.scene) {
      // Create a copy of the scene for each car instance
      const carScene = gltf.scene.clone();
      carScene.scale.set(0.005, 0.005, 0.005);
      carScene.position.set(0, -0.035, 0);
      
      // Apply custom color to car materials
      carScene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = 20;
          
          // Apply custom color to main car body (not wheels, glass, etc.)
          if (object.material.name && 
              !object.material.name.includes('wheel') &&
              !object.material.name.includes('glass') &&
              !object.material.name.includes('chrome')) {
            object.material = object.material.clone();
            object.material.color = new Color(baseColor);
            object.material.metalness = 0.8;
            object.material.roughness = 0.2;
          }
        }
      });
      
      if (carRef.current) {
        carRef.current.clear();
        carRef.current.add(carScene);
      }
    }
  }, [gltf, baseColor]);

  useFrame((state) => {
    if (carRef.current && carRef.current.children[0]) {
      let t = state.clock.getElapsedTime();
      let carScene = carRef.current.children[0];
      
      // Animate wheels
      if (carScene.children[0] && carScene.children[0].children[0] && carScene.children[0].children[0].children[0]) {
        let group = carScene.children[0].children[0].children[0];
        if (group.children[0]) group.children[0].rotation.x = t * 2;
        if (group.children[2]) group.children[2].rotation.x = t * 2;
        if (group.children[4]) group.children[4].rotation.x = t * 2;
        if (group.children[6]) group.children[6].rotation.x = t * 2;
      }
      
      // Hover bounce effect
      if (hovered) {
        carRef.current.position.y = Math.sin(t * 6) * 0.02;
        carRef.current.rotation.y = Math.sin(t * 4) * 0.05;
      } else {
        carRef.current.position.y = 0;
        carRef.current.rotation.y = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <group 
        ref={carRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick && onClick(project)}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Car headlights */}
      {hovered && (
        <>
          <pointLight 
            position={[0.3, 0.2, 0.5]}
            color="#ffffff"
            intensity={1.5}
            distance={3}
            decay={2}
          />
          <pointLight 
            position={[-0.3, 0.2, 0.5]}
            color="#ffffff"
            intensity={1.5}
            distance={3}
            decay={2}
          />
        </>
      )}
      
      {/* Project label */}
      {hovered && project && (
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {project.title}
        </Text>
      )}
      
      {/* Car underlight for reflections */}
      <pointLight 
        position={[0, -0.1, 0]}
        color={baseColor}
        intensity={hovered ? 1.0 : 0.5}
        distance={6}
        decay={2}
      />
    </group>
  );
} 