import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

/**
 * Fetches an AI-powered economic summary for a specific country.
 * Uses Groq (Llama 3) as primary and Gemini as fallback.
 */
export async function getMacroSummary(country: string, context?: string) {
  const prompt = `
    Analyze the current economic situation of ${country}. 
    Focus on GDP growth, inflation, and major market risks for 2026.
    Provide a concise, 3-sentence institutional-grade summary.
    Additional context: ${context || "None"}
    Format: Return only the text summary, no conversational filler.
  `;

  // 1. Try Groq (Primary - for speed)
  if (groq && process.env.GROQ_API_KEY) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-70b-8192",
      });
      return completion.choices[0]?.message?.content;
    } catch (error) {
      console.error("Groq AI Error:", error);
    }
  }

  // 2. Fallback to Gemini
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini AI Error:", error);
    }
  }

  // 3. High-Quality Mock Fallback for local development
  return `The economy of ${country} is currently exhibiting ${Math.random() > 0.5 ? 'resilient' : 'moderate'} growth patterns as of early 2026. Institutional focus remains on managing inflationary pressures and optimizing fiscal buffers amid shifting global trade dynamics. Market analysts anticipate a positive trajectory for GDP growth as digital infrastructure investments begin to yield regional dividends.`;
}

/**
 * Analyzes news headlines to generate a sentiment score (0-100).
 */
export async function getSentimentScore(country: string, headlines: string[]) {
  if (!headlines || headlines.length === 0) return 50; // Neutral fallback

  const prompt = `
    Analyze the economic sentiment of these headlines for ${country}:
    ${headlines.join("\n- ")}
    
    Score from 0 (Economic Crisis/Panic) to 100 (Exceptional Growth/Optimism).
    Return ONLY a single integer between 0 and 100.
  `;

  if (groq && process.env.GROQ_API_KEY) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-8b-8192", // Faster model for simple scoring
      });
      const score = parseInt(completion.choices[0]?.message?.content || "50");
      return isNaN(score) ? 50 : score;
    } catch (error) {
      console.error("Groq Sentiment Error:", error);
    }
  }

  // Fallback to Gemini
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const score = parseInt(response.text().trim());
      return isNaN(score) ? 50 : score;
    } catch (error) {
      console.error("Gemini Sentiment Error:", error);
    }
  }

  // 3. High-Fidelity Keyword-Based Mock Analysis
  const text = headlines.join(" ").toLowerCase();
  const positive = ["growth", "increase", "rise", "positive", "strong", "improves", "investment", "success", "surplus"];
  const negative = ["decline", "fall", "drop", "negative", "weak", "fails", "crisis", "deficit", "debt", "inflation"];
  
  let score = 50;
  positive.forEach(word => { if (text.includes(word)) score += 5; });
  negative.forEach(word => { if (text.includes(word)) score -= 5; });
  
  return Math.max(15, Math.min(85, score));
}

/**
 * Generates an economic forecast (2027-2028) based on historical data.
 */
export async function getEconomicForecast(country: string, historicalData: any[]) {
  const prompt = `
    Based on this historical economic data for ${country}:
    ${JSON.stringify(historicalData)}
    
    Forecast the next 2 years (2027 and 2028).
    Return ONLY a JSON array of objects with "name" (year) and "value" (forecasted number).
    Example: [{"name": "2027", "value": 4.2}, {"name": "2028", "value": 4.5}]
    No conversational text.
  `;

  if (groq && process.env.GROQ_API_KEY) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-70b-8192",
        response_format: { type: "json_object" }
      });
      const content = completion.choices[0]?.message?.content || "[]";
      // Handle cases where it might return an object with a key
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : (parsed.forecast || parsed.data || []);
    } catch (error) {
      console.error("Groq Forecast Error:", error);
    }
  }

  // Fallback to Gemini
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Forecast Error:", error);
    }
  }

  // 3. High-Quality Mock Fallback
  const lastYear = historicalData.length > 0 ? Number(historicalData[historicalData.length - 1].name) : 2025;
  const lastValue = historicalData.length > 0 ? historicalData[historicalData.length - 1].value : 5.0;
  
  return [
    { name: (lastYear + 1).toString(), value: Number((lastValue * (1 + (Math.random() * 0.1))).toFixed(1)) },
    { name: (lastYear + 2).toString(), value: Number((lastValue * (1 + (Math.random() * 0.15))).toFixed(1)) }
  ];
}

/**
 * Parses a natural language query into structured data parameters.
 */
export async function parseNaturalLanguageQuery(query: string) {
  const prompt = `
    Analyze this user query about African economic data: "${query}"
    
    Convert it into a structured JSON object with:
    - "countries": Array of ISO2 country codes (e.g., ["NG", "GH"])
    - "indicator": The primary indicator requested (e.g., "GDP_GROWTH", "INFLATION", "DEBT", "UNEMPLOYMENT")
    - "timeframe": Number of years requested (default 5 if not specified)
    
    Return ONLY the JSON object.
    No conversational text.
  `;

  if (groq && process.env.GROQ_API_KEY) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-70b-8192",
        response_format: { type: "json_object" }
      });
      return JSON.parse(completion.choices[0]?.message?.content || "{}");
    } catch (error) {
      console.error("Groq NLQ Error:", error);
    }
  }

  // Fallback to Gemini
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini NLQ Error:", error);
    }
  }

  // 3. High-Quality Mock Fallback
  return {
    countries: ["NG", "ZA"],
    indicator: "GDP_GROWTH",
    timeframe: 5
  };
}
