import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { projects } from '../data/projects'

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
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 8, 15], fov: 75 }}
        style={{ background: '#111' }}
        shadows
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 8, 0]} intensity={0.3} />
        
        {/* Garage Environment */}
        <GarageEnvironment />
        
        {/* Cars positioned in the garage */}
        <SimpleCar 
          position={[-6, 0, -2]} 
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
          position={[6, 0, -2]} 
          color={projects[2].color} 
          project={projects[2]} 
          onClick={onCarClick} 
        />
        
        {/* Camera Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={25}
        />
      </Canvas>
    </div>
  )
}

export default GarageScene 