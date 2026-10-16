import { GoogleGenerativeAI } from '@google/generative-ai';

// Using environment variable for API key - NEVER expose keys in code
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

if (!GEMINI_KEY) {
  console.warn('VITE_GEMINI_KEY environment variable is not set. Add it to your .env file.');
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY || '');
const gemini = genAI.getGenerativeModel({ 
  model: import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash" 
});

export default gemini;