import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Mic, Mic2, MicOff, Podcast } from "lucide-react";

const Stt = ({ setUserResponse }) => {
    const [listening, setListening] = useState(false);
    const [finalTranscript, setFinalTranscript] = useState("");
    const [isPaused, setIsPaused] = useState(false); // Track if the mic is paused

    // Initialize SpeechRecognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true; // Keep listening even after pauses
    recognition.interimResults = true; // Show interim results
    recognition.lang = "en-US"; // Set language

    // Handle speech recognition results
    recognition.onresult = (event) => {
        let interimTranscript = "";

        // Loop through the results
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                // Append final transcript to the final output
                setFinalTranscript((prev) => prev + transcript + " ");
            } else {
                interimTranscript += transcript;
            }
        }

        // Log interim and final transcripts
        // console.log("Interim Transcript:", interimTranscript);
        console.log("Final Transcript:", finalTranscript);
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.log('on error 1')
        console.error("Speech recognition error:", event.error);
        setListening(false);
        setIsPaused(true); // Set paused state on error
        console.log('on error 2')
    };

    // Handle end of speech recognition
    recognition.onend = () => {
        console.log('on end 1')
        setListening(false)
        setIsPaused(true); // Set paused state when recognition ends
        console.log('on end 2')
    };

    // Start listening
    const startListening = () => {
        recognition.start();
        console.log('listening started')
        setListening(true);
        setIsPaused(false); // Reset paused state
    };

    // Stop listening and send the final transcript
    const handleStop = () => {
        console.log('stop 1')
        recognition.stop();
        setListening(false);
        setIsPaused(true); // Set paused state
        setUserResponse(finalTranscript.trim()); // Send the final transcript to the parent component
        console.log('stop 2')
    };

    // Resume listening from where it left off
    const resumeListening = () => {
        console.log('listening resumed 1')
        recognition.start();
        console.log('listening resumed 2')
        setListening(true);
        setIsPaused(false); // Reset paused state
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            // console.log('unmount 1')
            recognition.stop();
            // console.log('unmount 2')
        };
    }, []);

    return (
        <div className="mt-12">
            <div className="fixed z-50 bottom-5 right-5 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2">
                {!listening && !isPaused ? (
                    <Button onClick={startListening}><Mic/>Start Answering</Button>
                ) : listening ? (
                    <Button onClick={handleStop}><Mic/>Send Answer</Button>
                ) : isPaused && (
                    <Button onClick={resumeListening}><MicOff/> Paused</Button>
                )}
            </div>
        </div>
    );
};

export default Stt;