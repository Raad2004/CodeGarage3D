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

// Safe Car Component with fallbacks
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
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 0.8, 1.8]} />
        <meshStandardMaterial 
          color={hovered ? color : color} 
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.1 : 0}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[2, 0.6, 1.6]} />
        <meshStandardMaterial 
          color={color}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.05 : 0}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Simple Windows */}
      <mesh position={[0, 1.1, 0.8]}>
        <boxGeometry args={[1.8, 0.4, 0.05]} />
        <meshStandardMaterial 
          color="#003366"
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0, 1.1, -0.8]}>
        <boxGeometry args={[1.8, 0.4, 0.05]} />
        <meshStandardMaterial 
          color="#003366"
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.2, 0, 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial 
          color="#222" 
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[1.2, 0, 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial 
          color="#222" 
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-1.2, 0, -1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial 
          color="#222" 
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[1.2, 0, -1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial 
          color="#222" 
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[-0.8, 0.5, 0.95]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#cccccc"} 
          emissive={hovered ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      <mesh position={[0.8, 0.5, 0.95]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#cccccc"} 
          emissive={hovered ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Project Label - Fixed without font-weight */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.35}
        color={hovered ? "#ffff00" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        {project.name}
      </Text>
    </group>
  )
}

// Safe Garage Environment
const GarageEnvironment = ({ enableReflections = false }) => {
  return (
    <group>
      {/* Floor - Reflective or Simple based on performance */}
      {enableReflections ? (
        <mesh position={[0, -0.51, 0]}>
          <boxGeometry args={[25, 0.02, 15]} />
          <MeshReflectorMaterial
            blur={[100, 20]}
            resolution={512}
            mixBlur={0.5}
            mixStrength={20}
            roughness={0.8}
            depthScale={1}
            minDepthThreshold={0.5}
            maxDepthThreshold={1.2}
            color="#333"
            metalness={0.5}
          />
        </mesh>
      ) : (
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[25, 0.1, 15]} />
          <meshStandardMaterial 
            color="#333" 
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      )}
      
      {/* Back Wall */}
      <mesh position={[0, 4, -7.5]}>
        <boxGeometry args={[25, 8, 0.2]} />
        <meshStandardMaterial 
          color="#555" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* Side Walls */}
      <mesh position={[-12.5, 4, 0]}>
        <boxGeometry args={[0.2, 8, 15]} />
        <meshStandardMaterial 
          color="#555" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      <mesh position={[12.5, 4, 0]}>
        <boxGeometry args={[0.2, 8, 15]} />
        <meshStandardMaterial 
          color="#555" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[25, 0.2, 15]} />
        <meshStandardMaterial 
          color="#444" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}

// Main Garage Scene Component with Error Handling
const GarageScene = ({ onCarClick }) => {
  const [testMode, setTestMode] = useState(false)
  const [sceneMode, setSceneMode] = useState('garage')
  const [reflectionsEnabled, setReflectionsEnabled] = useState(false)

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

  // Safe Garage Scene
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
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          {sceneMode === 'simple' ? 'Garage Mode' : 'Simple Mode'}
        </button>
        <button 
          onClick={() => setReflectionsEnabled(!reflectionsEnabled)}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          {reflectionsEnabled ? 'Disable Reflections' : 'Enable Reflections'}
        </button>
      </div>
      
      <Canvas
        camera={{ position: [0, 6, 12], fov: 75 }}
        style={{ background: '#222' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }}
      >
        {/* Safe Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8}
        />
        <pointLight 
          position={[0, 8, 0]} 
          intensity={0.3}
        />
        
        {/* Environment */}
        {sceneMode === 'garage' && <GarageEnvironment enableReflections={reflectionsEnabled} />}
        
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
          // Car models
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
        <p>🏎️ {sceneMode === 'garage' ? 'Garage Scene' : 'Simple Scene'} - Click cars to view projects</p>
        {reflectionsEnabled && <p>🪞 Reflections: ON</p>}
        <p>🖱️ Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}

export default GarageScene 