import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { BadgeAlert, Mic, MicOff, TriangleAlert } from "lucide-react";

const Stt = ({ setUserResponse,queType }) => {
    const [listening, setListening] = useState(false);
    const [finalTranscript, setFinalTranscript] = useState("");
    const [isPaused, setIsPaused] = useState(false);
    const [text, setText] = useState("");

    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            console.error("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setFinalTranscript((prev) => prev + transcript + " ");
                } else {
                    interimTranscript += transcript;
                }
            }
            console.log("Final Transcript:", finalTranscript);
        };

        recognition.onerror = (event) => {
            // console.log("on error 1");
            console.error("Speech recognition error:", event.error);
            setListening(false);
            setIsPaused(true);
            // console.log("on error 2");
        };

        recognition.onend = () => {
            // console.log("on end 1");
            setListening(false);
            setIsPaused(true);
            // console.log("on end 2");
        };

        recognitionRef.current = recognition;

        return () => {
            // console.log("unmount 1");
            recognition.stop();
            // console.log("unmount 2");
        };
    }, []);

    const startListening = () => {
        if (!recognitionRef.current) return;
        recognitionRef.current.start();
        console.log("listening started");
        setListening(true);
        setIsPaused(false);
    };

    const stopListening = () => {
        if (!recognitionRef.current) return;
        // console.log("stop 1");
        recognitionRef.current.stop();
        setListening(false);
        setIsPaused(true);
        // console.log("stop 2");
    };

    const sendAnswer = () => {
        stopListening();
        setUserResponse(finalTranscript.trim());
    };
    const sendAns = () => {
        setUserResponse(text)
    }
    const invalidAiResponse = () => {
        setUserResponse(`-- MUST ENSURE-- 
ONLY respond in the following format:
{type: "", // "normal" for discussion or questions, "coding" for coding problems
continue: "", // "true" if continuing interview, "false" if ending
speak: "", // The interviewer's spoken words
codingQue: { 
    description: "", 
    testcase: "",
    funcTemplate: ""
  }
}`)
    }

    return (
        <div className="mt-12">
           {queType=='normal' && 
           <Button className="fixed top-[100px] right-[7%] z-50  bg-red-600 text-white text-start rounded-md hover:bg-red-700 transition px-2 py-6" onClick={invalidAiResponse}>
                <div className="flex flex-col items-start">
                    <span className="flex items-center gap-1">
                        Invalid <TriangleAlert className="ml-1 scale-115" />
                    </span>
                    <p>Response ?</p>
                </div>
            </Button>
        } 
            <div className="fixed z-50 bottom-5 right-5 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2">
                <textarea
                    className="w-full p-2 border rounded text-black"
                    rows={4}
                    placeholder="Type your answer..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button className="mt-2 w-full mb-1" onClick={sendAns}>Submit Answer</Button>

                {!listening && !isPaused ? (
                    <Button onClick={startListening}><Mic /> Start Answering</Button>
                ) : listening ? (
                    <Button onClick={sendAnswer}><Mic /> Send Answer</Button>
                ) : (
                    <Button onClick={startListening}><MicOff /> Resume</Button>
                )}
            </div>
        </div>
    );
};

export default Stt;
