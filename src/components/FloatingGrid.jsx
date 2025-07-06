import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

export function FloatingGrid({ visible = true }) {
  const diffuse = useLoader(TextureLoader, "/textures/grid-texture.png");

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(20, 20); // Smaller repeat for garage
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  useFrame((state) => {
    let t = -state.clock.getElapsedTime() * 0.3; // Slower movement
    diffuse.offset.set(0, t);
  });

  if (!visible) return null;

  return (
    <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.5, 0]}>
      <planeGeometry args={[25, 25]} />
      <meshBasicMaterial
        color={[0.5, 0.8, 1.0]} // Blue tint for garage
        opacity={0.08}
        map={diffuse}
        alphaMap={diffuse}
        transparent={true}
      />
    </mesh>
  );
} 