import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function EnhancedGround() {
  const [roughness, normal] = useLoader(TextureLoader, [
    "/textures/terrain-roughness.jpg",
    "/textures/terrain-normal.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(8, 8); // Increased repeat for garage floor
      t.offset.set(0, 0);
    });

    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  useFrame((state) => {
    let t = -state.clock.getElapsedTime() * 0.05; // Slower movement for garage
    roughness.offset.set(0, t % 1);
    normal.offset.set(0, t % 1);
  });

  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow position={[0, -0.01, 0]}>
      <planeGeometry args={[40, 40]} />
      <MeshReflectorMaterial
        envMapIntensity={0.1}
        normalMap={normal}
        normalScale={[0.1, 0.1]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.02, 0.02, 0.02]} // Darker for garage floor
        roughness={0.5}
        blur={[800, 400]} // Blur ground reflections
        mixBlur={25} // How much blur mixes with surface roughness
        mixStrength={120} // Strength of the reflections (increased for garage)
        mixContrast={1.2} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation
        depthToBlurRatioBias={0.25} // Bias factor for depth texture
        debug={0}
        reflectorOffset={0.15} // Offset the virtual camera for reflections
      />
    </mesh>
  );
} 