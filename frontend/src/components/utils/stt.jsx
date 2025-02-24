import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from "react";
import { Button } from '../ui/button';

const Stt = ({setUserResponse,code,submitBtnRef}) => {
    const startListening = () =>{console.log('started'); SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })};
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return window.alert('not supported');
    }
    const [isListeningStopped, setIsListeningStopped] = useState(false);

    const handleStopListening = () => {
      SpeechRecognition.stopListening();
      setIsListeningStopped(true); // Trigger useEffect when listening stops
    };
  
    useEffect(() => {
      if (isListeningStopped && transcript.length > 0) {
        setUserResponse(transcript);
        setIsListeningStopped(false); // Reset flag after updating response
      }
    }, [isListeningStopped]);

    useEffect(() => {
        console.log("Listening:", listening);
        console.log("Transcript:", transcript);
    }, [listening, transcript]);

    useEffect(() => {
        const handleSubmitClick = () => {
            setUserResponse(code);
        };

        if (submitBtnRef?.current) {
            submitBtnRef.current.addEventListener("click", handleSubmitClick);
        }

        // Cleanup function to remove the event listener
        // return () => {
        //     if (submitBtnRef?.current) {
        //         submitBtnRef.current.removeEventListener("click", handleSubmitClick);
        //     }
        // };
    }, [submitBtnRef]);

    return (
        <div className=" mt-12">
            <div className="fixed z-50 bottom-5 left-1/2 md:left-1/2 md:transform md:-translate-x-1/2">  
            {/* og upar wala */}
            {/* <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2"> */}
                {!listening ? (
                    <Button onClick={startListening}>Start Answering</Button>
                ) : (
                    <Button  onClick={()=>{ handleStopListening()}}>Send Answer</Button>
                    // <Button  onClick={()=>{SpeechRecognition.stopListening();  setUserResponse(transcript)}}>Send Answer</Button>
                )}
            </div>
            {/* <p className="mt-4 text-center">{transcript}</p> */}
        </div>
    );
};

export default Stt;
