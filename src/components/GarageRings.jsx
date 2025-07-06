import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

export function GarageRings({ visible = true, intensity = 0.5 }) {
  const itemsRef = useRef([]);

  useFrame((state) => {
    if (!visible) return;
    
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      if (!mesh) continue;
      
      let z = (i - 5) * 2.5 + ((elapsed * 0.2) % 2.5) * 1.5; // Slower, shorter rings
      let dist = Math.abs(z);
      mesh.position.set(0, 0, -z);
      mesh.scale.set(1 - dist * 0.03, 1 - dist * 0.03, 1 - dist * 0.03);

      let colorScale = intensity;
      if (dist > 1.5) {
        colorScale = intensity * (1 - (Math.min(dist, 8) - 1.5) / 6.5);
      }

      if (i % 2 === 1) {
        mesh.material.emissive = new Color(2, 0.1, 0.4).multiplyScalar(colorScale); // Pink
      } else {
        mesh.material.emissive = new Color(0.05, 0.4, 2).multiplyScalar(colorScale); // Blue
      }
    }
  });

  if (!visible) return null;

  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <torusGeometry args={[2.5, 0.03, 16, 100]} />
          <meshStandardMaterial emissive={[1, 0.05, 0.2]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  );
} 