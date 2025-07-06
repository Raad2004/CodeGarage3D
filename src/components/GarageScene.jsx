import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { projects } from '../data/projects'

// Simple 3D Car Model Component
const SimpleCar = ({ position, color, project, onClick }) => {
  const carRef = useRef()
  
  const handleClick = (e) => {
    e.stopPropagation()
    onClick(project)
  }

  return (
    <group 
      ref={carRef} 
      position={position} 
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'default'
      }}
    >
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2.5, 0.8, 1.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.5, 0, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.5, 0, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1.5, 0, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.5, 0, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Car Label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.name}
      </Text>
    </group>
  )
}

// Garage Environment Component
const GarageEnvironment = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[30, 0.1, 20]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 5, -10]}>
        <boxGeometry args={[30, 10, 0.5]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-15, 5, 0]}>
        <boxGeometry args={[0.5, 10, 20]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[15, 5, 0]}>
        <boxGeometry args={[0.5, 10, 20]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      
      {/* Ceiling */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[30, 0.5, 20]} />
        <meshStandardMaterial color="#555" />
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
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 8, 0]} intensity={0.5} />
        
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