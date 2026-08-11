import { useState, useCallback, useEffect } from 'react'
import { useCommandHistory } from './useCommandHistory'
import { useConfigExport } from './useConfigExport'

// Initial UI state
const initialState = {
  backgroundColor: "from-blue-50 to-indigo-100",
  headerBackground: "from-primary-500 to-primary-600", 
  textSize: "text-base",
  cardColor: "bg-white",
  textColor: "text-gray-800",
  theme: "light"
}

// Enhanced UI state hook with history, export, and advanced features
export const useEnhancedUIState = () => {
  const [uiState, setUiState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastMessage, setLastMessage] = useState("")
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  
  // Command history functionality
  const {
    addCommand,
    undo,
    redo,
    canUndo,
    canRedo,
    getRecentCommands,
    clearHistory,
    historyCount
  } = useCommandHistory()
  
  // Configuration export/import functionality
  const {
    exportConfig,
    importConfig,
    shareConfig,
    loadFromUrl,
    generateRandomConfig,
    isExporting,
    isImporting
  } = useConfigExport()

  // Load configuration from URL on mount
  useEffect(() => {
    const urlConfig = loadFromUrl()
    if (urlConfig.success) {
      setUiState(urlConfig.uiState)
      setLastMessage(urlConfig.message)
    }
  }, [])

  // Update UI state with new properties
  const updateUI = useCallback(async (updates) => {
    setIsProcessing(true)
    
    // Simulate processing time for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setUiState(prevState => ({
      ...prevState,
      ...updates
    }))
    
    setIsProcessing(false)
  }, [])

  // Reset UI to initial state
  const resetUI = useCallback(async () => {
    setIsProcessing(true)
    setLastMessage("Reset to initial state")
    
    // Smooth reset animation
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setUiState(initialState)
    clearHistory()
    setIsProcessing(false)
    setShowSuccessAnimation(true)
  }, [clearHistory])

  // Apply changes from prompt response with history tracking
  const applyChanges = useCallback(async (response, originalPrompt = "") => {
    setIsProcessing(true)
    
    if (response.success) {
      const previousState = { ...uiState }
      
      // Extract only the UI-related properties
      const {
        backgroundColor,
        headerBackground,
        textSize,
        cardColor,
        textColor,
        theme
      } = response
      
      const updates = {}
      if (backgroundColor) updates.backgroundColor = backgroundColor
      if (headerBackground) updates.headerBackground = headerBackground
      if (textSize) updates.textSize = textSize
      if (cardColor) updates.cardColor = cardColor
      if (textColor) updates.textColor = textColor
      if (theme) updates.theme = theme
      
      await updateUI(updates)
      setLastMessage(response.message)
      
      // Add to command history
      if (originalPrompt) {
        addCommand(originalPrompt, previousState, response)
      }
      
      setShowSuccessAnimation(true)
    } else {
      setLastMessage(response.message)
      setIsProcessing(false)
    }
  }, [uiState, updateUI, addCommand])

  // Undo last command
  const handleUndo = useCallback(async () => {
    const undoResult = undo()
    if (undoResult.success) {
      setIsProcessing(true)
      setUiState(undoResult.state)
      setLastMessage(undoResult.message)
      setIsProcessing(false)
      setShowSuccessAnimation(true)
    } else {
      setLastMessage(undoResult.message)
    }
  }, [undo])

  // Redo next command
  const handleRedo = useCallback(async () => {
    const redoResult = redo()
    if (redoResult.success) {
      await applyChanges(redoResult.result, "")
      setLastMessage(redoResult.message)
    } else {
      setLastMessage(redoResult.message)
    }
  }, [redo, applyChanges])

  // Export current configuration
  const handleExport = useCallback(async () => {
    const recentCommands = getRecentCommands(10)
    const result = await exportConfig(uiState, recentCommands)
    setLastMessage(result.message)
    if (result.success) {
      setShowSuccessAnimation(true)
    }
  }, [exportConfig, uiState, getRecentCommands])

  // Import configuration from file
  const handleImport = useCallback(async (file) => {
    const result = await importConfig(file)
    setLastMessage(result.message)
    
    if (result.success) {
      setUiState(result.uiState)
      setShowSuccessAnimation(true)
      
      // Optionally restore command history
      if (result.history && result.history.length > 0) {
        // Note: This would require extending the history hook
        console.log('Imported history:', result.history)
      }
    }
  }, [importConfig])

  // Generate and apply random configuration
  const handleRandomize = useCallback(async () => {
    setIsProcessing(true)
    setLastMessage("Generating random theme...")
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const randomConfig = generateRandomConfig()
    await updateUI(randomConfig)
    
    setLastMessage("Applied random theme!")
    setShowSuccessAnimation(true)
  }, [updateUI, generateRandomConfig])

  // Share current configuration
  const handleShare = useCallback(() => {
    const shareResult = shareConfig(uiState)
    setLastMessage(shareResult.message)
    
    if (shareResult.success) {
      // Copy to clipboard
      navigator.clipboard.writeText(shareResult.url).then(() => {
        setLastMessage("Share URL copied to clipboard!")
        setShowSuccessAnimation(true)
      }).catch(() => {
        setLastMessage("Share URL: " + shareResult.shortUrl)
      })
    }
  }, [shareConfig, uiState])

  // Advanced state queries
  const getStateInfo = useCallback(() => ({
    currentState: uiState,
    isProcessing: isProcessing || isExporting || isImporting,
    lastMessage,
    isInitialState: JSON.stringify(uiState) === JSON.stringify(initialState),
    historyCount,
    canUndo,
    canRedo,
    recentCommands: getRecentCommands(5)
  }), [
    uiState, 
    isProcessing, 
    isExporting, 
    isImporting, 
    lastMessage, 
    historyCount, 
    canUndo, 
    canRedo, 
    getRecentCommands
  ])

  // Performance optimization - memoized state comparison
  const hasStateChanged = useCallback((newState) => {
    return JSON.stringify(uiState) !== JSON.stringify(newState)
  }, [uiState])

  // Batch state updates for better performance
  const batchUpdateUI = useCallback(async (updateFunctions) => {
    setIsProcessing(true)
    
    let finalState = { ...uiState }
    
    // Apply all updates to the state
    updateFunctions.forEach(updateFn => {
      finalState = { ...finalState, ...updateFn(finalState) }
    })
    
    // Only update if state actually changed
    if (hasStateChanged(finalState)) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUiState(finalState)
      setShowSuccessAnimation(true)
    }
    
    setIsProcessing(false)
  }, [uiState, hasStateChanged])

  return {
    // Core state
    uiState,
    isProcessing: isProcessing || isExporting || isImporting,
    lastMessage,
    showSuccessAnimation,
    setShowSuccessAnimation,
    
    // State management
    updateUI,
    resetUI,
    applyChanges,
    batchUpdateUI,
    
    // History management
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
    historyCount,
    getRecentCommands,
    clearHistory,
    
    // Import/Export
    handleExport,
    handleImport,
    handleShare,
    handleRandomize,
    isExporting,
    isImporting,
    
    // Utilities
    getStateInfo,
    hasStateChanged,
    isInitialState: JSON.stringify(uiState) === JSON.stringify(initialState)
  }
}