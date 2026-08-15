import Groq from 'groq-sdk';

let groqInstance = null;

const getGroq = () => {
  if (!groqInstance) {
     if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }
    groqInstance = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }
  return groqInstance;
};

export default getGroq;
