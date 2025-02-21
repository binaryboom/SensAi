import React, { useEffect, useRef, useState } from "react";
import InterviewHeader from "./InterviewHeader";
import StartBtn from "../ui/StartBtn";

const Interview = () => {
  const videoRef = useRef(null); // User video
  const interviewerRef = useRef(null); // Interviewer video
  const containerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPC, setIsPC] = useState(window.innerWidth > 1024);
  const [layout, setLayout] = useState(1); // Default Layout 1

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
        interviewerRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  
  return (
    <div ref={containerRef} className="h-screen w-full bg-gray-900 flex flex-col text-white">
      {!isFullScreen ? (
        <div className="flex items-center justify-center h-full">
          <StartBtn onClick={enterFullScreen} text="Start Interview (Fullscreen)" />
        </div>
      ) : (
        <>
          <InterviewHeader exitFullScreen={exitFullScreen} layout={layout} setLayout={setLayout} />

          <div className="relative flex-grow flex items-center justify-center">
            {layout === 1 && (
              <>
                <video
                  ref={interviewerRef}
                  autoPlay
                  muted
                  className="w-[82%] h-[80%] border-2 border-gray-700 rounded-lg shadow-lg object-cover"
                ></video>

                <div className="absolute bottom-16 right-4 w-40 h-40 bg-black rounded-lg shadow-lg border-2 border-gray-700 overflow-hidden">
                  <video ref={videoRef} autoPlay muted className="w-full h-full object-cover"></video>
                </div>
              </>
            )}

            {layout === 2 && (
              <div className={`w-full h-full flex ${isPC ? "flex-row" : "flex-col"}`}>
                {/* Layout 2: Left-Right on PC, Top-Bottom on Mobile */}
                <video
                  ref={interviewerRef}
                  autoPlay
                  muted
                  className={`${isPC ? "w-1/2 h-full border-r-2" : "w-full h-1/2 border-b-2"} border-gray-700 object-cover`}
                ></video>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className={`${isPC ? "w-1/2 h-full" : "w-full h-1/2"} object-cover`}
                ></video>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Interview;
