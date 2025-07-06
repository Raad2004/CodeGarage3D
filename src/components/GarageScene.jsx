import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
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

// Optimized Car Component
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
        />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[2, 0.6, 1.6]} />
        <meshStandardMaterial 
          color={color}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.05 : 0}
        />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.2, 0, 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[1.2, 0, 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[-1.2, 0, -1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[1.2, 0, -1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Simple Headlights */}
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
      
      {/* Project Label */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color={hovered ? "#ffff00" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        {project.name}
      </Text>
    </group>
  )
}

// Simple Garage Environment
const GarageEnvironment = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[25, 0.1, 15]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 4, -7.5]}>
        <boxGeometry args={[25, 8, 0.2]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Side Walls */}
      <mesh position={[-12.5, 4, 0]}>
        <boxGeometry args={[0.2, 8, 15]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[12.5, 4, 0]}>
        <boxGeometry args={[0.2, 8, 15]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[25, 0.2, 15]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  )
}

// Main Garage Scene Component
const GarageScene = ({ onCarClick }) => {
  const [testMode, setTestMode] = useState(false) // Start with garage scene
  const [sceneMode, setSceneMode] = useState('garage') // 'test', 'simple', 'garage'

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

  // Garage Scene
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
          {sceneMode === 'simple' ? 'Garage View' : 'Simple View'}
        </button>
      </div>
      
      <Canvas
        camera={{ position: [0, 6, 12], fov: 75 }}
        style={{ background: '#111' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[0, 6, 0]} intensity={0.3} />
        
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
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white">
        <p>🏎️ {sceneMode === 'garage' ? 'Garage Scene' : 'Simple Scene'} - Click cars to view projects</p>
        <p>🖱️ Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}

export default GarageScene 