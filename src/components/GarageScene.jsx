import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, MeshReflectorMaterial, Environment, CubeCamera, PerspectiveCamera } from '@react-three/drei'
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration,
  DepthOfField 
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { projects } from '../data/projects'
import { RealisticCar } from './RealisticCar'
import { EnhancedGround } from './EnhancedGround'
import { FloatingGrid } from './FloatingGrid'
import { GarageRings } from './GarageRings'
import { ParticleEffects } from './ParticleEffects'

// Enhanced Car Component
const SimpleCar = ({ position, color, project, onClick }) => {
  const [hovered, setHovered] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    onClick(project)
  }

  return (
    <group 
      position={position} 
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[3, 0.8, 1.8]} />
        <meshStandardMaterial 
          color={hovered ? color : color} 
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.15 : 0}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 1.6]} />
        <meshStandardMaterial 
          color={color}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.1 : 0}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0, 1.1, 0.8]}>
        <boxGeometry args={[1.8, 0.4, 0.05]} />
        <meshStandardMaterial 
          color="#003366"
          transparent
          opacity={0.7}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 1.1, -0.8]}>
        <boxGeometry args={[1.8, 0.4, 0.05]} />
        <meshStandardMaterial 
          color="#003366"
          transparent
          opacity={0.7}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      
      {/* Wheels with rims */}
      <mesh position={[-1.2, 0, 1]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial 
          color="#111" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-1.2, 0, 1]}>
        <cylinderGeometry args={[0.2, 0.2, 0.25, 8]} />
        <meshStandardMaterial 
          color="#666" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <mesh position={[1.2, 0, 1]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial 
          color="#111" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[1.2, 0, 1]}>
        <cylinderGeometry args={[0.2, 0.2, 0.25, 8]} />
        <meshStandardMaterial 
          color="#666" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <mesh position={[-1.2, 0, -1]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial 
          color="#111" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-1.2, 0, -1]}>
        <cylinderGeometry args={[0.2, 0.2, 0.25, 8]} />
        <meshStandardMaterial 
          color="#666" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <mesh position={[1.2, 0, -1]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial 
          color="#111" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[1.2, 0, -1]}>
        <cylinderGeometry args={[0.2, 0.2, 0.25, 8]} />
        <meshStandardMaterial 
          color="#666" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Enhanced Headlights */}
      <mesh position={[-0.8, 0.5, 0.95]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#e8e8e8"} 
          emissive={hovered ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.8, 0.5, 0.95]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#e8e8e8"} 
          emissive={hovered ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Headlight glow effect when hovered */}
      {hovered && (
        <>
          <pointLight 
            position={[-0.8, 0.5, 1.5]}
            color="#ffffff"
            intensity={0.6}
            distance={8}
            decay={2}
          />
          <pointLight 
            position={[0.8, 0.5, 1.5]}
            color="#ffffff"
            intensity={0.6}
            distance={8}
            decay={2}
          />
        </>
      )}
      
      {/* Project Label */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.35}
        color={hovered ? "#ffff00" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        {project.name}
      </Text>
      
      {/* Subtle car underlight for reflection */}
      <pointLight 
        position={[0, -0.1, 0]}
        color={color}
        intensity={0.6}
        distance={5}
        decay={2}
      />
      
      {/* Additional car showcase lighting */}
      <pointLight 
        position={[0, 3, 2]}
        color="#ffffff"
        intensity={0.4}
        distance={6}
        decay={2}
      />
    </group>
  )
}

