import { useState } from 'react'

// Initial UI state
const initialState = {
  backgroundColor: "from-blue-50 to-indigo-100",
  headerBackground: "from-primary-500 to-primary-600", 
  textSize: "text-base",
  cardColor: "bg-white",
  textColor: "text-gray-800",
  theme: "light"
}

// Custom hook for managing UI state
export const useUIState = () => {
  const [uiState, setUiState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastMessage, setLastMessage] = useState("")

  // Update UI state with new properties
  const updateUI = async (updates) => {
    setIsProcessing(true)
    
    // Simulate processing time for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setUiState(prevState => ({
      ...prevState,
      ...updates
    }))
    
    setIsProcessing(false)
  }

  // Reset UI to initial state
  const resetUI = async () => {
    setIsProcessing(true)
    setLastMessage("Reset to initial state")
    
    // Smooth reset animation
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setUiState(initialState)
    setIsProcessing(false)
  }

  // Apply changes from prompt response
  const applyChanges = async (response) => {
    setIsProcessing(true)
    
    if (response.success) {
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
    } else {
      setLastMessage(response.message)
      setIsProcessing(false)
    }
  }

  // Get current state summary for debugging
  const getStateInfo = () => ({
    currentState: uiState,
    isProcessing,
    lastMessage,
    isInitialState: JSON.stringify(uiState) === JSON.stringify(initialState)
  })

  return {
    uiState,
    isProcessing,
    lastMessage,
    updateUI,
    resetUI,
    applyChanges,
    getStateInfo,
    isInitialState: JSON.stringify(uiState) === JSON.stringify(initialState)
  }
}