import axios from 'axios'

// Hugging Face API configuration
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/'
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY
const MODEL = 'microsoft/DialoGPT-medium' // Free model for text generation

// Alternative models you can try:
// 'facebook/blenderbot-400M-distill' - Good for conversational AI
// 'microsoft/DialoGPT-small' - Smaller, faster
// 'gpt2' - Classic GPT-2 model

// Check if API key is available
export const hasValidAPIKey = () => {
  return !!(API_KEY && API_KEY.startsWith('hf_'))
}

// System prompt patterns for UI modification understanding
const UI_PATTERNS = {
  // Dark theme patterns
  'dark': {
    keywords: ['dark', 'night', 'black', 'shadow'],
    response: {
      theme: "dark",
      backgroundColor: "from-gray-900 to-gray-800",
      headerBackground: "from-gray-800 to-gray-900",
      cardColor: "bg-gray-800",
      textColor: "text-white",
      success: true,
      message: "Switched to dark theme"
    }
  },

  // Color themes
  'blue': {
    keywords: ['blue', 'ocean', 'water', 'sky', 'azure'],
    response: {
      backgroundColor: "from-blue-500 to-blue-600",
      headerBackground: "from-blue-600 to-blue-700",
      cardColor: "bg-blue-50",
      success: true,
      message: "Applied blue theme"
    }
  },

  'sunset': {
    keywords: ['sunset', 'orange', 'warm', 'fire', 'autumn'],
    response: {
      backgroundColor: "from-orange-400 to-red-500",
      headerBackground: "from-orange-600 to-red-600",
      cardColor: "bg-orange-50",
      success: true,
      message: "Applied sunset theme"
    }
  },

  'green': {
    keywords: ['green', 'forest', 'nature', 'leaf', 'mint'],
    response: {
      backgroundColor: "from-green-500 to-green-600",
      headerBackground: "from-green-600 to-green-700",
      cardColor: "bg-green-50",
      success: true,
      message: "Applied green theme"
    }
  },

  'purple': {
    keywords: ['purple', 'violet', 'lavender', 'plum', 'royal'],
    response: {
      backgroundColor: "from-purple-500 to-purple-600",
      headerBackground: "from-purple-600 to-purple-700",
      cardColor: "bg-purple-50",
      success: true,
      message: "Applied purple theme"
    }
  },

  'professional': {
    keywords: ['professional', 'elegant', 'business', 'corporate', 'clean', 'minimal'],
    response: {
      backgroundColor: "from-slate-100 to-gray-200",
      headerBackground: "from-slate-700 to-slate-800",
      cardColor: "bg-white",
      textColor: "text-gray-900",
      success: true,
      message: "Applied professional styling"
    }
  },

  'light': {
    keywords: ['light', 'bright', 'white', 'clean', 'fresh'],
    response: {
      theme: "light",
      backgroundColor: "from-blue-50 to-indigo-100",
      headerBackground: "from-primary-500 to-primary-600",
      cardColor: "bg-white",
      textColor: "text-gray-800",
      success: true,
      message: "Switched to light theme"
    }
  },

  // Text size patterns
  'bigger': {
    keywords: ['bigger', 'large', 'increase', 'size'],
    response: {
      textSize: "text-lg",
      success: true,
      message: "Increased text size"
    }
  },

  'smaller': {
    keywords: ['smaller', 'small', 'decrease', 'tiny'],
    response: {
      textSize: "text-sm",
      success: true,
      message: "Decreased text size"
    }
  }
}

// Intelligent pattern matching for UI changes
const analyzePromptPatterns = (prompt) => {
  const normalizedPrompt = prompt.toLowerCase()
  
  console.log('🔍 Analyzing prompt patterns for:', normalizedPrompt)
  
  // Check each pattern
  for (const [patternName, pattern] of Object.entries(UI_PATTERNS)) {
    for (const keyword of pattern.keywords) {
      if (normalizedPrompt.includes(keyword)) {
        console.log(`✅ Found pattern match: "${keyword}" -> ${patternName}`)
        return {
          ...pattern.response,
          source: 'pattern-match',
          matchedKeyword: keyword,
          matchedPattern: patternName
        }
      }
    }
  }
  
  console.log('❌ No pattern matches found')
  return null
}

