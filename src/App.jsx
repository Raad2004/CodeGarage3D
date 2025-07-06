import React, { useState } from 'react'
import './App.css'
import GarageScene from './components/GarageScene'
import CarModel from './components/CarModel'
import ProjectModal from './components/ProjectModal'
import { projects } from './data/projects'

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
      <div className="text-white text-center py-8">
        <h1 className="text-4xl font-bold mb-2">🏎️ Car Garage Portfolio</h1>
        <p className="text-xl mb-2">Welcome to my 3D Interactive Portfolio</p>
        <p className="text-gray-400">
          Each car in the garage represents a project I've worked on
        </p>
      </div>

      {/* Main content area */}
      <div className="flex h-5/6">
        {/* Left side - Car list (temporary for testing) */}
        <div className="w-1/3 p-4 bg-gray-800">
          <h2 className="text-white text-xl font-bold mb-4">Projects (Cars)</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <CarModel
                key={project.id}
                project={project}
                onClick={handleCarClick}
              />
            ))}
          </div>
        </div>

        {/* Right side - 3D Scene */}
        <div className="w-2/3">
          <GarageScene />
        </div>
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
