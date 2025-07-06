import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Particle({ color = "#ffffff", size = 0.02 }) {
  const mesh = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [velocity] = useState(() => new Vector3(
    (Math.random() - 0.5) * 0.1,
    Math.random() * 0.05 + 0.02,
    (Math.random() - 0.5) * 0.1
  ));

  function getInitialPosition() {
    return new Vector3(
      (Math.random() - 0.5) * 15,
      Math.random() * 2 + 0.5,
      (Math.random() - 0.5) * 15
    );
  }

  function resetPosition() {
    setPosition(new Vector3(
      (Math.random() - 0.5) * 15,
      0.1,
      (Math.random() - 0.5) * 15
    ));
  }

  useFrame((state, delta) => {
    time.current += delta;
    
    let newY = position.y + velocity.y * delta;
    let newX = position.x + velocity.x * delta + Math.sin(time.current) * 0.02;
    let newZ = position.z + velocity.z * delta;

    if (newY > 8) {
      resetPosition();
      time.current = 0;
    } else {
      setPosition(new Vector3(newX, newY, newZ));
    }

    if (mesh.current) {
      mesh.current.position.set(position.x, position.y, position.z);
      mesh.current.rotation.x += delta * 0.5;
      mesh.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={mesh} scale={size}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  );
}

export function ParticleEffects({ visible = true, count = 30 }) {
  const [particles] = useState(() => {
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        color: i % 3 === 0 ? "#ffffff" : (i % 3 === 1 ? "#ffd700" : "#87ceeb"),
        size: Math.random() * 0.02 + 0.01
      });
    }
    return arr;
  });

  if (!visible) return null;

  return (
    <group>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          color={particle.color}
          size={particle.size}
        />
      ))}
    </group>
  );
} 