const { GoogleGenerativeAI } = require('@google/generative-ai');

/* Unsafe, temporary solution. this key will be removed */
let GOOGLE_API_KEY = 'removed'
const model = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Define safety settings
const safetySettings = {
    HARASSMENT: "BLOCK_MOST",
    HATE: "BLOCK_MOST",
    SEXUAL: "BLOCK_MOST",
    DANGEROUS: "BLOCK_MOST"
};

// Define generation config
const generationConfig = {
    temperature: 1,
    top_k: 40,
    top_p: 0.95
};

// Start chat with an empty history
let chat = model.getGenerativeModel({model:'gemini-pro'});

// Function to send a message and get the response
async function sendMessage(prompt) {
    try {
        const result = await chat.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        throw error;
    }
}

module.exports = { sendMessage };