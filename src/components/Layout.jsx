import React from 'react'
import { motion } from 'framer-motion'

const Layout = ({ 
  children, 
  backgroundColor = "from-blue-50 to-indigo-100",
  theme = "light" 
}) => {
  const bgClass = theme === 'dark' 
    ? 'from-gray-900 to-gray-800' 
    : backgroundColor

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} transition-all duration-500 p-4`}>
      {/* Mobile Container with smooth transitions */}
      <motion.div 
        className={`mobile-container transition-all duration-500 ${
          theme === 'dark' ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-2xl'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        layout
      >
        {children}
      </motion.div>
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-8 -left-8 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

export default Layout