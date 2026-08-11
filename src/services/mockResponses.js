// Mock responses for prompt processing
// This simulates what we'll get from OpenAI API in Milestone 4

export const mockPromptResponses = {
  // Example 1: Background color changes
  "make the background blue": {
    backgroundColor: "from-blue-500 to-blue-600",
    headerBackground: "from-blue-600 to-blue-700",
    success: true,
    message: "Changed background to blue theme"
  },
  "make background blue": {
    backgroundColor: "from-blue-500 to-blue-600", 
    headerBackground: "from-blue-600 to-blue-700",
    success: true,
    message: "Changed background to blue theme"
  },
  "blue background": {
    backgroundColor: "from-blue-500 to-blue-600",
    headerBackground: "from-blue-600 to-blue-700", 
    success: true,
    message: "Changed background to blue theme"
  },

  // Example 2: Text size changes
  "increase text size": {
    textSize: "text-lg",
    success: true,
    message: "Increased text size"
  },
  "bigger text": {
    textSize: "text-lg",
    success: true,
    message: "Made text bigger"
  },
  "large text": {
    textSize: "text-xl",
    success: true,
    message: "Changed to large text"
  },
  "make text bigger": {
    textSize: "text-lg",
    success: true,
    message: "Increased text size"
  },

  // Example 3: Dark mode
  "dark mode": {
    theme: "dark",
    backgroundColor: "from-gray-900 to-gray-800",
    headerBackground: "from-gray-800 to-gray-900",
    cardColor: "bg-gray-800",
    textColor: "text-white",
    success: true,
    message: "Switched to dark mode"
  },
  "switch to dark mode": {
    theme: "dark",
    backgroundColor: "from-gray-900 to-gray-800",
    headerBackground: "from-gray-800 to-gray-900", 
    cardColor: "bg-gray-800",
    textColor: "text-white",
    success: true,
    message: "Switched to dark mode"
  },
  "enable dark mode": {
    theme: "dark",
    backgroundColor: "from-gray-900 to-gray-800",
    headerBackground: "from-gray-800 to-gray-900",
    cardColor: "bg-gray-800", 
    textColor: "text-white",
    success: true,
    message: "Enabled dark mode"
  },
  "dark theme": {
    theme: "dark",
    backgroundColor: "from-gray-900 to-gray-800",
    headerBackground: "from-gray-800 to-gray-900",
    cardColor: "bg-gray-800",
    textColor: "text-white",
    success: true,
    message: "Switched to dark theme"
  },
  "dark": {
    theme: "dark",
    backgroundColor: "from-gray-900 to-gray-800",
    headerBackground: "from-gray-800 to-gray-900",
    cardColor: "bg-gray-800",
    textColor: "text-white",
    success: true,
    message: "Switched to dark mode"
  },
  "night mode": {
    theme: "dark",
    backgroundColor: "from-gray-900 to-gray-800", 
    headerBackground: "from-gray-800 to-gray-900",
    cardColor: "bg-gray-800",
    textColor: "text-white",
    success: true,
    message: "Activated night mode"
  },

  // Example 4: Green theme
  "make it green": {
    backgroundColor: "from-green-500 to-green-600",
    headerBackground: "from-green-600 to-green-700",
    cardColor: "bg-green-50",
    success: true,
    message: "Changed to green theme"
  },
  "green theme": {
    backgroundColor: "from-green-500 to-green-600",
    headerBackground: "from-green-600 to-green-700",
    cardColor: "bg-green-50",
    success: true,
    message: "Applied green theme"
  },
  "make background green": {
    backgroundColor: "from-green-500 to-green-600",
    headerBackground: "from-green-600 to-green-700", 
    cardColor: "bg-green-50",
    success: true,
    message: "Changed background to green"
  },

  // Example 5: Purple/violet theme  
  "make it purple": {
    backgroundColor: "from-purple-500 to-purple-600",
    headerBackground: "from-purple-600 to-purple-700",
    cardColor: "bg-purple-50",
    success: true,
    message: "Changed to purple theme"
  },
  "purple theme": {
    backgroundColor: "from-purple-500 to-purple-600",
    headerBackground: "from-purple-600 to-purple-700",
    cardColor: "bg-purple-50", 
    success: true,
    message: "Applied purple theme"
  },

  // ===== NEW CREATIVE THEMES =====

  // Sunset theme
  "sunset": {
    backgroundColor: "from-orange-400 to-red-500",
    headerBackground: "from-orange-600 to-red-600",
    cardColor: "bg-orange-50",
    success: true,
    message: "Applied sunset theme"
  },
  "sunset theme": {
    backgroundColor: "from-orange-400 to-red-500", 
    headerBackground: "from-orange-600 to-red-600",
    cardColor: "bg-orange-50",
    success: true,
    message: "Applied beautiful sunset theme"
  },
  "sunset colors": {
    backgroundColor: "from-orange-400 to-red-500",
    headerBackground: "from-orange-600 to-red-600",
    cardColor: "bg-orange-50",
    success: true,
    message: "Applied sunset colors"
  },

  // Ocean theme
  "ocean": {
    backgroundColor: "from-cyan-500 to-blue-600",
    headerBackground: "from-cyan-600 to-blue-700", 
    cardColor: "bg-cyan-50",
    success: true,
    message: "Applied ocean theme"
  },
  "ocean colors": {
    backgroundColor: "from-cyan-500 to-blue-600",
    headerBackground: "from-cyan-600 to-blue-700",
    cardColor: "bg-cyan-50", 
    success: true,
    message: "Applied ocean colors"
  },
  "ocean vibes": {
    backgroundColor: "from-cyan-500 to-blue-600",
    headerBackground: "from-cyan-600 to-blue-700",
    cardColor: "bg-cyan-50",
    success: true,
    message: "Applied ocean vibes"
  },

  // Professional theme
  "professional": {
    backgroundColor: "from-slate-100 to-gray-200",
    headerBackground: "from-slate-700 to-slate-800",
    cardColor: "bg-white",
    textColor: "text-gray-900",
    success: true,
    message: "Applied professional styling"
  },
  "professional look": {
    backgroundColor: "from-slate-100 to-gray-200",
    headerBackground: "from-slate-700 to-slate-800",
    cardColor: "bg-white",
    textColor: "text-gray-900",
    success: true,
    message: "Applied professional look"
  },
  "elegant": {
    backgroundColor: "from-slate-100 to-gray-200",
    headerBackground: "from-slate-700 to-slate-800", 
    cardColor: "bg-white",
    textColor: "text-gray-900",
    success: true,
    message: "Applied elegant styling"
  },
  "elegant design": {
    backgroundColor: "from-slate-100 to-gray-200",
    headerBackground: "from-slate-700 to-slate-800",
    cardColor: "bg-white",
    textColor: "text-gray-900",
    success: true,
    message: "Applied elegant design"
  },
  "make it elegant": {
    backgroundColor: "from-slate-100 to-gray-200",
    headerBackground: "from-slate-700 to-slate-800",
    cardColor: "bg-white",
    textColor: "text-gray-900",
    success: true,
    message: "Made it elegant"
  },

  // Additional variations
  "light mode": {
    theme: "light",
    backgroundColor: "from-blue-50 to-indigo-100", 
    headerBackground: "from-primary-500 to-primary-600",
    cardColor: "bg-white",
    textColor: "text-gray-800",
    success: true,
    message: "Switched to light mode"
  },
  "normal text": {
    textSize: "text-base",
    success: true,
    message: "Reset text to normal size"
  },
  "small text": {
    textSize: "text-sm", 
    success: true,
    message: "Changed to small text"
  }
}

// Process user prompt and return matching response
export const processPrompt = async (prompt) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const normalizedPrompt = prompt.toLowerCase().trim()
  
  console.log('🔍 Looking for prompt:', normalizedPrompt)
  console.log('📋 Available prompts:', Object.keys(mockPromptResponses))
  
  // Check for exact matches first
  if (mockPromptResponses[normalizedPrompt]) {
    console.log('✅ Found exact match for:', normalizedPrompt)
    return mockPromptResponses[normalizedPrompt]
  }
  
  // Check for partial matches
  for (const [key, response] of Object.entries(mockPromptResponses)) {
    if (normalizedPrompt.includes(key) || key.includes(normalizedPrompt)) {
      console.log('✅ Found partial match:', key, 'for:', normalizedPrompt)
      return response
    }
  }
  
  console.log('❌ No match found for:', normalizedPrompt)
  
  // Default response for unrecognized prompts
  return {
    success: false,
    message: `Sorry, I don't understand "${prompt}". Try: "sunset theme", "ocean colors", "dark theme", "elegant design", or "professional look"`
  }
}

// Get list of example prompts for suggestions
export const getExamplePrompts = () => [
  "sunset theme",
  "ocean colors", 
  "dark theme",
  "elegant design",
  "professional look"
]