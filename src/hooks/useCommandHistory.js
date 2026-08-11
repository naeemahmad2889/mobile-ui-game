import { useState } from 'react'

// Command history hook for undo/redo functionality
export const useCommandHistory = () => {
  const [history, setHistory] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)

  // Add a new command to history
  const addCommand = (command, state, result) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      command: command.trim(),
      previousState: state,
      result,
      source: result.source || 'unknown'
    }

    setHistory(prevHistory => {
      // Remove any entries after current index (when undoing then adding new command)
      const truncatedHistory = prevHistory.slice(0, currentIndex + 1)
      const newHistory = [...truncatedHistory, newEntry]
      
      // Keep only last 10 commands for performance
      return newHistory.slice(-10)
    })

    setCurrentIndex(prevIndex => {
      const newIndex = Math.min(prevIndex + 1, 9) // Max 10 items
      return newIndex
    })
  }

  // Undo last command
  const undo = () => {
    if (currentIndex > 0) {
      const previousEntry = history[currentIndex - 1]
      setCurrentIndex(currentIndex - 1)
      return {
        success: true,
        state: previousEntry.previousState,
        message: `Undid: "${history[currentIndex].command}"`
      }
    }
    return {
      success: false,
      message: "Nothing to undo"
    }
  }

  // Redo next command
  const redo = () => {
    if (currentIndex < history.length - 1) {
      const nextEntry = history[currentIndex + 1]
      setCurrentIndex(currentIndex + 1)
      return {
        success: true,
        result: nextEntry.result,
        message: `Redid: "${nextEntry.command}"`
      }
    }
    return {
      success: false,
      message: "Nothing to redo"
    }
  }

  // Get current command info
  const getCurrentCommand = () => {
    if (currentIndex >= 0 && currentIndex < history.length) {
      return history[currentIndex]
    }
    return null
  }

  // Get history summary for display
  const getHistorySummary = () => {
    return history.map((entry, index) => ({
      ...entry,
      isCurrent: index === currentIndex,
      isActive: index <= currentIndex
    }))
  }

  // Clear all history
  const clearHistory = () => {
    setHistory([])
    setCurrentIndex(-1)
  }

  // Get recent commands for suggestions
  const getRecentCommands = (limit = 5) => {
    return [...new Set(
      history
        .slice(-10) // Last 10 commands
        .map(entry => entry.command)
        .filter(cmd => cmd.length > 2)
    )].slice(-limit)
  }

  return {
    history,
    currentIndex,
    addCommand,
    undo,
    redo,
    getCurrentCommand,
    getHistorySummary,
    clearHistory,
    getRecentCommands,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    historyCount: history.length
  }
}