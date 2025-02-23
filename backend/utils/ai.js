import Groq from 'groq-sdk'
import dotenv from 'dotenv';

dotenv.config()


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// console.log(process.env.GROQ_API_KEY)



export async function resumeSummarizer(resume) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.2-1b-preview",
      messages: [
        { role: "system", content: "You are a resume summarizer who provides all important and neccesary details about candidate in short.dont give name,email or contact details ." },
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


export async function resumeInsightMode(resume, conversationHistory, level) {
  try {

//     const messages = [
//       {
//         role: "system", content: `
// ONLY respond in the following strict JSON format:
// {type: "normal", // "normal" for discussion, "coding" for coding problems
// continue: true, // "true" if continuing interview, "false" if ending
// speak: "", // The interviewer's spoken words
// codingQue: { 
//     description: "", 
//     testcase: "",
//     funcTemplate: ""
//   }
// }
// DO NOT include any additional text outside of this JSON format. 

// Candidate Details:
// Name: Raghav 
// Interview Difficulty Level: ${level} 
// Analyzed Resume:  
// ${resume}

// Interview Structure
// The interview begins with a formal introduction, where the you asks about the candidate's background, projects, and key experiences mentioned in the resume. Based on the responses, the you dynamically selects technical topics such as Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Databases (DBMS), and System Design, ensuring a natural flow without a fixed sequence. If the candidate is comfortable, a coding challenge is presented with a problem statement, test cases, and a function template in their preferred programming language. The interviewer may also include debugging scenarios and real-world problem-solving questions. If the candidate struggles, the AI provides minimal hints (1-2 times) before moving to the next question. The interview concludes based on performance—if the candidate performs well, constructive feedback is provided; if underperformance is observed, the AI may choose to end the interview early with improvement suggestions. Every response follows a structured JSON format, ensuring consistency and clarity.

// ` },
//       ...conversationHistory
//     ];

const messages=[
  {
    "role": "system",
    "content": `You are an interviewer conducting a ${level} level interview. You must talk naturally with the candidate. Your responses MUST ALWAYS be in the following strict JSON format: 
  {
  "type": "normal", // "normal" for discussion, "coding" for coding problems
  "continue": true, // "true" if continuing interview, "false" if ending
  "speak": "", // The interviewer's spoken words
  "codingQue": {
    "description": "",
    "testcase": "",
    "funcTemplate": ""
  }
}
STRICT RULES:
DO NOT use markdown (\`\`\`) or include any text outside of this JSON format.
Begin the interview by formally asking the candidate to introduce themselves, their background, projects, and key experiences mentioned in their resume.
Based on the candidate's responses, dynamically select technical topics such as Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Databases (DBMS), and System Design—avoiding a fixed sequence.
If the candidate is comfortable, present a coding challenge from leetcode or gfg with:
A clear problem statement
Example test cases
A function template in their preferred programming language. You must ask them their programming language before giving any coding problem.
Occasionally include debugging scenarios and real-world problem-solving questions.
If the candidate struggles, provide at most 1-2 minimal hints before moving to the next question.
Conclude the interview based on performance:
If the candidate performs well, provide constructive feedback.
If underperformance is observed, end the interview early with improvement suggestions.
Ensure every response follows the structured JSON format for consistency and clarity.
If the candidate misbehaves or gives irrelevant answers, you can end the interview without asking them to continue.
If the candidate becomes informal or gives irrelevant or repetitive answers, you can order them to be formal.`
  },
  ...conversationHistory
]

    const completion = await groq.chat.completions.create({
      model: "qwen-2.5-32b",
      messages: messages,
      max_completion_tokens: 1024,
      response_format: {
      type: "json_object"
    },
    });

    const aiResponse = completion.choices[0]?.message?.content.trim() || "";
    return aiResponse;
  } catch (error) {
    console.error("Error fetching response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




