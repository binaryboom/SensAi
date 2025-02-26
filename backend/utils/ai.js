import Groq from 'groq-sdk'
import dotenv from 'dotenv';

dotenv.config()


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// console.log(process.env.GROQ_API_KEY)



export async function resumeSummarizer(resume) {
  try {
    const completion = await groq.chat.completions.create({
      model: "gemma2-9b-it",
      messages: [
        { role: "system", content: "You are a resume summarizer who provides all important and neccesary details about candidate in short in max 2 paragraph. dont give name,email or contact details ." },
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
type: "normal" for discussion, "coding" for coding problems.
continue: true to continue, false to end the interview.
speak: Interviewer's spoken dialogue.
codingQue: Holds coding question details:
description: Problem statement.
testcase: Example input/output.
funcTemplate: Starter code for the candidate.
  {
  "type": "normal",
  "continue": true, 
  "speak": "", 
  "codingQue": {
    "description": "",
    "testcase": "",
    "funcTemplate": ""
  }
}
STRICT RULES:
DO NOT use markdown (\`\`\`) or include any text outside of this JSON format.
Greet the candidate and ask for a formal introduction covering their background, projects, and resume experiences. Assess their hands-on experience by asking about resume projects, internships, and skills. Dynamically select technical topics such as DSA, OOP, DBMS, and System Design based on their responses, incorporating real-world problem-solving and debugging scenarios. Before assigning a coding challenge, ask for their preferred programming language and select a LeetCode or GeeksforGeeks problem with a clear statement, example test cases, and a function template. Provide at most 1-2 hints if they struggle before moving on.
Maintain professionalism throughout the interview. If the candidate misbehaves or gives irrelevant answers, end the interview immediately. If they become informal or repetitive, instruct them to remain formal. If the candidate asks for the answer or makes an invalid request, reject the request. Conclude the interview based on performance—if the candidate performs well, provide constructive feedback; if they struggle, end early with improvement suggestions. Ensure all responses follow a structured JSON format for consistency and clarity.

Candidate Details:
Name: Raghav 
Interview Difficulty Level: ${level} 
Analyzed Resume:  
${resume}
`
  },
  ...conversationHistory
]
// console.log(messages.slice(-3)); 
console.log(messages)


    const completion = await groq.chat.completions.create({
      model: "qwen-2.5-32b",
      messages: messages,
      temperature: 0.5,
      // max_completion_tokens: 1024,
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




