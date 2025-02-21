import React, { useState } from "react";
import { Button } from "../ui/button";
// import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Settings } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// import {HashLoader} from 'react-spinners'
import Loader from "../ui/loader";
import StartBtn from "../ui/StartBtn";

const ResumeInsight = () => {
    const [fileName, setFileName] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    // const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            // setProgress(33); // Set progress after file upload
        } else {
            setFileName("");
            // setProgress(0);
        }
    };

    const handleStartInterview = () => {
        setProgress(100);
    };

    return (
        <section id="resume-insight" className="w-full py-12 md:py-24 bg-muted/50 pt-20 md:pt-32 scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
                {/* Title & Subtitle */}
                <h2 className="text-5xl text-center font-bold mb-4 gradient-title">
                    Resume Insight Interview
                </h2>
                <p className="text-center text-lg text-gray-300 max-w-xl mx-auto mb-8">
                    Upload your resume and challenge yourself with AI-driven interview questions.
                </p>

                <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 bg-background p-8 rounded-xl shadow-lg">
                    {/* File Upload Input */}
                    <div className="flex gap-5 justify-between items-center w-full">
                        <div className="text-xl font-semibold text-[rgb(218,255,251)] flex items-center gap-2">
                            <FileText size={22} /> Resume:
                        </div>

                        <label
                            htmlFor="resume-upload"
                            className="cursor-pointer w-[200px] px-6 py-2 flex items-center justify-center gap-2 bg-white font-semibold text-black rounded-lg hover:bg-gray-200 transition md:whitespace-nowrap "
                        >
                            <Upload size={20} />
                            {fileName ? 'Change Resume' : 'Upload Resume'}
                        </label>
                        <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="w-full flex justify-end">
                        {fileName && <p className="text-sm">{fileName}</p>}
                    </div>

                    {/* Select Difficulty */}
                    <div className="flex gap-5 justify-between items-center w-full">
                        <div className="text-xl font-semibold text-[rgb(218,255,251)] flex items-center gap-2">
                            <Settings size={22} /> Choose Difficulty:
                        </div>
                        <Select defaultValue={difficulty} onValueChange={(value) => setDifficulty(value)}>
                            <SelectTrigger className="w-[200px] border-gray-700 bg-white text-black font-semibold">
                                <SelectValue>{difficulty}</SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-white text-black border-gray-700">
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Start Interview Button */}
                    {/* <Button
                        disabled={!fileName}
                        className={`w-full md:w-[200px] py-3 text-xl font-semibold rounded-lg transition-all transform hover:scale-105 ${fileName
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                            : "bg-gray-600 cursor-not-allowed text-gray-300"
                            } `}
                        onClick={handleStartInterview}
                    >
                        🚀
                    </Button> */}


                    <StartBtn onClick={handleStartInterview} disabled={!fileName} text={'Start Interview'}/>

                </div>
                <Loader loading={false}></Loader>
            </div>
        </section>
    );
};

export default ResumeInsight;
