import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import Loader from "../ui/loader";
import StartBtn from "../ui/StartBtn";
import { useLocation, useNavigate } from "react-router";


const CompatibilityCheck = () => {
    const [permissions, setPermissions] = useState({ mic: false, camera: false });
    const [loading, setLoading] = useState(true);
    const [isCompatible, setIsCompatible] = useState(true);
    const location =useLocation()
    const navigate=useNavigate()

    const userData=location.state || {};
    // console.log(userData);

    useEffect(() => {
        const checkCompatibility = () => {
            const isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
            setIsCompatible(isSupported);
            return isSupported;
        };

        const requestPermissions = async () => {
            try {
                if (!checkCompatibility()) return;
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                setPermissions({ mic: true, camera: true });
                stream.getTracks().forEach(track => track.stop()); // Stop the stream after checking
            } catch (error) {
                console.error("Error requesting permissions:", error);
                setPermissions({ mic: false, camera: false });
            }
            setLoading(false);
        };

        requestPermissions();
    }, []);

    const handleStartInterview = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setPermissions({ mic: true, camera: true });
            stream.getTracks().forEach(track => track.stop());
            navigate('/interview',{state:{userData}});
        } catch (error) {
            console.error("User denied permissions", error);
            alert("Please grant microphone and camera permissions to proceed.");
            return;
        }
        console.log("Starting interview...");
    };

    return (
        <section id="compatibility-check" className="w-full py-12 md:py-24 bg-muted/50 pt-20 md:pt-32 scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-5xl text-center font-bold mb-4 gradient-title">
                    Compatibility Check
                </h2>
                <p className="text-center text-lg text-gray-300 max-w-xl mx-auto mb-8">
                    Ensure your browser supports AI interviews and has the necessary camera and microphone permissions.
                </p>

                {!isCompatible && (
                    <p className="text-center text-red-500 font-semibold mb-5">Your browser does not support AI interviews. Please use a modern browser like Chrome or Edge.</p>
                )}

                <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 bg-background p-8 rounded-xl shadow-lg">
                    <div className="text-center">
                        <p className="text-lg font-medium" style={{ color: "rgb(218,255,251)" }}>
                            Microphone : <span className={permissions.mic ? "text-green-500" : "text-red-500"}>
                                {permissions.mic ? "Enabled" : "Not Granted"}
                            </span>
                        </p>
                        <p className="text-lg font-medium" style={{ color: "rgb(218,255,251)" }}>
                            Camera : <span className={permissions.camera ? "text-green-500" : "text-red-500"}>
                                {permissions.camera ? "Enabled" : "Not Granted"}
                            </span>
                        </p>
                        <p className="text-lg font-medium" style={{ color: "rgb(218,255,251)" }}>
                            Browser Compatible : <span className={permissions.camera ? "text-green-500" : "text-red-500"}>
                                {permissions.camera && permissions.mic ? "Yes" : "No"}
                            </span>
                        </p>
                    </div>

                    <StartBtn onClick={handleStartInterview} disabled={!isCompatible} text={'Start Interview'} />
                </div>
                {/* <Loader loading={loading} /> */}
            </div>
        </section>
    );
};

export default CompatibilityCheck;
