import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, RotateCcw, History, Undo, Redo, Sparkles, Upload, Download, Shuffle } from 'lucide-react'

const EnhancedInputBar = ({ 
  onSubmit, 
  onReset, 
  onUndo,
  onRedo,
  onExport,
  onImport,
  onRandomize,
  isLoading = false,
  canUndo = false,
  canRedo = false,
  recentCommands = [],
  placeholder = "Try: 'sunset theme', 'professional look', 'ocean vibes'"
}) => {
  const [inputValue, setInputValue] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSubmit(inputValue.trim())
      setInputValue('')
      setShowHistory(false)
    }
  }

  const handleReset = () => {
    if (onReset && !isLoading) {
      onReset()
      setInputValue('')
    }
  }

  const handleUndo = () => {
    if (onUndo && canUndo && !isLoading) {
      onUndo()
    }
  }

  const handleRedo = () => {
    if (onRedo && canRedo && !isLoading) {
      onRedo()
    }
  }

  const handleCommandSelect = (command) => {
    setInputValue(command)
    setShowHistory(false)
  }

  const handleFileImport = (e) => {
    const file = e.target.files[0]
    if (file && onImport) {
      onImport(file)
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            if (e.shiftKey) {
              e.preventDefault()
              handleRedo()
            } else {
              e.preventDefault()
              handleUndo()
            }
            break
          case 'r':
            e.preventDefault()
            handleReset()
            break
          case 'h':
            e.preventDefault()
            setShowHistory(!showHistory)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canUndo, canRedo, showHistory])

  return (
    <motion.div 
      className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {/* Command History Dropdown */}
      <AnimatePresence>
        {showHistory && recentCommands.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-100 bg-white/90"
          >
            <div className="px-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-medium text-gray-600 flex items-center">
                  <History className="w-3 h-3 mr-1" />
                  Recent Commands
                </h4>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Close
                </button>
              </div>
              <div className="space-y-1">
                {recentCommands.map((command, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleCommandSelect(command)}
                    className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    "{command}"
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Section */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm bg-gray-50 focus:bg-white disabled:opacity-50"
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

          {/* Action Buttons Row 1 */}
          <div className="flex space-x-2">
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
              onClick={handleUndo}
              disabled={!canUndo || isLoading}
              className="px-4 py-3 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-blue-700 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center"
              whileTap={{ scale: 0.98 }}
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </motion.button>

            <motion.button
              type="button"
              onClick={handleRedo}
              disabled={!canRedo || isLoading}
              className="px-4 py-3 bg-green-100 hover:bg-green-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-green-700 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center"
              whileTap={{ scale: 0.98 }}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo className="w-4 h-4" />
            </motion.button>

            <motion.button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center"
              whileTap={{ scale: 0.98 }}
              title="Reset (Ctrl+R)"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Action Buttons Row 2 - Advanced Features */}
          <div className="flex space-x-2">
            <motion.button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              disabled={recentCommands.length === 0}
              className="flex-1 bg-purple-100 hover:bg-purple-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-purple-700 py-2 px-3 rounded-lg text-xs transition-all duration-200 flex items-center justify-center space-x-1"
              whileTap={{ scale: 0.98 }}
              title="Show History (Ctrl+H)"
            >
              <History className="w-3 h-3" />
              <span>History</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={onExport}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 px-3 rounded-lg text-xs transition-all duration-200 flex items-center justify-center space-x-1"
              whileTap={{ scale: 0.98 }}
              title="Export Configuration"
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-teal-100 hover:bg-teal-200 text-teal-700 py-2 px-3 rounded-lg text-xs transition-all duration-200 flex items-center justify-center space-x-1"
              whileTap={{ scale: 0.98 }}
              title="Import Configuration"
            >
              <Upload className="w-3 h-3" />
              <span>Import</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={onRandomize}
              className="bg-pink-100 hover:bg-pink-200 text-pink-700 py-2 px-3 rounded-lg text-xs transition-all duration-200 flex items-center justify-center space-x-1"
              whileTap={{ scale: 0.98 }}
              title="Random Theme"
            >
              <Shuffle className="w-3 h-3" />
              <span>Random</span>
            </motion.button>
          </div>

          {/* Quick Suggestions */}
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              "sunset theme",
              "professional look", 
              "ocean vibes",
              "dark theme",
              "elegant design"
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

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileImport}
          className="hidden"
        />

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
          <span>Just Prompt & See the Magic!</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default EnhancedInputBar