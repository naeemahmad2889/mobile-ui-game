import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mic, Sparkles, RotateCcw } from 'lucide-react'

const InputBar = ({ 
  onSubmit, 
  onReset, 
  isLoading = false,
  placeholder = "Try: 'Make the background blue' or 'Increase text size'"
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSubmit(inputValue.trim())
      setInputValue('')
    }
  }

  const handleReset = () => {
    if (onReset && !isLoading) {
      onReset()
      setInputValue('')
    }
  }

  return (
    <motion.div 
      className="sticky bottom-0 bg-white border-t border-gray-100 p-4 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Input Field */}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary-500" />
              </motion.div>
            ) : (
              <Mic className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2"
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-4 h-4" />
            <span>{isLoading ? 'Processing...' : 'Apply Change'}</span>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center"
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Quick Action Suggestions */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            "sunset theme",
            "make it elegant", 
            "ocean colors",
            "professional look",
            "dark mode"
          ].map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setInputValue(suggestion)}
              disabled={isLoading}
              className="px-3 py-1 bg-primary-50 hover:bg-primary-100 disabled:bg-gray-100 disabled:text-gray-400 text-primary-700 text-xs rounded-full transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      </form>

      {/* Status Bar */}
      <motion.div 
        className="flex items-center justify-between mt-3 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Ready for AI commands</span>
        </span>
        <span>Just Input and See the Magic</span>
      </motion.div>
    </motion.div>
  )
}

export default InputBar