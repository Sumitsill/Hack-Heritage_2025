const GEMINI_API_KEY = '_____';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export async function generateFoodRecommendations(userPreferences: {
  location: string;
  dietaryRestrictions?: string[];
  quantity: number;
}): Promise<string> {
  try {
    const prompt = `Based on the following preferences, suggest food donation opportunities and recommendations:
    
    Location: ${userPreferences.location}
    Dietary restrictions: ${userPreferences.dietaryRestrictions?.join(', ') || 'None'}
    Quantity needed: ${userPreferences.quantity} portions
    
    Please provide practical suggestions for:
    1. Where to find food donations nearby
    2. What types of food to look for
    3. Best times to check for new donations
    4. Tips for food safety and handling
    
    Keep the response concise and helpful.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'Unable to generate recommendations at this time.';
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return 'Unable to generate recommendations at this time. Please try again later.';
  }
}

export async function analyzeFoodWaste(description: string): Promise<{
  category: string;
  urgency: 'low' | 'medium' | 'high';
  suggestions: string[];
}> {
  try {
    const prompt = `Analyze this food description and provide:
    1. Food category (prepared, raw, packaged)
    2. Urgency level for distribution (low, medium, high)
    3. 3 practical suggestions for optimal distribution
    
    Food description: "${description}"
    
    Respond in JSON format: {"category": "", "urgency": "", "suggestions": []}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data: GeminiResponse = await response.json();
    const text = data.candidates[0]?.content?.parts[0]?.text || '';
    
    try {
      return JSON.parse(text);
    } catch {
      return {
        category: 'prepared',
        urgency: 'medium',
        suggestions: ['Contact local shelters', 'Verify food safety', 'Coordinate pickup time']
      };
    }
  } catch (error) {
    console.error('Error analyzing food waste:', error);
    return {
      category: 'prepared',
      urgency: 'medium',
      suggestions: ['Contact local shelters', 'Verify food safety', 'Coordinate pickup time']
    };
  }
}
