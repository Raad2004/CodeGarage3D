import React, { useState } from 'react'
import './App.css'
import GarageScene from './components/GarageScene'
import ProjectModal from './components/ProjectModal'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCarClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="w-full h-screen bg-black">
      {/* Header */}
      <div className="text-white text-center py-4">
        <h1 className="text-3xl font-bold mb-1">🏎️ Car Garage Portfolio</h1>
        <p className="text-lg mb-1">Welcome to my 3D Interactive Portfolio</p>
        <p className="text-gray-400 text-sm">
          Click on any car in the garage to view project details • Use mouse to navigate the 3D scene
        </p>
      </div>

      {/* 3D Garage Scene */}
      <div className="w-full" style={{ height: 'calc(100vh - 140px)' }}>
        <GarageScene onCarClick={handleCarClick} />
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