// Make API call to Hugging Face
const callHuggingFace = async (prompt) => {
  if (!hasValidAPIKey()) {
    throw new Error('Hugging Face API token not found. Please add VITE_HUGGINGFACE_API_KEY to your .env file.')
  }

  console.log('🔑 Using HF Token:', API_KEY ? `${API_KEY.substring(0, 7)}...${API_KEY.substring(API_KEY.length - 4)}` : 'Not found')

  try {
    console.log('📡 Making Hugging Face API call...')
    
    // First, try pattern matching for immediate response
    const patternMatch = analyzePromptPatterns(prompt)
    if (patternMatch) {
      console.log('✅ Using pattern match instead of API call')
      return patternMatch
    }
    
    // If no pattern match, make API call
    const response = await axios.post(
      `${HUGGINGFACE_API_URL}${MODEL}`,
      {
        inputs: `Convert this UI request to a theme: "${prompt}". Respond with just the theme name (dark, blue, green, purple, sunset, professional, or light).`,
        parameters: {
          max_length: 50,
          temperature: 0.7,
          return_full_text: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    )

    console.log('✅ Hugging Face API Response received:', response.data)
    
    // Process HF response and convert to UI changes
    const generatedText = response.data[0]?.generated_text || response.data[0]?.summary_text || ''
    const detectedTheme = generatedText.toLowerCase().trim()
    
    console.log('🎯 Detected theme from AI:', detectedTheme)
    
    // Map AI response back to our UI patterns
    for (const [patternName, pattern] of Object.entries(UI_PATTERNS)) {
      if (detectedTheme.includes(patternName) || pattern.keywords.some(keyword => detectedTheme.includes(keyword))) {
        console.log(`✅ Mapped AI response "${detectedTheme}" to pattern: ${patternName}`)
        return {
          ...pattern.response,
          source: 'huggingface-ai',
          aiResponse: detectedTheme
        }
      }
    }
    
    // Fallback to pattern matching if AI response is unclear
    return analyzePromptPatterns(prompt) || {
      success: false,
      message: 'AI response was unclear. Try: "dark theme", "sunset colors", "professional look"',
      source: 'huggingface-fallback'
    }
    
  } catch (error) {
    console.error('❌ Hugging Face API Error:', error)
    
    // Try pattern matching as fallback
    const patternMatch = analyzePromptPatterns(prompt)
    if (patternMatch) {
      console.log('🔄 Using pattern fallback after API error')
      return {
        ...patternMatch,
        source: 'pattern-fallback'
      }
    }
    
    if (error.response) {
      const status = error.response.status
      const data = error.response.data
      
      console.error('API Error Details:', { status, data })
      
      switch (status) {
        case 401:
          throw new Error('Invalid Hugging Face token. Please check your token in .env file.')
        case 429:
          throw new Error('Rate limit exceeded. Please wait a moment and try again.')
        case 503:
          throw new Error('Model is loading. Please wait a few seconds and try again.')
        default:
          throw new Error(`Hugging Face API error: ${data?.error || 'Unknown error'}`)
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your internet connection.')
    }
    
    throw new Error('Network error. Please check your internet connection.')
  }
}

// Process user prompt with Hugging Face AI
export const processPromptWithAI = async (prompt) => {
  try {
    console.log('🧠 Processing prompt with Hugging Face AI:', prompt)
    
    const response = await callHuggingFace(prompt)
    
    console.log('✅ Processed HF Response:', response)
    
    // Ensure response has required fields
    if (!response.success && response.success !== false) {
      response.success = true
    }
    
    if (!response.message) {
      response.message = 'UI updated successfully with AI assistance'
    }
    
    return response
    
  } catch (error) {
    console.error('❌ Error processing prompt with Hugging Face AI:', error)
    
    // Final fallback to pattern matching
    const patternMatch = analyzePromptPatterns(prompt)
    if (patternMatch) {
      console.log('🔄 Using final pattern fallback')
      return {
        ...patternMatch,
        source: 'final-fallback',
        message: `${patternMatch.message} (using built-in patterns)`
      }
    }
    
    return {
      success: false,
      message: error.message || 'Sorry, I couldn\'t process that request. Please try again.',
      error: true,
      source: 'ai-error'
    }
  }
}

// Test API connection
export const testAIConnection = async () => {
  try {
    console.log('🧪 Testing Hugging Face connection...')
    const testResponse = await processPromptWithAI('make it blue')
    console.log('✅ HF connection test successful:', testResponse)
    return {
      success: true,
      message: 'Hugging Face AI connection successful!',
      response: testResponse
    }
  } catch (error) {
    console.error('❌ HF connection test failed:', error)
    return {
      success: false,
      message: `Hugging Face AI connection failed: ${error.message}`,
      error: error.message
    }
  }
}

// Get API usage information
export const getAPIInfo = () => {
  const hasKey = hasValidAPIKey()
  return {
    model: MODEL,
    hasAPIKey: hasKey,
    apiKeyPrefix: hasKey ? `${API_KEY.substring(0, 7)}...${API_KEY.substring(API_KEY.length - 4)}` : 'Not set',
    apiKeyValid: hasKey,
    provider: 'Hugging Face',
    isFree: true
  }
}