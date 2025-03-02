import React, { useEffect, useRef, useState } from "react";
import InterviewHeader from "./InterviewHeader";
import StartBtn from "../ui/StartBtn";
import { OctagonAlert } from 'lucide-react';
import CodingPlayground from "./CodingPlayground";
import { motion } from "framer-motion";
import { useLocation } from "react-router";
import { resumeInsightMode } from "./AiFunc";
import Stt from "../utils/stt";
import { female2 } from "./AiCharacters";

// IndexedDB Utility Functions
const DB_NAME = 'VideoDB';
const STORE_NAME = 'videos';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export function saveVideoToDB(key, videoBlob) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(videoBlob, key);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  });
}

export function getVideoFromDB(key) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  });
}

const Interview = () => {
  const location = useLocation();
  const videoRef = useRef(null); // User video
  const interviewerRef = useRef(null); // Interviewer video
  const containerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPC, setIsPC] = useState(window.innerWidth > 1024);
  const [layout, setLayout] = useState(1); // Default Layout 1
  const [conversationHistory, setConversationHistory] = useState([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiSpeaking, setAiSpeaking] = useState(true);
  const [codingQuestion, setCodingQuestion] = useState("");
  const [queType, setQueType] = useState("normal");
  const [userResponse, setUserResponse] = useState("");
  const userData = location.state.userData;
  const aiSpeakingRef = useRef(false); // Track aiSpeaking dynamically

  useEffect(() => {
    aiSpeakingRef.current = aiSpeaking; // Update ref whenever aiSpeaking changes
  }, [aiSpeaking]);

  const changeVideo = async (videoSrc) => {
    try {
      console.log("Changing video to:", videoSrc); // Debugging statement

      // Check if the video is already in IndexedDB
      const videoBlob = await getVideoFromDB(videoSrc);

      if (videoBlob) {
        // If the video is found in IndexedDB, use it
        const videoURL = URL.createObjectURL(videoBlob);
        interviewerRef.current.src = videoURL;
        interviewerRef.current.load();
        interviewerRef.current.play();
      } else {
        // If the video is not in IndexedDB, fetch it and store it
        const response = await fetch(videoSrc);
        const blob = await response.blob();
        await saveVideoToDB(videoSrc, blob);

        const videoURL = URL.createObjectURL(blob);
        interviewerRef.current.src = videoURL;
        interviewerRef.current.load();
        interviewerRef.current.play();
      }
    } catch (error) {
      console.error("Error changing video:", error);
    }
  };

  const properties = {
    conversationHistory,
    setConversationHistory,
    setAiQuestion,
    userData,
    setQueType,
    setCodingQuestion,
    setUserResponse,
    setLayout,
    changeVideo,
    female2,
    setAiSpeaking,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Run only when the page is opened (first render)
    async function startInterview() {
      try {
        console.log('calling start interview');
        if (interviewerRef.current) {
          aiSpeaking ? changeVideo(female2.speakingVideo) : changeVideo(female2.listeningVideo);
        }
        await resumeInsightMode(userResponse, properties);
      } catch (error) {
        console.error("Error in startInterview:", error);
      }
    }
    startInterview();
  }, []); // Empty dependency array = runs only once on mount

  useEffect(() => {
    if (userResponse.length > 0) {
      async function continueInterview() {
        try {
          console.log('calling continue interview');
          await resumeInsightMode(userResponse, properties);
        } catch (error) {
          console.error("Error in continueInterview:", error);
        }
      }
      continueInterview();
    }
  }, [userResponse]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    setTimeout(() => enterFullScreen(changeVideo), 500);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (queType === 'normal') startWebcam();
  }, [layout, queType]);

  // Watch for changes in aiSpeaking and update video
  useEffect(() => {
    if (interviewerRef.current) {
      aiSpeaking ? changeVideo(female2.speakingVideo) : changeVideo(female2.listeningVideo);
    }
  }, [aiSpeaking]);

  // Watch for changes in layout and queType to ensure video is rendered
  useEffect(() => {
    if (layout === 1 && queType === 'normal' && interviewerRef.current) {
      aiSpeaking ? changeVideo(female2.speakingVideo) : changeVideo(female2.listeningVideo);
    }
  }, [layout, queType]);

  const enterFullScreen = async (changeVideo) => {
    if (containerRef.current.requestFullscreen) {
      try {
        await containerRef.current.requestFullscreen();
        startWebcam();
        if (aiSpeakingRef.current) {
          console.log('full screen event 1');
          changeVideo(female2.speakingVideo);
        } else {
          console.log('full screen event 2');
          changeVideo(female2.listeningVideo);
        }
      } catch (err) {
        console.error("Error entering full screen:", err);
      }
    }
  };

  useEffect(() => {
    if (isFullScreen && interviewerRef.current) {
      console.log('Restoring video after full-screen re-entry');
      aiSpeakingRef.current ? changeVideo(female2.speakingVideo) : changeVideo(female2.listeningVideo);
    }
  }, [isFullScreen, layout]);

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  return (
    <div ref={containerRef} className="h-screen w-full bg-black/50 flex flex-col text-white">
      <div className="grid-background" />
      {!isFullScreen ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-xl text-red-600 text-center font-semibold"> <OctagonAlert className="w-5 h-5 md:ml-2 inline" /> Warning: <br /> Full-Screen Mode Required</h3>
          <p className="text-md text-center mt-8">To proceed with the interview, <br /> please enable full-screen mode.</p>
          <StartBtn onClick={() => { enterFullScreen(changeVideo) }} text="Continue Interview" />
        </div>
      ) : (
        <>
          <InterviewHeader exitFullScreen={exitFullScreen} layout={layout} setLayout={setLayout} queType={queType} />

          <div className="relative flex-grow flex items-center justify-center">
            {userResponse.length <= 0 &&
              <Stt setUserResponse={setUserResponse} queType={queType} />
            }
            {layout === 1 && queType === 'normal' && (
              <>
                <video
                  ref={interviewerRef}
                  autoPlay
                  loop
                  muted={true}
                  className="w-[90%] mt-8 h-[100%] border-2 border-gray-700 rounded-lg shadow-lg object-cover"
                ></video>

                <div className="absolute bottom-16 right-4 w-40 h-40 bg-black rounded-lg shadow-lg border-2 border-gray-700 overflow-hidden">
                  <video muted={true} ref={videoRef} autoPlay className="w-full h-full scale-x-[-1] object-cover"></video>
                </div>
              </>
            )}

            {layout === 2 && queType === 'normal' && (
              <div className={`mt-[50px] w-full h-full flex ${isPC ? "flex-row" : "flex-col"}`}>
                <video
                  ref={interviewerRef}
                  autoPlay
                  loop
                  muted
                  className={`${isPC ? "w-1/2 h-full border-r-2" : "w-full h-1/2 border-b-2"} border-gray-700 object-cover`}
                ></video>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className={`${isPC ? "w-1/2 h-full" : "w-full h-1/2"} scale-x-[-1] object-cover`}
                ></video>
              </div>
            )}

            {queType === 'coding' && (
              <>
                <CodingPlayground codingQue={codingQuestion} setUserResponse={setUserResponse} />
                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "tween", duration: 0.5 }}
                  className="absolute bottom-16 right-4 w-40 h-40 bg-black rounded-lg shadow-lg border-2 border-gray-700 overflow-hidden z-50"
                >
                  <video loop muted ref={interviewerRef} autoPlay className="w-full h-full object-cover"></video>
                </motion.div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Interview;