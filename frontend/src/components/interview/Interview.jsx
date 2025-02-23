import React, { useEffect, useRef, useState } from "react";
import InterviewHeader from "./InterviewHeader";
import StartBtn from "../ui/StartBtn";
import { OctagonAlert } from 'lucide-react';
import CodingPlayground from "./CodingPlayground";
import { motion } from "framer-motion";
import davidVideo from '/david-case.mp4'
import { useLocation } from "react-router";
import { resumeInsightMode, speakQue } from "./AiFunc";
import Stt from "../utils/stt";



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
  const [queType, setQueType] = useState("normal");
  const [userResponse, setUserResponse] = useState("");
  const userData = location.state.userData;
  console.log('interview', userData)

  const properties = {
    setConversationHistory, setAiQuestion, userData, setQueType, setUserResponse
  }

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
    async function startInterview() {
      try {
        await resumeInsightMode(userResponse, properties);
      } catch (error) {
        console.error("Error in startInterview:", error);
      }
    }
    startInterview()
  }, [userData,userResponse]);

  // useEffect(() => {
  //   // async function speakQue() {
  //   //   try {
  //   //     await speak(aiQuestion);
  //   //   } catch (error) {
  //   //     console.error("Error in speaking:", error);
  //   //   }
  //   // }
  //   // startInterview()
  //   speakQue(aiQuestion)
  // }, [aiQuestion]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    setTimeout(() => enterFullScreen(), 500);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    startWebcam();
  }, [layout]);

  const enterFullScreen = async () => {
    if (containerRef.current.requestFullscreen) {
      try {
        await containerRef.current.requestFullscreen();
        startWebcam();
      } catch (err) {
        console.error("Error entering full screen:", err);
      }
    }
  };

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
      if (interviewerRef.current) {
        interviewerRef.current.src = davidVideo;
        interviewerRef.current.load();
        interviewerRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };


  return (
    <div ref={containerRef} className="h-screen w-full  bg-black/50 flex flex-col text-white">
      <div className="grid-background" />
      {!isFullScreen ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-xl text-red-600  text-center font-semibold"> <OctagonAlert className="w-5 h-5 md:ml-2 inline" /> Warning: <br /> Full-Screen Mode Required</h3>
          <p className="text-md text-center mt-8">To proceed with the interview, <br /> please enable full-screen mode.</p>
          <StartBtn onClick={enterFullScreen} text="Start Interview" />
        </div>
      ) : (
        <>
          <InterviewHeader exitFullScreen={exitFullScreen} layout={layout} setLayout={setLayout} />

          <div className="relative flex-grow flex items-center justify-center">
            {userResponse.length <= 0 &&
              <Stt setUserResponse={setUserResponse} />
            }
            {layout === 1 && (
              <>
                <video
                  ref={interviewerRef}
                  autoPlay
                  muted={true}
                  className="w-[90%] mt-8 h-[100%] border-2  border-gray-700 rounded-lg shadow-lg object-cover"
                ></video>
                {/* w-[82%] h-[80%]  without mt-8*/}

                <div className="absolute bottom-16 right-4 w-40 h-40 bg-black rounded-lg shadow-lg border-2 border-gray-700 overflow-hidden">
                  <video muted={true} ref={videoRef} autoPlay className="w-full h-full object-cover"></video>
                </div>
                {/* bottom-16 */}
              </>
            )}

            {layout === 2 && (
              <div className={`mt-[50px] w-full h-full flex ${isPC ? "flex-row" : "flex-col"}`}>
                {/* Layout 2: Left-Right on PC, Top-Bottom on Mobile */}
                <video
                  ref={interviewerRef}
                  autoPlay

                  className={`${isPC ? "w-1/2 h-full border-r-2" : "w-full h-1/2 border-b-2"} border-gray-700 object-cover`}
                ></video>
                <video
                  ref={videoRef}
                  autoPlay

                  className={`${isPC ? "w-1/2 h-full" : "w-full h-1/2"} object-cover`}
                ></video>
              </div>
            )}

            {queType === 'coding' && (
              <>
                <CodingPlayground />
                <motion.div
                  initial={{ x: 200, opacity: 0 }} // Start from right (off-screen)
                  animate={{ x: 0, opacity: 1 }} // Animate to its final position
                  transition={{ type: "tween", duration: 0.5 }} // Smooth animation
                  className="absolute bottom-16 right-4 w-40 h-40 bg-black rounded-lg shadow-lg border-2 border-gray-700 overflow-hidden z-50"
                >
                  <video ref={interviewerRef} autoPlay className="w-full h-full object-cover"></video>
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