// Animated Garage Door Component
const AnimatedGarageDoor = ({ isOpen, onToggle }) => {
  const doorGroupRef = useRef()
  
  // Animate door movement
  useFrame(() => {
    if (doorGroupRef.current) {
      const targetY = isOpen ? 6.5 : 0
      const currentY = doorGroupRef.current.position.y
      const diff = targetY - currentY
      
      // Smooth animation
      if (Math.abs(diff) > 0.02) {
        doorGroupRef.current.position.y += diff * 0.06
      }
    }
  })

  return (
    <group>
      {/* Main Door Group - Everything moves together */}
      <group ref={doorGroupRef} position={[0, 0, 0]}>
        {/* Main Garage Door */}
        <mesh 
          position={[0, 3, 7.4]} 
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default'
          }}
        >
          <boxGeometry args={[20, 6, 0.3]} />
          <meshStandardMaterial 
            color="#4a5568"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Door Panels (for realism) */}
        <mesh position={[0, 1, 7.35]}>
          <boxGeometry args={[18, 1, 0.1]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0, 2.5, 7.35]}>
          <boxGeometry args={[18, 1, 0.1]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0, 4, 7.35]}>
          <boxGeometry args={[18, 1, 0.1]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        <mesh position={[0, 5.5, 7.35]}>
          <boxGeometry args={[18, 1, 0.1]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
        
        {/* Door Handle */}
        <mesh position={[8, 2.5, 7.2]}>
          <boxGeometry args={[0.3, 0.1, 0.1]} />
          <meshStandardMaterial 
            color="#ffd700"
            metalness={0.9}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Door Window */}
        <mesh position={[0, 4.5, 7.3]}>
          <boxGeometry args={[8, 0.8, 0.05]} />
          <meshStandardMaterial 
            color="#001122"
            transparent
            opacity={0.3}
            metalness={0.1}
            roughness={0.1}
          />
        </mesh>
      </group>
      
      {/* Door Tracks (static) */}
      <mesh position={[-10.5, 3, 7.5]}>
        <boxGeometry args={[0.2, 6, 0.2]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      <mesh position={[10.5, 3, 7.5]}>
        <boxGeometry args={[0.2, 6, 0.2]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      
      {/* Door frame */}
      <mesh position={[0, 6.5, 7.6]}>
        <boxGeometry args={[21, 0.3, 0.4]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
    </group>
  )
}

// Professional Garage Environment with Reflective Floor
const GarageEnvironment = ({ doorOpen, onDoorToggle }) => {
  return (
    <group>
      {/* Reflective Floor */}
      <mesh position={[0, -0.51, 0]} receiveShadow>
        <boxGeometry args={[25, 0.02, 15]} />
        <MeshReflectorMaterial
          blur={[200, 50]}
          resolution={1024}
          mixBlur={0.8}
          mixStrength={40}
          roughness={0.8}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#202020"
          metalness={0.7}
        />
      </mesh>
      
      {/* Floor Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[25, 0.1, 15]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 4, -7.5]}>
        <boxGeometry args={[25, 8, 0.2]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* Side Walls */}
      <mesh position={[-12.5, 4, 0]}>
        <boxGeometry args={[0.2, 8, 15]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      <mesh position={[12.5, 4, 0]}>
        <boxGeometry args={[0.2, 8, 15]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[25, 0.2, 15]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* Ceiling Light Fixtures */}
      <mesh position={[-6, 7.8, 0]}>
        <boxGeometry args={[3, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[6, 7.8, 0]}>
        <boxGeometry args={[3, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0, 7.8, -3]}>
        <boxGeometry args={[3, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Animated Garage Door */}
      <AnimatedGarageDoor isOpen={doorOpen} onToggle={onDoorToggle} />
    </group>
  )
}

function GarageShow({ garageDoorOpen, onCarClick }) {
  const [effectsEnabled, setEffectsEnabled] = useState(true)
  const [particlesEnabled, setParticlesEnabled] = useState(true)
  const [ringsEnabled, setRingsEnabled] = useState(true)
  
  return (
    <>
      <OrbitControls 
        target={[0, 0.5, 0]}
        maxPolarAngle={Math.PI / 2}
        minDistance={4}
        maxDistance={30}
        enablePan={true}
      />

      <PerspectiveCamera makeDefault fov={65} position={[0, 8, 15]} />

      <color args={[0.05, 0.05, 0.1]} attach="background" />

      {/* Environment mapping for realistic reflections */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <Environment map={texture} />
        )}
      </CubeCamera>

      {/* Enhanced Lighting System */}
      <ambientLight intensity={0.3} color="#4080ff" />
      
      {/* Cinematic colored spotlights */}
      <spotLight
        color={[1, 0.25, 0.7]} // Pink
        intensity={2.5}
        angle={0.8}
        penumbra={0.5}
        position={[8, 7, 2]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]} // Blue
        intensity={2.5}
        angle={0.8}
        penumbra={0.5}
        position={[-8, 7, 2]}
        castShadow
        shadow-bias={-0.0001}
      />
      
      {/* Main garage ceiling lights */}
      <spotLight 
        position={[0, 8, -1]} 
        intensity={1.8}
        angle={0.9}
        penumbra={0.3}
        color="#ffffff"
        castShadow
        target-position={[0, 0, -2]}
      />
      
      {/* Outdoor daylight when door is open */}
      {garageDoorOpen && (
        <directionalLight 
          position={[0, 12, 18]} 
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      )}

      {/* Garage Environment */}
      <GarageEnvironment doorOpen={garageDoorOpen} />
      
      {/* Enhanced Ground with texture mapping */}
      <EnhancedGround />
      
      {/* Realistic Car Models */}
      <RealisticCar 
        position={[-4, 0, -2]} 
        project={projects[0]} 
        onClick={onCarClick}
        baseColor={projects[0].color}
      />
      <RealisticCar 
        position={[0, 0, -2]} 
        project={projects[1]} 
        onClick={onCarClick}
        baseColor={projects[1].color}
      />
      <RealisticCar 
        position={[4, 0, -2]} 
        project={projects[2]} 
        onClick={onCarClick}
        baseColor={projects[2].color}
      />
      
      {/* Visual Effects */}
      <FloatingGrid visible={effectsEnabled} />
      <GarageRings visible={ringsEnabled} intensity={0.3} />
      <ParticleEffects visible={particlesEnabled} count={20} />
      
      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.8}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0003, 0.0008]}
        />
        {/* Uncomment for depth of field effect */}
        {/* <DepthOfField focusDistance={0.004} focalLength={0.02} bokehScale={2} height={480} /> */}
      </EffectComposer>
    </>
  )
}

export function GarageScene({ onCarClick }) {
  const [garageDoorOpen, setGarageDoorOpen] = useState(false)

  const handleDoorToggle = () => {
    setGarageDoorOpen(!garageDoorOpen)
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
        <div className="bg-black bg-opacity-50 rounded-lg p-4">
          <button 
            onClick={handleDoorToggle}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            🏠 {garageDoorOpen ? 'CLOSE GARAGE' : 'OPEN GARAGE'}
          </button>
        </div>
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-xl">Loading garage...</div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 6, 12], fov: 75 }}
          style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}
          shadows
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          }}
        >
          <GarageShow garageDoorOpen={garageDoorOpen} onCarClick={onCarClick} />
        </Canvas>
      </Suspense>
    </div>
  )
} 