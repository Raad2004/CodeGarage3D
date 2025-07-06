import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, MeshReflectorMaterial, Environment } from '@react-three/drei'
import { projects } from '../data/projects'

// Simple Test Box Component
const TestBox = ({ position, color }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Enhanced Car Component with better materials
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
          envMapIntensity={0.8}
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
          envMapIntensity={0.8}
        />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0, 1.1, 0.9]}>
        <boxGeometry args={[1.8, 0.5, 0.1]} />
        <meshStandardMaterial 
          color="#001122"
          metalness={0.1}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[0, 1.1, -0.9]}>
        <boxGeometry args={[1.8, 0.5, 0.1]} />
        <meshStandardMaterial 
          color="#001122"
          metalness={0.1}
          roughness={0.1}
          transparent
          opacity={0.7}
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
            intensity={0.5}
            distance={6}
            decay={2}
          />
          <pointLight 
            position={[0.8, 0.5, 1.5]}
            color="#ffffff"
            intensity={0.5}
            distance={6}
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
        font-weight="bold"
      >
        {project.name}
      </Text>
      
      {/* Subtle car underlight for reflection effect */}
      <pointLight 
        position={[0, -0.2, 0]}
        color={color}
        intensity={0.2}
        distance={3}
        decay={2}
      />
    </group>
  )
}

// Professional Garage Environment with Reflective Floor
const GarageEnvironment = () => {
  return (
    <group>
      {/* Reflective Floor - The Star of the Show! */}
      <mesh position={[0, -0.51, 0]} receiveShadow>
        <boxGeometry args={[25, 0.02, 15]} />
        <MeshReflectorMaterial
          blur={[300, 30]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#202020"
          metalness={0.8}
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
      
      {/* Garage Light Fixtures */}
      <mesh position={[-6, 7.8, 0]}>
        <boxGeometry args={[3, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#f0f0f0" 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[6, 7.8, 0]}>
        <boxGeometry args={[3, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#f0f0f0" 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, 7.8, -3]}>
        <boxGeometry args={[3, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#f0f0f0" 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

// Main Garage Scene Component
const GarageScene = ({ onCarClick }) => {
  const [testMode, setTestMode] = useState(false)
  const [sceneMode, setSceneMode] = useState('garage')

  if (testMode) {
    return (
      <div className="w-full h-full bg-gray-900 relative">
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => setTestMode(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Switch to Garage
          </button>
        </div>
        
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          
          <TestBox position={[-2, 0, 0]} color="red" />
          <TestBox position={[0, 0, 0]} color="green" />
          <TestBox position={[2, 0, 0]} color="blue" />
          
          <OrbitControls />
        </Canvas>
        
        <div className="absolute bottom-4 left-4 text-white">
          <p>Test Mode: Spinning cubes to verify Three.js is working</p>
        </div>
      </div>
    )
  }

  // Professional Garage Scene
  return (
    <div className="w-full h-full bg-gray-900 relative">
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => setTestMode(true)}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Test Mode
        </button>
        <button 
          onClick={() => setSceneMode(sceneMode === 'simple' ? 'garage' : 'simple')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {sceneMode === 'simple' ? 'Showroom Mode' : 'Simple Mode'}
        </button>
      </div>
      
      <Canvas
        camera={{ position: [0, 6, 12], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)' }}
        shadows
      >
        {/* Professional Lighting Setup */}
        <ambientLight intensity={0.25} color="#404080" />
        
        {/* Main directional light */}
        <directionalLight 
          position={[10, 12, 8]} 
          intensity={0.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={30}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        
        {/* Ceiling spot lights */}
        <spotLight 
          position={[-6, 7.5, 0]} 
          intensity={1.2}
          angle={0.6}
          penumbra={0.5}
          color="#f8f8ff"
          castShadow
        />
        <spotLight 
          position={[6, 7.5, 0]} 
          intensity={1.2}
          angle={0.6}
          penumbra={0.5}
          color="#f8f8ff"
          castShadow
        />
        <spotLight 
          position={[0, 7.5, -3]} 
          intensity={1.0}
          angle={0.8}
          penumbra={0.5}
          color="#f8f8ff"
        />
        
        {/* Fill light */}
        <pointLight 
          position={[0, 6, 6]} 
          intensity={0.3}
          color="#6080ff"
          distance={20}
        />
        
        {/* Environment for reflections */}
        <Environment preset="warehouse" />
        
        {/* Environment */}
        {sceneMode === 'garage' && <GarageEnvironment />}
        
        {/* Cars */}
        {sceneMode === 'simple' ? (
          // Simple boxes
          <>
            <mesh position={[-4, 0, -2]} onClick={() => onCarClick(projects[0])}>
              <boxGeometry args={[3, 1, 2]} />
              <meshStandardMaterial color={projects[0].color} />
            </mesh>
            <mesh position={[0, 0, -2]} onClick={() => onCarClick(projects[1])}>
              <boxGeometry args={[3, 1, 2]} />
              <meshStandardMaterial color={projects[1].color} />
            </mesh>
            <mesh position={[4, 0, -2]} onClick={() => onCarClick(projects[2])}>
              <boxGeometry args={[3, 1, 2]} />
              <meshStandardMaterial color={projects[2].color} />
            </mesh>
          </>
        ) : (
          // Enhanced car models
          <>
            <SimpleCar 
              position={[-4, 0, -2]} 
              color={projects[0].color} 
              project={projects[0]} 
              onClick={onCarClick} 
            />
            <SimpleCar 
              position={[0, 0, -2]} 
              color={projects[1].color} 
              project={projects[1]} 
              onClick={onCarClick} 
            />
            <SimpleCar 
              position={[4, 0, -2]} 
              color={projects[2].color} 
              project={projects[2]} 
              onClick={onCarClick} 
            />
          </>
        )}
        
        <OrbitControls 
          maxPolarAngle={Math.PI / 2}
          minDistance={4}
          maxDistance={25}
          enablePan={true}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white">
        <p>🏎️ {sceneMode === 'garage' ? 'Professional Showroom' : 'Simple Scene'} - Click cars to view projects</p>
        <p>🪞 Notice the stunning floor reflections!</p>
        <p>🖱️ Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}

export default GarageScene 