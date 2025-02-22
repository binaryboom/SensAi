import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useEffect, useState} from "react"
import { Button } from '../ui/button';


const Stt = () => {
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript,listening, browserSupportsSpeechRecognition ,browserSupportsContinuousListening} = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return window.alert('not supported')
    }
  
    useEffect(() => {
        console.log("Listening:", listening);
        console.log("Transcript:", transcript);
    }, [listening, transcript]);

    return (
            <div className=" mt-12">

                <div className="btn-style mt-[300px]">
                    {!listening &&
                     <Button onClick={startListening}>Start Listening</Button>
                    }
                    {
                    listening &&
                    <Button onClick={SpeechRecognition.stopListening}>Stop Listening</Button>
                    }
                    {transcript}
                </div>
            </div>
    );
};

export default Stt;