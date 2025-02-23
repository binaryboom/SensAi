import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect } from "react";
import { Button } from '../ui/button';

const Stt = ({setUserResponse}) => {
    const startListening = () =>{console.log('started'); SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })};
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return window.alert('not supported');
    }

    useEffect(() => {
        console.log("Listening:", listening);
        console.log("Transcript:", transcript);
    }, [listening, transcript]);

    return (
        <div className=" mt-12">
            <div className="fixed z-50 bottom-5 left-1/2 md:left-1/2 md:transform md:-translate-x-1/2">  
            {/* og upar wala */}
            {/* <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2"> */}
                {!listening ? (
                    <Button id='rk' onClick={startListening}>Start Answering</Button>
                ) : (
                    <Button  onClick={()=>{SpeechRecognition.stopListening(); setUserResponse(transcript)}}>Send Answer</Button>
                )}
            </div>
            {/* <p className="mt-4 text-center">{transcript}</p> */}
        </div>
    );
};

export default Stt;
