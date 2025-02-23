const api=import.meta.env.VITE_BACKEND_API;

export const resumeInsightMode = async (userInput='',properties) => {
    console.log('user input in ai func js',userInput)
    const {userData,conversationHistory=[],setConversationHistory,setAiQuestion,setQueType,setUserResponse}=properties;
    const updatedHistory = [...conversationHistory, { role: "user", content: userInput }];

    const res = await fetch(`${api}/resume-insight`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            resume: userData.resume,
            level:userData.level,
            conversationHistory: updatedHistory,
        }),
    });

    const raw = await res.json();
    const data = JSON.parse(raw.message);
    console.log(data.type)
    setQueType(data.type)
    setAiQuestion(data.speak);
    speakQue(data.speak)
    setUserResponse("");
    setConversationHistory([...updatedHistory, { role: "assistant", content: data.aiResponse }]);
};


export const speakQue = async (question, voiceName = "Microsoft Clara Online (Natural) - English (Canada) (en-CA)") => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(question);
  
      const voices = await getVoices();
      const selectedVoice = voices.find((voice) => voice.name === voiceName);
  
      if (selectedVoice) {
        speech.voice = selectedVoice;
      } else {
        console.warn(`Voice "${voiceName}" not found, using default.`);
      }
  
      speech.lang = "en-CA"; // Canadian English
      speech.rate = 1; // Speed of speech (1 = normal)
      speech.pitch = 1; // Pitch (1 = normal)
      speech.volume = 1; // Volume (1 = max)
  
      window.speechSynthesis.speak(speech);
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
  