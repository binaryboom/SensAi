const api=import.meta.env.VITE_BACKEND_API;

export const resumeInsightMode = async (userInput = '', properties) => {
  console.log('user input in ai func js', userInput);

  const { userData, conversationHistory, setConversationHistory, setAiQuestion,setLayout, setQueType,setCodingQuestion, setUserResponse ,changeVideo,female2 ,setAiSpeaking} = properties;

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
  const data = JSON.parse(raw.message);

  console.log(data.type);
  setQueType(data.type);
  setAiQuestion(data.speak);
  if(data.type=='coding'){
    setCodingQuestion(data.codingQue)
    // setLayout(3);
  }else{
    setLayout(1);
  }
  // if (changeVideo) {
  //   changeVideo(female2.speakingVideo); // Call the function when speech ends
  // }
  speakQue(data.speak,changeVideo,female2,setAiSpeaking);
  setUserResponse("");

  setConversationHistory(prevHistory => [
      ...prevHistory,
      { role: "assistant", content: raw.message }
      // { role: "assistant", content: data.speak }
  ]);
};


export const speakQue = async (question,changeVideo,character,setAiSpeaking) => {
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
        // monitorSpeechState();
      };
      
      speech.onend = () => {
        console.log("Speech has ended.");
        setAiSpeaking(false)
        // clearInterval(monitorInterval); // Stop the loop
        // if (changeVideo) {
        //   changeVideo(character.listeningVideo); // Set final state after speech ends
        // }
      };
      
      let monitorInterval;
      
      function monitorSpeechState() {
        monitorInterval = setInterval(() => {
          if (synth.speaking && !synth.paused) {
            console.log("Currently speaking...");
            changeVideo(character.speakingVideo); // Show speaking animation
          } 
        }, 100); // Check every 100ms
      }
  
      synth.speak(speech);
      
      // speech.onend=()=>{
      //   console.log("Speech has ended.");
      //   if (changeVideo) {
      //     changeVideo(character.listeningVideo); // Call the function when speech ends
      //   }
      // }
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
  