import React from 'react'

// This component will render individual car models
const CarModel = ({ project, onClick }) => {
  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={() => onClick(project)}
      style={{
        backgroundColor: '#1f2937',
        padding: '1rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease-in-out',
        border: '1px solid #374151'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#374151';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#1f2937';
      }}
    >
      <div className="text-white text-center" style={{ color: '#ffffff' }}>
        <h3 className="text-lg font-bold mb-2" style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffffff' }}>
          🚗 {project.name}
        </h3>
        <div 
          className="w-16 h-16 mx-auto rounded-full mb-2"
          style={{ 
            backgroundColor: project.color,
            width: '4rem',
            height: '4rem',
            margin: '0 auto',
            borderRadius: '50%',
            marginBottom: '0.5rem'
          }}
        ></div>
        <p className="text-gray-300 text-sm" style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
          Click to view project details
        </p>
      </div>
    </div>
  )
}

export default CarModel 