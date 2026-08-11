import React from 'react'
import { motion } from 'framer-motion'

const Header = ({ 
  title = "Mobile UI Playground",
  subtitle = "Transform UI with natural language",
  backgroundColor = "from-primary-500 to-primary-600",
  textSize = "text-2xl"
}) => {
  return (
    <motion.header 
      className={`bg-gradient-to-r ${backgroundColor} text-white p-6 text-center relative overflow-hidden`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <motion.h1 
          className={`${textSize} font-bold mb-2 transition-all duration-500`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-white/90 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-primary-600 to-primary-700 transform -skew-y-1"></div>
    </motion.header>
  )
}

export default Header