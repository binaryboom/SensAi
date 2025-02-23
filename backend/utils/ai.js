import Groq from 'groq-sdk'
import dotenv from 'dotenv';

dotenv.config()


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// console.log(process.env.GROQ_API_KEY)



async function resumeSummarizer(resume) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.2-1b-preview",
      messages: [
        { role: "system", content: "You are a resume summarizer who provides all important and neccesary details about candidate in short. In your response strictly send summary as plain text nothing else" },
        { role: "user", content: resume }
      ],
      max_completion_tokens: 1024,
    });
    console.log('summarizing resume')
    const res = completion.choices[0]?.message?.content.trim() || "";
        // console.log(res);
        return res;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}


export default resumeSummarizer;


