import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Header from './components/Header'
import ProfileCard from './components/ProfileCard'
import EnhancedInputBar from './components/EnhancedInputBar'
import StatusMessage from './components/StatusMessage'
import { FloatingParticles, SuccessAnimation, MorphingShape } from './components/AdvancedAnimations'
import { useEnhancedUIState } from './hooks/useEnhancedUIState'
import { processPromptIntelligent, validatePrompt, getProcessorConfig } from './utils/promptProcessor'
import { testAIConnection, getAPIInfo } from './services/openai'
import { motion } from 'framer-motion'

function App() {
  // Use enhanced UI state hook with all advanced features
  const {
    uiState,
    isProcessing,
    lastMessage,
    showSuccessAnimation,
    setShowSuccessAnimation,
    resetUI,
    applyChanges,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
    handleExport,
    handleImport,
    handleRandomize,
    getRecentCommands,
    isInitialState
  } = useEnhancedUIState()

  const [systemStatus, setSystemStatus] = useState({
    apiKeyValid: false,
    willUseAI: false,
    connectionTested: false
  })

  // Initialize system on startup
  useEffect(() => {
    const initializeSystem = async () => {
      console.log('🚀 Initializing Milestone 5 - Advanced UI Playground...')
      
      const apiInfo = getAPIInfo()
      const processorConfig = getProcessorConfig()
      
      console.log('📋 API Info:', apiInfo)
      console.log('⚙️ Processor Config:', processorConfig)
      
      setSystemStatus({
        apiKeyValid: apiInfo.hasAPIKey && apiInfo.apiKeyValid,
        willUseAI: processorConfig.willUseAI,
        connectionTested: false
      })
      
      // Test connection if we have a valid API key
      if (apiInfo.hasAPIKey && apiInfo.apiKeyValid) {
        console.log('🧪 Testing Hugging Face connection...')
        try {
          const testResult = await testAIConnection()
          console.log('🔗 Connection test result:', testResult)
          
          setSystemStatus(prev => ({
            ...prev,
            connectionTested: true,
            connectionWorking: testResult.success
          }))
          
          if (testResult.success) {
            console.log('✅ Advanced AI system ready!')
          } else {
            console.log('⚠️ AI connection failed, using smart patterns and enhanced features')
          }
        } catch (error) {
          console.error('❌ Connection test error:', error)
          setSystemStatus(prev => ({
            ...prev,
            connectionTested: true,
            connectionWorking: false
          }))
        }
      } else {
        console.log('📦 Using advanced pattern matching and all enhanced features')
      }
    }
    
    initializeSystem()
  }, [])

  // Handle prompt submission with enhanced features
  const handlePromptSubmit = async (prompt) => {
    console.log('🎯 === ENHANCED PROMPT SUBMISSION START ===')
    console.log('📝 Original prompt:', prompt)
    
    // Validate prompt
    const validation = validatePrompt(prompt)
    if (!validation.valid) {
      await applyChanges({
        success: false,
        message: validation.message
      })
      return
    }

    try {
      console.log('🤖 Processing with advanced intelligent system...')
      const response = await processPromptIntelligent(validation.prompt)
      console.log('📋 Enhanced response:', response)
      
      // Enhanced source information
      let enhancedMessage = response.message
      if (response.source === 'ai' || response.source === 'huggingface-ai') {
        enhancedMessage = `🤖 HF AI: ${response.message}`
      } else if (response.source === 'pattern-match' || response.source === 'pattern-fallback') {
        enhancedMessage = `🎯 Smart Pattern: ${response.message}`
      } else if (response.source === 'mock') {
        enhancedMessage = `📦 Built-in: ${response.message}`
      }
      
      // Apply changes with history tracking
      await applyChanges({
        ...response,
        message: enhancedMessage
      }, validation.prompt)
      
    } catch (error) {
      console.error('❌ Error in enhanced prompt submission:', error)
      await applyChanges({
        success: false,
        message: "Sorry, something went wrong. Please try again."
      })
    }
    
    console.log('🏁 === ENHANCED PROMPT SUBMISSION END ===')
  }

  // Determine system status for display
  const getSystemStatusInfo = () => {
    if (systemStatus.willUseAI && systemStatus.connectionWorking) {
      return {
        status: "🚀 Advanced AI",
        description: "Hugging Face AI + All Advanced Features (FREE)",
        color: "blue"
      }
    } else if (systemStatus.apiKeyValid && !systemStatus.connectionWorking) {
      return {
        status: "🎯 Enhanced Mode", 
        description: "Smart patterns + All advanced features (HF token detected)",
        color: "purple"
      }
    } else {
      return {
        status: "✨ Professional Mode",
        description: "Complete feature set + smart patterns (FREE)",
        color: "green"
      }
    }
  }

  const statusInfo = getSystemStatusInfo()

  return (
    <Layout 
      backgroundColor={uiState.backgroundColor}
      theme={uiState.theme}
    >
      {/* Background Effects */}
      <FloatingParticles theme={uiState.theme} />
      <MorphingShape theme={uiState.theme} />

      {/* Success Animation Overlay */}
      <SuccessAnimation 
        isVisible={showSuccessAnimation}
        onComplete={() => setShowSuccessAnimation(false)}
      />

      {/* Dynamic Header */}
      <Header 
        backgroundColor={uiState.headerBackground}
        textSize="text-2xl"
      />

      {/* Status Message */}
      <StatusMessage 
        message={lastMessage}
        type={lastMessage.includes("Sorry") || lastMessage.includes("Error") ? "error" : "success"}
        isVisible={!!lastMessage}
      />

      {/* Main Content with Enhanced ProfileCard */}
      <main className="flex-1 pb-40 relative">
        <ProfileCard 
          backgroundColor={uiState.cardColor}
          textSize={uiState.textSize}
          cardColor={uiState.cardColor}
          textColor={uiState.textColor}
        />
        
        {/* Advanced Status Section */}
        <div className="px-6 py-4">
          <motion.div 
            className={`${
              uiState.theme === 'dark' 
                ? 'bg-gray-800/90 border-gray-600' 
                : statusInfo.color === 'blue' 
                  ? 'bg-gradient-to-r from-blue-50/90 to-blue-100/90 border-blue-200'
                  : statusInfo.color === 'purple'
                  ? 'bg-gradient-to-r from-purple-50/90 to-purple-100/90 border-purple-200'
                  : 'bg-gradient-to-r from-green-50/90 to-green-100/90 border-green-200'
            } border rounded-xl p-4 backdrop-blur-sm transition-all duration-500 shadow-lg`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className={`font-bold mb-2 flex items-center ${
              uiState.theme === 'dark' 
                ? `text-${statusInfo.color}-300` 
                : `text-${statusInfo.color}-800`
            }`}>
              <motion.span 
                className={`w-3 h-3 bg-${statusInfo.color}-500 rounded-full mr-2`}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              🎉 UI Playground - {statusInfo.status}
            </h3>
            <p className={`text-sm mb-3 ${
              uiState.theme === 'dark' 
                ? 'text-gray-300' 
                : `text-${statusInfo.color}-700`
            }`}>
              {isProcessing ? "🧠 AI processing with advanced features..." : statusInfo.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`flex items-center ${
                uiState.theme === 'dark' 
                  ? `text-${statusInfo.color}-400` 
                  : `text-${statusInfo.color}-600`
              }`}>
                <span className={`w-1 h-1 bg-${statusInfo.color}-500 rounded-full mr-2`}></span>
                🤗 Hugging Face Ready
              </div>
              <div className={`flex items-center ${
                uiState.theme === 'dark' 
                  ? `text-${statusInfo.color}-400` 
                  : `text-${statusInfo.color}-600`
              }`}>
                <span className={`w-1 h-1 bg-${statusInfo.color}-500 rounded-full mr-2`}></span>
                🎯 Smart Patterns ✓
              </div>
              <div className={`flex items-center ${
                uiState.theme === 'dark' 
                  ? `text-${statusInfo.color}-400` 
                  : `text-${statusInfo.color}-600`
              }`}>
                <span className={`w-1 h-1 bg-${statusInfo.color}-500 rounded-full mr-2`}></span>
                📦 Undo/Redo ✓
              </div>
              <div className={`flex items-center ${
                uiState.theme === 'dark' 
                  ? `text-${statusInfo.color}-400` 
                  : `text-${statusInfo.color}-600`
              }`}>
                <span className={`w-1 h-1 bg-${statusInfo.color}-500 rounded-full mr-2`}></span>
                💾 Export/Import ✓
              </div>
              <div className={`flex items-center ${
                uiState.theme === 'dark' 
                  ? `text-${statusInfo.color}-400` 
                  : `text-${statusInfo.color}-600`
              }`}>
                <span className={`w-1 h-1 bg-${statusInfo.color}-500 rounded-full mr-2`}></span>
                ✨ Advanced Animations ✓
              </div>
              <div className={`flex items-center ${
                uiState.theme === 'dark' 
                  ? `text-${statusInfo.color}-400` 
                  : `text-${statusInfo.color}-600`
              }`}>
                <span className={`w-1 h-1 bg-${statusInfo.color}-500 rounded-full mr-2`}></span>
                {isInitialState ? "Initial" : "Modified"} ✓
              </div>
            </div>

            {/* Feature Showcase */}
            <motion.div 
              className="mt-3 pt-3 border-t border-gray-200/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.5 }}
            >
              <div className={`text-xs ${
                uiState.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="font-medium">Enjoy the Following:</span>
                <span className="ml-1">Command History • Export/Import • Advanced Animations • Professional Polish</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Enhanced Input Bar with All Advanced Features */}
      <EnhancedInputBar 
        onSubmit={handlePromptSubmit}
        onReset={resetUI}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onExport={handleExport}
        onImport={handleImport}
        onRandomize={handleRandomize}
        isLoading={isProcessing}
        canUndo={canUndo}
        canRedo={canRedo}
        recentCommands={getRecentCommands()}
        placeholder="Try: 'sunset theme', 'professional look', or use advanced features below!"
      />
    </Layout>
  )
}

export default App