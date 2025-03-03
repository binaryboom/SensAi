const api=import.meta.env.VITE_BACKEND_API;

export const resumeInsightMode = async (userInput = '', properties) => {
  console.log(' calling resume insight mode')
  console.log('user input in ai func js', userInput);

  const { userData, conversationHistory, setConversationHistory, setAiQuestion,setLayout, setQueType,setCodingQuestion, setUserResponse ,changeVideo,female2 ,setAiSpeaking,navigate} = properties;

  // Append the latest user input to a new variable
  const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: userInput }
  ];

  setConversationHistory(updatedHistory); // Update state with new history

  const res = await fetch(`${api}/resume-insight`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          resume: userData.resume,
          level: userData.level,
          conversationHistory: updatedHistory, // Use updated history
      }),
  });

  const raw = await res.json();
  setUserResponse("");
  const data= extractFields(raw.message);
  console.log('extracted data',data);
  setQueType(data.type);
  setAiQuestion(data.speak);
  if(data.type=='coding'){
    setCodingQuestion(data.codingQue)
    // setLayout(3);
  }else{
    setLayout(1);
  }
  
  speakQue(data.speak,changeVideo,female2,setAiSpeaking,data.continue,navigate);
 

  setConversationHistory(prevHistory => [
      ...prevHistory,
      { role: "assistant", content: raw.message }
      // { role: "assistant", content: data.speak }
  ]);
};


export const handsOnMode = async (userInput = '', properties) => {
  console.log('calling hands on mode')
  console.log('user input in ai func js', userInput);


  const { userData, conversationHistory, setConversationHistory, setAiQuestion,setLayout, setQueType,setCodingQuestion, setUserResponse ,changeVideo,female2 ,setAiSpeaking,navigate} = properties;

  // Append the latest user input to a new variable
  const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: userInput }
  ];

  setConversationHistory(updatedHistory); // Update state with new history

  const res = await fetch(`${api}/hands-on`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          level: userData.level,
          conversationHistory: updatedHistory, // Use updated history
      }),
  });

  const raw = await res.json();
  setUserResponse("");
  const data= extractFields(raw.message);
  console.log('extracted data',data);
  setQueType(data.type);
  setAiQuestion(data.speak);
  if(data.type=='coding'){
    setCodingQuestion(data.codingQue)
    // setLayout(3);
  }else{
    setLayout(1);
  }
  
  speakQue(data.speak,changeVideo,female2,setAiSpeaking,data.continue,navigate);
 

  setConversationHistory(prevHistory => [
      ...prevHistory,
      { role: "assistant", content: raw.message }
  ]);
};


