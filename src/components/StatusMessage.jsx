import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const StatusMessage = ({ message, type = 'success', isVisible }) => {
  if (!message || !isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Info className="w-4 h-4 text-blue-600" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return "bg-green-50 border-green-200 text-green-800"
      case 'error':
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`mx-4 mb-4 p-3 rounded-lg border flex items-center space-x-2 ${getStyles()}`}
      >
        {getIcon()}
        <span className="text-sm font-medium">{message}</span>
      </motion.div>
    </AnimatePresence>
  )
}

export default StatusMessage