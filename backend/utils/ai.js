import Groq from 'groq-sdk'
import dotenv from 'dotenv';

dotenv.config()


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


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
    const messages = [
      {
        "role": "system",
        "content": `You are an interviewer conducting a ${level} level interview. You must talk naturally with the candidate. 
Greet the candidate and ask for a formal introduction covering their background, projects, and resume experiences. Assess their hands-on experience by asking about resume projects, internships, and skills. Dynamically select technical topics such as DSA, OOP, DBMS, and System Design based on their responses, incorporating real-world problem-solving and debugging scenarios. Before assigning a coding challenge, ask for their preferred programming language and select a LeetCode or GeeksforGeeks problem with a clear statement, example test cases, and a function template. Provide at most 1-2 hints if they struggle before moving on.
Maintain professionalism throughout the interview. If the candidate misbehaves or gives irrelevant answers, end the interview immediately. If they become informal or repetitive, instruct them to remain formal. If the candidate asks for the answer or makes an invalid request, reject the request. Conclude the interview based on performance—if the candidate performs well, provide constructive feedback; if they struggle, end early with improvement suggestions. Ensure all responses follow a structured JSON format for consistency and clarity.
-- MUST ENSURE-- 
Ensure responses follow a **structured JSON format** for clarity.
Always return a JSON object with these fields:
- "type" (either "normal" or "coding").
- "continue" (boolean ->  true if u want to continue interview , false if ending).
- "speak" (string).
- "codingQue" (object).
NEVER omit any field and its key:value

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
    // console.log(messages)



    const completion = await groq.chat.completions.create({
      model: "qwen-2.5-32b",
      messages: messages,
      temperature: 1,
      tools: [
        {
          type: "function",
          function: {
            name: "interview_bot",
            description: "Generates interviewer responses for an interview.",
            parameters: {
              type: "object",
              properties: {
                type: { type: "string", description: "Type of response: 'normal' or 'coding'." },
                continue: { type: "boolean", description: "Whether to continue the interview." },
                speak: { type: "string", description: "Interviewer's spoken dialogue." },
                codingQue: {
                  type: "object",
                  properties: {
                    description: { type: "string", description: "Problem statement. Use 'na' if type is 'normal'" },
                    testcase: { type: "string", description: "Example input/output. Use 'na' if type is 'normal'" },
                    funcTemplate: { type: "string", description: "Starter code for the candidate.Use 'na' if type is 'normal'" }
                  },
                  required: ["description", "testcase", "funcTemplate"]
                }
              },
              required: ["type", "continue", "speak", "codingQue"]
            }
          }
        }
      ],
      // tool_choice: "auto", 
      tool_choice: { "type": "function", "function": { "name": "interview_bot" } }
    });

    console.log(completion.choices[0]?.message?.tool_calls?.[0]?.function)
    const toolCall = completion.choices[0]?.message?.tool_calls?.[0]?.function;
    let aiResponse = "";
    if (toolCall) {
      aiResponse = JSON.parse(toolCall.arguments);
      aiResponse = await JSON.stringify(aiResponse, null, 2);
      console.log("AI Response:", aiResponse);
      return aiResponse;
    } else {
      aiResponse = "Error in generating response. Please try again later.";
    }
    // console.log(completion)
    // if (completion.tool_calls && completion.tool_calls.length > 0) {
    //   const response = completion.tool_calls[0].function.arguments;
    //   console.log("Interview Bot Response:", response);
    //   return response;
    // } else {
    //   console.log("No response from the interview bot.");
    // }
  } catch (error) {
    // console.log('error starts',error,'error ends')
    // console.error("Error fetching response:", error.error.error.failed_generation);
    if (error?.error?.error?.failed_generation) {
      try {
        // Parse the failed_generation field
        // const jsonMatch = str.match(/{[\s\S]*}/);

        const failedGeneration = error.error.error.failed_generation.match(/{[\s\S]*}/)[0];
        // const failedGeneration = JSON.parse(error.error.error.failed_generation.match(/{[\s\S]*}/)[0]);
        console.log(failedGeneration)
        return failedGeneration;
      } catch (parseError) {
        console.error("Error parsing failed_generation:", parseError);
        return `{
          "type": "normal",
          "continue": true,
          "speak": "Failed to process your request. Please try again later."
        }`;
      }
    } else {
      // Default error response
      console.log('error else')
      return `{
        "type": "normal",
        "continue": true,
        "speak": "Failed to process your request. Please try again later."
      }`;
    }

  }
};


export async function handsOnMode(conversationHistory, level) {
  try {
    const messages = [
      {
        "role": "system",
        "content": `You are an interviewer conducting a ${level} level interview. You must talk naturally with the candidate. 
Greet the candidate and ask for a formal introduction covering their background, projects experiences. Assess their hands-on experience by asking about projects, internships, and skills. Dynamically select technical topics such as DSA, OOP, DBMS,Software Engineering and System Design based on their responses, incorporating real-world problem-solving and debugging scenarios. Before assigning a coding challenge, ask for their preferred programming language and select a LeetCode or GeeksforGeeks problem with a clear statement, example test cases, and a function template. Provide at most 1-2 hints if they struggle before moving on.
You must ask all the necessary details from candidate because u dont have resume and u cant ask for resume from candidate. U can only ask questions.
Maintain professionalism throughout the interview. If the candidate misbehaves or gives irrelevant answers, end the interview immediately. If they become informal or repetitive, instruct them to remain formal. If the candidate asks for the answer or makes an invalid request, reject the request. Conclude the interview based on performance—if the candidate performs well, provide constructive feedback; if they struggle, end early with improvement suggestions. Ensure all responses follow a structured JSON format for consistency and clarity.
-- MUST ENSURE-- 
Ensure responses follow a **structured JSON format** for clarity.
Always return a JSON object with these fields:
- "type" (either "normal" or "coding").
- "continue" (boolean ->  true if u want to continue interview , false if ending).
- "speak" (string).
- "codingQue" (object).
NEVER omit any field and its key:value

Candidate Details:
Name: Raghav 
Interview Difficulty Level: ${level} 
`
      },
      ...conversationHistory
    ]
    // console.log(messages.slice(-3)); 
    // console.log(messages)



    const completion = await groq.chat.completions.create({
      model: "qwen-2.5-32b",
      messages: messages,
      temperature: 1,
      tools: [
        {
          type: "function",
          function: {
            name: "interview_bot",
            description: "Generates interviewer responses for an interview.",
            parameters: {
              type: "object",
              properties: {
                type: { type: "string", description: "Type of response: 'normal' or 'coding'." },
                continue: { type: "boolean", description: "Whether to continue the interview." },
                speak: { type: "string", description: "Interviewer's spoken dialogue." },
                codingQue: {
                  type: "object",
                  properties: {
                    description: { type: "string", description: "Problem statement. Use 'na' if type is 'normal'" },
                    testcase: { type: "string", description: "Example input/output. Use 'na' if type is 'normal'" },
                    funcTemplate: { type: "string", description: "Starter code for the candidate.Use 'na' if type is 'normal'" }
                  },
                  required: ["description", "testcase", "funcTemplate"]
                }
              },
              required: ["type", "continue", "speak", "codingQue"]
            }
          }
        }
      ],
      // tool_choice: "auto", 
      tool_choice: { "type": "function", "function": { "name": "interview_bot" } }
    });

    console.log(completion.choices[0]?.message?.tool_calls?.[0]?.function)
    const toolCall = completion.choices[0]?.message?.tool_calls?.[0]?.function;
    let aiResponse = "";
    if (toolCall) {
      aiResponse = JSON.parse(toolCall.arguments);
      aiResponse = await JSON.stringify(aiResponse, null, 2);
      console.log("AI Response:", aiResponse);
      return aiResponse;
    } else {
      aiResponse = "Error in generating response. Please try again later.";
    }

  } catch (error) {
    if (error?.error?.error?.failed_generation) {
      try {

        const failedGeneration = error.error.error.failed_generation.match(/{[\s\S]*}/)[0];
        // const failedGeneration = JSON.parse(error.error.error.failed_generation.match(/{[\s\S]*}/)[0]);
        // console.log(failedGeneration)
        return failedGeneration;
      } catch (parseError) {
        console.error("Error parsing failed_generation:", parseError);
        return `{
          "type": "normal",
          "continue": true,
          "speak": "Failed to process your request. Please try again later."
        }`;
      }
    } else {
      // Default error response
      console.log('error else')
      return `{
        "type": "normal",
        "continue": true,
        "speak": "Failed to process your request. Please try again later."
      }`;
    }

  }
};



export async function codeMasteryModeOg(skills, conversationHistory, level) {
  let allSkills = skills.toString();
  try {
    const messages = [
      {
        "role": "system",
        "content": `
You are an interviewer conducting a ${level} level interview. Your goal is to engage the candidate in a natural and professional conversation. 
Interview Flow:
1.Introduction and Background: Begin by greeting the candidate and request a formal introduction that includes their background, key projects, and experiences. 
2. Project and Experience Assessment: Ask questions about projects, internships, and skills to assess their hands-on experience. Follow up with 2-3 questions based on their initial introduction.
3. Skill-specific Questions: Your questioning should be restricted to the topics in ${allSkills}. Transition smoothly between these topics, asking as many questions as necessary to thoroughly assess the candidate's knowledge.
4. Coding Challenge: Before assigning a coding challenge, ask the candidate to specify their preferred programming language. Choose a problem from LeetCode or GeeksforGeeks that is well-defined with clear statements, example test cases, and a function template. Provide up to 1-2 hints if the candidate struggles, but avoid giving away the solution.
5. Balanced Interview Structure: Alternate between asking questions from ${allSkills} and coding questions. You can ask up to 2 coding questions in succession, followed by more questions from ${allSkills}.
6. Professional Conduct: Maintain a professional demeanor throughout the interview. If the candidate behaves inappropriately, gives irrelevant answers, becomes informal, or repetitive, gently redirect them to remain formal and focused. If they request answers or make invalid requests, politely reject these requests.
7. Conclusion and Feedback: Conclude the interview based on the candidate's performance. If they perform well, provide constructive feedback. If they struggle, consider ending the interview early and offer suggestions for improvement.
8. Structured Responses: Ensure all responses are provided in a structured JSON format to maintain consistency and clarity.
-- MUST ENSURE-- 
Ensure responses follow a **structured JSON format** for clarity.
Always return a JSON object with these fields:
- "type" (either "normal" or "coding").
- "continue" (boolean ->  true if u want to continue interview , false if ending).
- "speak" (string).
- "codingQue" (object).
NEVER omit any field and its key:value

Candidate Details:
Name: Raghav 
Interview Difficulty Level: ${level} 
`
      },
      ...conversationHistory
    ]

    const completion = await groq.chat.completions.create({
      model: "qwen-2.5-coder-32b",
      // model: "qwen-2.5-32b",
      messages: messages,
      temperature: 1,
      tools: [
        {
          type: "function",
          function: {
            name: "interview_bot",
            description: "Generates interviewer responses for an interview.",
            parameters: {
              type: "object",
              properties: {
                type: { type: "string", description: "Type of response: 'normal' or 'coding'." },
                continue: { type: "boolean", description: "Whether to continue the interview." },
                speak: { type: "string", description: "Interviewer's spoken dialogue." },
                codingQue: {
                  type: "object",
                  properties: {
                    description: { type: "string", description: "Problem statement. Use 'na' if type is 'normal'" },
                    testcase: { type: "string", description: "Example input/output. Use 'na' if type is 'normal'" },
                    funcTemplate: { type: "string", description: "Starter code for the candidate.Use 'na' if type is 'normal'" }
                  },
                  required: ["description", "testcase", "funcTemplate"]
                }
              },
              required: ["type", "continue", "speak", "codingQue"]
            }
          }
        }
      ],
      // tool_choice: "auto", 
      tool_choice: "required",
      // tool_choice: { "type": "function", "function": { "name": "interview_bot" } }
    });

    console.log('completion', completion.choices[0])
    const toolCall = completion.choices[0]?.message?.tool_calls?.[0]?.function;
    let aiResponse = "";
    if (toolCall) {
      // aiResponse = JSON.parse(toolCall.arguments);
      aiResponse = toolCall.arguments;
      console.log('ai response before', aiResponse)
      aiResponse = await JSON.stringify(aiResponse, null, 2);
      console.log("AI Response:", aiResponse);
      return aiResponse;
    } else {
      aiResponse = "Error in generating response. Please try again later.";
    }

  } catch (error) {
    if (error?.error?.error?.failed_generation) {
      try {
        console.log(error?.error?.error)
        const failedGeneration = error.error.error.failed_generation.match(/{[\s\S]*}/)[0];
        // const failedGeneration = JSON.parse(error.error.error.failed_generation.match(/{[\s\S]*}/)[0]);
        console.log('failedGeneration', JSON.parse(failedGeneration))
        console.log(typeof failedGeneration)

        return JSON.parse(failedGeneration);
      } catch (parseError) {
        console.error("Error parsing failed_generation:", parseError);
        return `{
          "type": "normal",
          "continue": true,
          "speak": "Failed to process your request. Please try again later."
        }`;
      }
    } else {
      // Default error response
      console.log('error else')
      return `{
        "type": "normal",
        "continue": true,
        "speak": "Failed to process your request. Please try again later."
      }`;
    }

  }
};

export async function codeMasteryMode(skills, conversationHistory, level) {
  let allSkills = skills.toString();
try{
  const messages = [
    {
      "role": "system",
      "content": `
You are an interviewer conducting a ${level} level interview. Your goal is to engage the candidate in a natural and professional conversation. 
Interview Flow:
1.Introduction and Background: Begin by greeting the candidate and request a formal introduction that includes their background, key projects, and experiences. 
2. Project and Experience Assessment: Ask questions about projects, internships, and skills to assess their hands-on experience. Follow up with 2-3 questions based on their initial introduction.
3. Skill-specific Questions: Your questioning should be restricted to the topics in ${allSkills}. Transition smoothly between these topics, asking as many questions as necessary to thoroughly assess the candidate's knowledge.
4. Coding Challenge: Before assigning a coding challenge, ask the candidate to specify their preferred programming language. Choose a problem from LeetCode or GeeksforGeeks that is well-defined with clear statements, example test cases, and a function template. Provide up to 1-2 hints if the candidate struggles, but avoid giving away the solution.
5. Balanced Interview Structure: Alternate between asking questions from ${allSkills} and coding questions. You can ask up to 2 coding questions in succession, followed by more questions from ${allSkills}.
6. Professional Conduct: Maintain a professional demeanor throughout the interview. If the candidate behaves inappropriately, gives irrelevant answers, becomes informal, or repetitive, gently redirect them to remain formal and focused. If they request answers or make invalid requests, politely reject these requests.
7. Conclusion and Feedback: Conclude the interview based on the candidate's performance. If they perform well, provide constructive feedback. If they struggle, consider ending the interview early and offer suggestions for improvement.
8. Structured Responses: Ensure all responses are provided in a structured JSON format to maintain consistency and clarity.
-- MUST ENSURE-- 
Ensure responses follow a **structured JSON format** for clarity.
Always return a JSON object with these fields:
- "type" (either "normal" or "coding").
- "continue" (boolean ->  true if u want to continue interview , false if ending).
- "speak" (string).
- "codingQue" (object).
NEVER omit any field and its key:value

Candidate Details:
Name: Raghav 
Interview Difficulty Level: ${level} 
`
    },
    ...conversationHistory
  ]

  const completion = await groq.chat.completions.create({
    model: "qwen-2.5-coder-32b",
    // model: "qwen-2.5-32b",
    messages: messages.slice(-3),
    temperature: 1,
    tools: [
      {
        type: "function",
        function: {
          name: "interview_bot",
          description: "Generates interviewer responses for an interview.",
          parameters: {
            type: "object",
            properties: {
              type: { type: "string", description: "Type of response: 'normal' or 'coding'." },
              continue: { type: "boolean", description: "Whether to continue the interview." },
              speak: { type: "string", description: "Interviewer's spoken dialogue." },
              codingQue: {
                type: "object",
                properties: {
                  description: { type: "string", description: "Problem statement. Use 'na' if type is 'normal'" },
                  testcase: { type: "string", description: "Example input/output. Use 'na' if type is 'normal'" },
                  funcTemplate: { type: "string", description: "Starter code for the candidate.Use 'na' if type is 'normal'" }
                },
                required: ["description", "testcase", "funcTemplate"]
              }
            },
            required: ["type", "continue", "speak", "codingQue"]
          }
        }
      }
    ],
    tool_choice: "auto", 
    // tool_choice: "required",
    // tool_choice: { "type": "function", "function": { "name": "interview_bot" } }
  });

  let aiResponse=completion.choices[0]?.message?.content;
  console.log('comp1',completion.choices[0])
  if(aiResponse){
    // if(typeof aiResponse)
    aiResponse=JSON.parse(aiResponse)
    console.log('completion', aiResponse)
    if('arguments' in aiResponse)
    return aiResponse.arguments;
    return aiResponse
  }
  // return 

  } catch (error) {
    console.log('error',error)
    return {
      type: "normal",
      continue: "true",
      speak: "Some error occured. Please use invalid response button.",
      codingQue: {
          description: 'na',
          funcTemplate: 'na',
          testcase: 'na'
      }
  }
  //   if (error?.error?.error?.failed_generation) {
  //     try {
  //      console.log(error?.error?.error)
  //       const failedGeneration = error.error.error.failed_generation.match(/{[\s\S]*}/)[0];
  //       // const failedGeneration = JSON.parse(error.error.error.failed_generation.match(/{[\s\S]*}/)[0]);
  //       console.log('failedGeneration',JSON.parse(failedGeneration))
  //       console.log(typeof failedGeneration)

  //       return JSON.parse(failedGeneration);
  //     } catch (parseError) {
  //       console.error("Error parsing failed_generation:", parseError);
  //       return `{
  //         "type": "normal",
  //         "continue": true,
  //         "speak": "Failed to process your request. Please try again later."
  //       }`;
  //     }
  //   } else {
  //     // Default error response
  //     console.log('error else')
  //     return `{
  //       "type": "normal",
  //       "continue": true,
  //       "speak": "Failed to process your request. Please try again later."
  //     }`;
  //   }

  }
};