export const codeMasteryMode = async (userInput = '', properties) => {
  console.log('calling code mastery mode')
  console.log('user input in ai func js', userInput);


  const { userData, conversationHistory, setConversationHistory, setAiQuestion,setLayout, setQueType,setCodingQuestion, setUserResponse ,changeVideo,female2 ,setAiSpeaking,navigate} = properties;

  // Append the latest user input to a new variable
  const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: userInput }
  ];

  setConversationHistory(updatedHistory); // Update state with new history

  const res = await fetch(`${api}/code-mastery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          skills:userData.skills,
          level: userData.level,
          conversationHistory: updatedHistory, // Use updated history
      }),
  });

  const raw = await res.json();
  setUserResponse("");
  const data= extractFields(raw.message);
  console.log('extracted data',data);
  setQueType(data.type);
  setAiQuestion(data.speak);
  if(data.type=='coding'){
    setCodingQuestion(data.codingQue)
    // setLayout(3);
  }else{
    setLayout(1);
  }
  
  speakQue(data.speak,changeVideo,female2,setAiSpeaking,data.continue,navigate);
 

  setConversationHistory(prevHistory => [
      ...prevHistory,
      { role: "assistant", content: raw.message }
  ]);
};


//////////////////////////// ai speak func ////////////////
export const speakQue = async (question,changeVideo,character,setAiSpeaking,continueInterview,navigate) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const speech = new SpeechSynthesisUtterance(question);
  
      // const voices = await getVoices();
      // // const selectedVoice = voices.find((voice) => voice.name === voiceName);
      // for(let v of voices){
      //   // if()
      //   console.log(v)
      // }
  
      // if (selectedVoice) {
      //   speech.voice = selectedVoice;
      // } else {
      //   console.warn(`Voice "${voiceName}" not found, using default.`);
      // }
  
      speech.lang = "en-CA"; // Canadian English
      speech.rate = 1; // Speed of speech (1 = normal)
      speech.pitch = 1; // Pitch (1 = normal)
      speech.volume = 1; // Volume (1 = max)

      speech.onstart = () => {
        console.log("Speech started.");
        setAiSpeaking(true)
      };
      
      speech.onend = () => {
       
        console.log("Speech has ended.");
        setAiSpeaking(false)
        if(continueInterview==false){
          navigate('/thank-you')
        }
        
      };
      
      
      synth.speak(speech);
      
     
    } else {
      console.error("Text-to-Speech not supported in this browser.");
    }
  };
  
  const getVoices = () => {
    return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        resolve(voices);
        return;
      }
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    });
  };
 






  ////////////////////////////////// json functions///////////////////////////////////////////////////////

  function extractFields(jsonString) {
    let data;
    try {
        // Attempt to parse the JSON string
        data = JSON.parse(jsonString);
    } catch (e) {
        // If parsing fails, use string-based search
        console.log("JSON parsing failed, falling back to string-based search.");
        return extractFieldsFromString(jsonString);
    }

    // If JSON parsing is successful, extract fields
    const result = {
        type: data.type || 'normal',
        continue: data.continue==false? false : true,
        speak: data.speak || 'Some error occured. Please use invalid response button.',
        codingQue: {
            description: data.codingQue?.description || 'na',
            funcTemplate: data.codingQue?.funcTemplate || 'na',
            testcase: data.codingQue?.testcase || 'na'
        }
    };

    return result;
}

function extractFieldsFromString(jsonString) {
    const result = {
        type: "normal",
        continue: "true",
        speak: "Some error occured. Please use invalid response button.",
        codingQue: {
            description: 'na',
            funcTemplate: 'na',
            testcase: 'na'
        }
    };

    // Regular expressions to extract values
    const typeMatch = jsonString.match(/"type"\s*:\s*"([^"]+)"/);
    const continueMatch = jsonString.match(/"continue"\s*:\s*(true|false)/);
    const speakMatch = jsonString.match(/"speak"\s*:\s*"([^"]+)"/);
    const descriptionMatch = jsonString.match(/"description"\s*:\s*"([^"]+)"/);
    const funcTemplateMatch = jsonString.match(/"funcTemplate"\s*:\s*"([^"]+)"/);
    const testcaseMatch = jsonString.match(/"testcase"\s*:\s*"([^"]+)"/);

    // Assign extracted values
    if (typeMatch) result.type = typeMatch[1];
    if (continueMatch) result.continue = continueMatch[1] == 'true';
    if (speakMatch) result.speak = speakMatch[1];
    if (descriptionMatch) result.codingQue.description = descriptionMatch[1];
    if (funcTemplateMatch) result.codingQue.funcTemplate = funcTemplateMatch[1];
    if (testcaseMatch) result.codingQue.testcase = testcaseMatch[1];

    return result;
}

// Example usage
// const jsonString = `{
//   "type": "normal",
//   "continue": true,
//   "speak": "Great choice, Raghav. For this coding challenge, I'll select a problem from LeetCode or GeeksforGeeks. Could you provide a solution to the problem below in PHP?"

// "codingQued: {
//   "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. (Example problem from LeetCode)",
//   "funcTemplate": "function addTwoNumbers($l1, $l2) {\\n    // Your code here\\n}",
//   "testcase": "Example 1:\\nInput: l1 = [2,4,3], l2 = [5,6,4]\\nOutput: [7,0,8]\\nExplanation: 342 + 465 = 807.\\n\\nExample 2:\\nInput: l1 = [0], l2 = [0]\\nOutput: [0]\\n\\nExample 3:\\nInput: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\\nOutput: [8,9,9,9,0,0,0,1]"
// }
// }`;

// const extractedData = extractFields(jsonString);
// console.log(extractedData);