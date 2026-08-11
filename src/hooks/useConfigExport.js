import { useState } from 'react'

// Hook for exporting and importing UI configurations
export const useConfigExport = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  // Export current UI configuration
  const exportConfig = async (uiState, history = []) => {
    setIsExporting(true)
    
    try {
      const config = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        appName: 'Mobile UI Playground',
        uiState,
        history: history.slice(-5), // Export last 5 commands
        metadata: {
          platform: navigator.platform,
          userAgent: navigator.userAgent.substring(0, 100),
          theme: uiState.theme,
          totalCommands: history.length
        }
      }

      const jsonString = JSON.stringify(config, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
      link.download = `ui-playground-config-${timestamp}.json`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Cleanup
      URL.revokeObjectURL(url)
      
      setIsExporting(false)
      
      return {
        success: true,
        message: "Configuration exported successfully!",
        filename: link.download
      }
      
    } catch (error) {
      setIsExporting(false)
      console.error('Export error:', error)
      
      return {
        success: false,
        message: "Failed to export configuration. Please try again.",
        error: error.message
      }
    }
  }

  // Import UI configuration from file
  const importConfig = async (file) => {
    setIsImporting(true)
    
    try {
      if (!file) {
        throw new Error('No file selected')
      }
      
      if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        throw new Error('Please select a valid JSON configuration file')
      }
      
      if (file.size > 1024 * 1024) { // 1MB limit
        throw new Error('File too large. Maximum size is 1MB')
      }
      
      const text = await file.text()
      const config = JSON.parse(text)
      
      // Validate configuration structure
      if (!config.version || !config.uiState) {
        throw new Error('Invalid configuration file format')
      }
      
      if (config.version !== '1.0.0') {
        console.warn('Configuration version mismatch, attempting to load anyway...')
      }
      
      setIsImporting(false)
      
      return {
        success: true,
        message: "Configuration imported successfully!",
        config,
        uiState: config.uiState,
        history: config.history || [],
        metadata: config.metadata || {}
      }
      
    } catch (error) {
      setIsImporting(false)
      console.error('Import error:', error)
      
      return {
        success: false,
        message: `Failed to import: ${error.message}`,
        error: error.message
      }
    }
  }

  // Share configuration as URL (limited size)
  const shareConfig = (uiState) => {
    try {
      const minimalConfig = {
        bg: uiState.backgroundColor,
        hd: uiState.headerBackground,
        ts: uiState.textSize,
        cc: uiState.cardColor,
        tc: uiState.textColor,
        th: uiState.theme
      }
      
      const encoded = btoa(JSON.stringify(minimalConfig))
      
      if (encoded.length > 2000) { // URL length limit
        return {
          success: false,
          message: "Configuration too large for URL sharing. Use export instead."
        }
      }
      
      const shareUrl = `${window.location.origin}${window.location.pathname}?config=${encoded}`
      
      return {
        success: true,
        message: "Share URL created!",
        url: shareUrl,
        shortUrl: shareUrl.length > 100 ? shareUrl.substring(0, 100) + '...' : shareUrl
      }
      
    } catch (error) {
      return {
        success: false,
        message: "Failed to create share URL",
        error: error.message
      }
    }
  }

  // Load configuration from URL parameter
  const loadFromUrl = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const configParam = urlParams.get('config')
      
      if (!configParam) {
        return { success: false, message: "No configuration in URL" }
      }
      
      const decoded = atob(configParam)
      const minimalConfig = JSON.parse(decoded)
      
      // Expand minimal config to full UI state
      const uiState = {
        backgroundColor: minimalConfig.bg || "from-blue-50 to-indigo-100",
        headerBackground: minimalConfig.hd || "from-primary-500 to-primary-600",
        textSize: minimalConfig.ts || "text-base",
        cardColor: minimalConfig.cc || "bg-white",
        textColor: minimalConfig.tc || "text-gray-800",
        theme: minimalConfig.th || "light"
      }
      
      return {
        success: true,
        message: "Configuration loaded from URL!",
        uiState
      }
      
    } catch (error) {
      console.error('URL load error:', error)
      return {
        success: false,
        message: "Invalid configuration in URL",
        error: error.message
      }
    }
  }

  // Generate random configuration
  const generateRandomConfig = () => {
    const themes = [
      {
        backgroundColor: "from-purple-500 to-pink-600",
        headerBackground: "from-purple-600 to-pink-700",
        cardColor: "bg-purple-50",
        theme: "light"
      },
      {
        backgroundColor: "from-green-400 to-blue-500",
        headerBackground: "from-green-500 to-blue-600", 
        cardColor: "bg-green-50",
        theme: "light"
      },
      {
        backgroundColor: "from-yellow-400 to-orange-500",
        headerBackground: "from-yellow-500 to-orange-600",
        cardColor: "bg-yellow-50",
        theme: "light"
      },
      {
        backgroundColor: "from-gray-900 to-gray-800",
        headerBackground: "from-gray-800 to-gray-900",
        cardColor: "bg-gray-800",
        textColor: "text-white",
        theme: "dark"
      }
    ]
    
    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
    const textSizes = ['text-sm', 'text-base', 'text-lg']
    
    return {
      ...randomTheme,
      textSize: textSizes[Math.floor(Math.random() * textSizes.length)],
      textColor: randomTheme.textColor || "text-gray-800"
    }
  }

  return {
    exportConfig,
    importConfig,
    shareConfig,
    loadFromUrl,
    generateRandomConfig,
    isExporting,
    isImporting
  }
}