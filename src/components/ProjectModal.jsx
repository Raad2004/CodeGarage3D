import React from 'react'

// This component will display project information in a modal
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 mb-4">{project.description}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal 