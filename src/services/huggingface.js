import { HfInference } from '@huggingface/inference';

// Hugging Face API configuration
const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
const MODEL = import.meta.env.VITE_HUGGINGFACE_MODEL || 'mistralai/Mixtral-8x7B-Instruct-v0.1';

// System prompt for UI modification understanding (unchanged)
const SYSTEM_PROMPT = `You are a UI design assistant that converts natural language requests into structured JSON responses for a mobile UI playground.

The mobile UI has these modifiable properties:
- backgroundColor: Tailwind gradient classes (e.g., "from-blue-500 to-blue-600", "from-purple-500 to-purple-600")
- headerBackground: Tailwind gradient classes for header (usually darker shade)
- textSize: Tailwind text size classes ("text-sm", "text-base", "text-lg", "text-xl")
- cardColor: Tailwind background classes ("bg-white", "bg-gray-800", "bg-blue-50", etc.)
- textColor: Tailwind text color classes ("text-gray-800", "text-white", "text-blue-900")
- theme: "light" or "dark"

IMPORTANT RULES:
1. ALWAYS respond with valid JSON only
2. Only include properties that should change
3. Use proper Tailwind CSS classes
4. Be creative but practical with color combinations
5. Consider accessibility (contrast, readability)

EXAMPLE RESPONSES:

For "make it blue":
{
  "backgroundColor": "from-blue-500 to-blue-600",
  "headerBackground": "from-blue-600 to-blue-700",
  "success": true,
  "message": "Changed to blue theme"
}

For "dark mode" or "dark theme":
{
  "theme": "dark",
  "backgroundColor": "from-gray-900 to-gray-800",
  "headerBackground": "from-gray-800 to-gray-900",
  "cardColor": "bg-gray-800",
  "textColor": "text-white",
  "success": true,
  "message": "Switched to dark mode"
}

For "make it look professional":
{
  "backgroundColor": "from-slate-100 to-gray-200",
  "headerBackground": "from-slate-700 to-slate-800",
  "cardColor": "bg-white",
  "textColor": "text-gray-900",
  "success": true,
  "message": "Applied professional styling"
}

For "sunset theme":
{
  "backgroundColor": "from-orange-400 to-red-500",
  "headerBackground": "from-orange-600 to-red-600",
  "cardColor": "bg-orange-50",
  "success": true,
  "message": "Applied beautiful sunset theme"
}

Always include "success": true and a descriptive "message" in your response.`;

// Check if API token is available
export const hasValidAPIKey = () => {
  return !!(API_TOKEN && API_TOKEN.startsWith('hf_'));
};

// Initialize Hugging Face client
const client = new InferenceClient({ token: API_TOKEN });

// Make API call to Hugging Face
const callHuggingFace = async (prompt) => {
  if (!hasValidAPIKey()) {
    throw new Error('Hugging Face API token not found or invalid. Please add VITE_HUGGINGFACE_API_TOKEN to your .env file.');
  }

  console.log('🔑 Using API Token:', API_TOKEN ? `${API_TOKEN.substring(0, 7)}...${API_TOKEN.substring(API_TOKEN.length - 4)}` : 'Not found');

  try {
    console.log('📡 Making Hugging Face API call...');
    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    console.log('✅ Hugging Face API Response received:', response);
    return response;
  } catch (error) {
    console.error('❌ Hugging Face API Error:', error);

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      console.error('API Error Details:', { status, data });

      switch (status) {
        case 401:
          throw new Error('Invalid API token. Please check your Hugging Face API token in .env file.');
        case 429:
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        case 503:
          throw new Error('Hugging Face service temporarily unavailable. Please try again.');
        default:
          throw new Error(`Hugging Face API error: ${data?.error?.message || 'Unknown error'}`);
      }
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your internet connection.');
    }

    throw new Error('Network error. Please check your internet connection.');
  }
};

// Process user prompt with Hugging Face
export const processPromptWithAI = async (prompt) => {
  try {
    console.log('🧠 Processing prompt with Hugging Face:', prompt);

    const response = await callHuggingFace(prompt);
    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from Hugging Face');
    }

    console.log('📝 Raw Hugging Face response:', content);

    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Invalid response format from AI');
    }

    console.log('✅ Parsed Hugging Face Response:', parsedResponse);

    // Validate response structure
    if (!parsedResponse.success && parsedResponse.success !== false) {
      parsedResponse.success = true;
    }

    if (!parsedResponse.message) {
      parsedResponse.message = 'UI updated successfully';
    }

    return parsedResponse;

  } catch (error) {
    console.error('❌ Error processing prompt with AI:', error);

    // Return structured error response
    return {
      success: false,
      message: error.message || 'Sorry, I couldn\'t process that request. Please try again.',
      error: true,
      source: 'ai-error'
    };
  }
};

// Test API connection
export const testOpenAIConnection = async () => {
  try {
    console.log('🧪 Testing Hugging Face connection...');
    const testResponse = await processPromptWithAI('make background blue');
    console.log('✅ Hugging Face connection test successful:', testResponse);
    return {
      success: true,
      message: 'Hugging Face API connection successful!',
      response: testResponse
    };
  } catch (error) {
    console.error('❌ Hugging Face connection test failed:', error);
    return {
      success: false,
      message: `Hugging Face API connection failed: ${error.message}`,
      error: error.message
    };
  }
};

// Get API usage information
export const getAPIInfo = () => {
  const hasKey = hasValidAPIKey();
  return {
    model: MODEL,
    hasAPIKey: hasKey,
    apiKeyPrefix: hasKey ? `${API_TOKEN.substring(0, 7)}...${API_TOKEN.substring(API_TOKEN.length - 4)}` : 'Not set',
    apiKeyValid: hasKey
  };
};