import { processPromptWithAI, hasValidAPIKey } from '../services/openai'
import { processPrompt as processMockPrompt } from '../services/mockResponses'

// Configuration for prompt processing
const CONFIG = {
  useAI: true, // Will auto-detect based on API key
  fallbackToMock: true,
  maxRetries: 2,
  retryDelay: 1000
}

// Delay utility for better UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Main intelligent prompt processor
export const processPromptIntelligent = async (prompt) => {
  console.log('🎯 Starting intelligent prompt processing:', prompt)
  
  // Always show some processing time for better UX
  await delay(200)
  
  // Check if we should use AI
  const shouldUseAI = CONFIG.useAI && hasValidAPIKey()
  console.log('🤖 Should use AI:', shouldUseAI)
  console.log('🔑 Has valid API key:', hasValidAPIKey())
  
  if (shouldUseAI) {
    console.log('🧠 Attempting Hugging Face AI processing...')
    try {
      const aiResponse = await processPromptWithAI(prompt)
      
      // Check if AI processing was successful
      if (aiResponse.success && !aiResponse.error) {
        console.log('✅ Hugging Face AI processing successful!')
        return {
          ...aiResponse,
          source: aiResponse.source || 'ai',
          timestamp: new Date().toISOString()
        }
      } else {
        console.log('⚠️ AI returned error or failed, trying fallback...')
        if (CONFIG.fallbackToMock) {
          return await processMockWithAIFallback(prompt)
        }
        return aiResponse
      }
    } catch (error) {
      console.error('❌ AI processing failed completely:', error)
      
      if (CONFIG.fallbackToMock) {
        console.log('🔄 Falling back to mock responses...')
        return await processMockWithAIFallback(prompt)
      }
      
      return {
        success: false,
        message: 'AI processing failed. Please check your Hugging Face token and try again.',
        error: error.message,
        source: 'error'
      }
    }
  } else {
    console.log('📦 Using mock responses (no valid API key)')
    return await processMockWithAIFallback(prompt)
  }
}

// Process with mock responses and add source info
const processMockWithAIFallback = async (prompt) => {
  try {
    console.log('📦 Processing with mock responses:', prompt)
    const mockResponse = await processMockPrompt(prompt)
    
    console.log('📋 Mock response:', mockResponse)
    
    return {
      ...mockResponse,
      source: 'mock',
      message: mockResponse.message || 'Applied changes using built-in patterns',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('❌ Mock processing also failed:', error)
    return {
      success: false,
      message: 'Sorry, I couldn\'t understand that request. Try: "dark theme", "sunset colors", "professional look", or "ocean vibes"',
      source: 'fallback',
      error: error.message
    }
  }
}

// Smart prompt suggestions based on current state
export const getSmartSuggestions = (currentState) => {
  const suggestions = []
  
  // Theme-based suggestions
  if (currentState.theme === 'light') {
    suggestions.push('dark theme', 'night mode')
  } else {
    suggestions.push('light mode', 'bright theme')
  }
  
  // Always include creative themes
  suggestions.push('sunset theme', 'ocean colors', 'professional look', 'forest green')
  
  return suggestions.slice(0, 5)
}

// Prompt validation
export const validatePrompt = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    return { valid: false, message: 'Please enter a valid prompt' }
  }
  
  const trimmed = prompt.trim()
  if (trimmed.length < 2) {
    return { valid: false, message: 'Prompt is too short' }
  }
  
  if (trimmed.length > 200) {
    return { valid: false, message: 'Prompt is too long (max 200 characters)' }
  }
  
  return { valid: true, prompt: trimmed }
}

// Configuration utilities
export const setAIEnabled = (enabled) => {
  CONFIG.useAI = enabled
  console.log(`AI processing ${enabled ? 'enabled' : 'disabled'}`)
}

export const getProcessorConfig = () => ({
  ...CONFIG,
  hasValidAPIKey: hasValidAPIKey(),
  willUseAI: CONFIG.useAI && hasValidAPIKey(),
  aiProvider: 'Hugging Face'
})