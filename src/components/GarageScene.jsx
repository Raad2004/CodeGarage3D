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

// Simple 3D Car Model Component with Headlights and Animations
const SimpleCar = ({ position, color, project, onClick }) => {
  const carRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [bounceOffset, setBounceOffset] = useState(0)
  
  // Animation loop for hover bounce effect
  useFrame((state) => {
    if (hovered && carRef.current) {
      // Smooth bounce animation
      const time = state.clock.getElapsedTime()
      const bounce = Math.sin(time * 8) * 0.1 + 0.1
      setBounceOffset(bounce)
      
      // Apply bounce to car position
      carRef.current.position.y = position[1] + bounce
      
      // Subtle rotation wobble
      carRef.current.rotation.y = Math.sin(time * 4) * 0.02
    } else if (carRef.current) {
      // Return to normal position smoothly
      carRef.current.position.y = position[1]
      carRef.current.rotation.y = 0
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    onClick(project)
  }

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  return (
    <group 
      ref={carRef} 
      position={position} 
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[2.5, 0.8, 1.8]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.5, 0, 1.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[1.5, 0, 1.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-1.5, 0, -1.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[1.5, 0, -1.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[-1.2, 0.6, 1.05]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#e0e0e0"} 
          emissive={hovered ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[1.2, 0.6, 1.05]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#e0e0e0"} 
          emissive={hovered ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Headlight Beams (only visible when hovered) */}
      {hovered && (
        <>
          <pointLight 
            position={[-1.2, 0.6, 1.05]}
            color="#ffffff"
            intensity={0.8}
            distance={8}
            decay={2}
          />
          <pointLight 
            position={[1.2, 0.6, 1.05]}
            color="#ffffff"
            intensity={0.8}
            distance={8}
            decay={2}
          />
          {/* Headlight cones for visual effect */}
          <mesh position={[-1.2, 0.6, 2.5]}>
            <coneGeometry args={[1.5, 3, 8]} />
            <meshStandardMaterial 
              color="#ffffff"
              transparent
              opacity={0.1}
              emissive="#ffffff"
              emissiveIntensity={0.05}
            />
          </mesh>
          <mesh position={[1.2, 0.6, 2.5]}>
            <coneGeometry args={[1.5, 3, 8]} />
            <meshStandardMaterial 
              color="#ffffff"
              transparent
              opacity={0.1}
              emissive="#ffffff"
              emissiveIntensity={0.05}
            />
          </mesh>
        </>
      )}
      
      {/* Car Label with enhanced visibility */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color={hovered ? "#ffff00" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {project.name}
      </Text>
      
      {/* Hover Effect Glow */}
      {hovered && (
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[4.2, 1.2, 2.2]} />
          <meshStandardMaterial 
            color={color}
            transparent
            opacity={0.2}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
      )}
    </group>
  )
}

// Garage Environment Component with enhanced lighting
const GarageEnvironment = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[30, 0.1, 20]} />
        <meshStandardMaterial 
          color="#444" 
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 5, -10]}>
        <boxGeometry args={[30, 10, 0.5]} />
        <meshStandardMaterial 
          color="#666" 
          metalness={0.05}
          roughness={0.95}
        />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-15, 5, 0]}>
        <boxGeometry args={[0.5, 10, 20]} />
        <meshStandardMaterial 
          color="#666" 
          metalness={0.05}
          roughness={0.95}
        />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[15, 5, 0]}>
        <boxGeometry args={[0.5, 10, 20]} />
        <meshStandardMaterial 
          color="#666" 
          metalness={0.05}
          roughness={0.95}
        />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[30, 0.5, 20]} />
        <meshStandardMaterial 
          color="#555" 
          metalness={0.05}
          roughness={0.95}
        />
      </mesh>
      
      {/* Garage Lighting Fixtures */}
      <mesh position={[-5, 9.5, 0]}>
        <boxGeometry args={[2, 0.2, 0.5]} />
        <meshStandardMaterial 
          color="#ddd" 
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[5, 9.5, 0]}>
        <boxGeometry args={[2, 0.2, 0.5]} />
        <meshStandardMaterial 
          color="#ddd" 
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  )
}

// Main Garage Scene Component
const GarageScene = ({ onCarClick }) => {
  const [testMode, setTestMode] = useState(true)

  if (testMode) {
    return (
      <div className="w-full h-full bg-gray-900 relative">
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => setTestMode(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Switch to Full Scene
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
          <p>Test Mode: If you see spinning cubes, Three.js is working!</p>
          <p>Red = {projects[0].name}</p>
          <p>Green = {projects[1].name}</p>
          <p>Blue = {projects[2].name}</p>
        </div>
      </div>
    )
  }

  // Full scene (original complex version)
  return (
    <div className="w-full h-full bg-gray-900 relative">
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => setTestMode(true)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Switch to Test Mode
        </button>
      </div>
      
      <Canvas
        camera={{ position: [0, 8, 15], fov: 75 }}
        style={{ background: '#111' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        
        {/* Simple cars instead of complex ones */}
        <mesh position={[-6, 0, -2]} onClick={() => onCarClick(projects[0])}>
          <boxGeometry args={[4, 1, 2]} />
          <meshStandardMaterial color={projects[0].color} />
        </mesh>
        
        <mesh position={[0, 0, -2]} onClick={() => onCarClick(projects[1])}>
          <boxGeometry args={[4, 1, 2]} />
          <meshStandardMaterial color={projects[1].color} />
        </mesh>
        
        <mesh position={[6, 0, -2]} onClick={() => onCarClick(projects[2])}>
          <boxGeometry args={[4, 1, 2]} />
          <meshStandardMaterial color={projects[2].color} />
        </mesh>
        
        {/* Simple floor */}
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[20, 0.1, 10]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        <OrbitControls />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white">
        <p>Full Scene Mode - Click cars to view projects</p>
      </div>
    </div>
  )
}

export default GarageScene 