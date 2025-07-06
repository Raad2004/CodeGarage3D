import React from 'react'

// This component will render individual car models
const CarModel = ({ project, onClick }) => {
  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={() => onClick(project)}
    >
      <div className="text-white text-center">
        <h3 className="text-lg font-bold mb-2">🚗 {project.name}</h3>
        <div 
          className="w-16 h-16 mx-auto rounded-full mb-2"
          style={{ backgroundColor: project.color }}
        ></div>
        <p className="text-gray-300 text-sm">Click to view project details</p>
      </div>
    </div>
  )
}

export default CarModel 