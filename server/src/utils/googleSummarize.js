const { GoogleGenerativeAI } = require('@google/generative-ai');
const { config } = require('dotenv');
config();

const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY";

const genAI = new GoogleGenerativeAI(API_KEY);

function getGeminiModel() {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: 'object',
        properties: {
          summary: { type: 'string' },
          key_insights: { 
            type: 'array',
            items: { type: 'string' }
          },
          sentiment: { type: 'string' },
          main_topic: { type: 'string' },
          subtopics: { 
            type: 'array',
            items: { type: 'string' }
          },
          keywords: { 
            type: 'array',
            items: { type: 'string' }
          },
        },
      },
    },
  });
}


function generatePrompt(pdfContent, summaryLength) {
  return `Analyze the following text extracted from a PDF:
Please provide the following analysis:
1. A summary of about ${summaryLength} words.
2. 10 key insights derived from the content.
3. The overall sentiment of the document.
4. The main topic of the document.
5. 3-5 subtopics discussed in the document.
6. 10-15 important keywords from the document.
7. 3-5 recommendations based on the content.

Please ensure your response is in JSON format as per the specified schema.
### PDF CONTENT STARTS HERE####
    ${pdfContent}`;
}


async function analyzeDoc(text, summaryLength ) {
  try {
    const model = getGeminiModel();
    const prompt = generatePrompt(text, summaryLength);
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const parsedResult = JSON.parse(result.response.text());
    return parsedResult;
  } catch (error) {
    console.error("Error analyzing PDF:", error);
    throw error;
  }
}

module.exports = { analyzeDoc };
