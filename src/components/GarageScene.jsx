import React from 'react'

// This will be the main 3D scene component
const GarageScene = () => {
  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">🏢 3D Garage Scene</h2>
        <p className="text-gray-300">
          This is where the Three.js 3D scene will be rendered
        </p>
      </div>
    </div>
  )
}

export default GarageScene 