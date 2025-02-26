import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router";


const ResumeInsight = () => {
    const [fileName, setFileName] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [resume, setResume] = useState("");
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate()
    const api = import.meta.env.VITE_BACKEND_API;
    useEffect(() => {
        // Load PDF.js
        const pdfScript = document.createElement("script");
        // pdfScript.src = "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.min.js";
        pdfScript.src = "/libs/pdf.min.js";
        pdfScript.onload = () => {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            // "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";
            "/libs/pdf.worker.min.js";
        };
        document.body.appendChild(pdfScript);
    
        // Load Tesseract.js
        const tesseractScript = document.createElement("script");
        // tesseractScript.src = "https://unpkg.com/tesseract.js@4.0.2/dist/tesseract.min.js";
        tesseractScript.src = "/libs/tesseract.min.js";
        document.body.appendChild(tesseractScript);
      }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setLoading(true);
        if (file) {
            setFileName(file.name);
           const text= await extractText(file);
            console.log('extracted',text)
            const response = await fetch(`${api}/summarize-text`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ resume :text }),
            });

            const data = await response.json();
            setResume(data.message);
        } else {
            setFileName("");
            setResume("") 
        }
        setLoading(false)
    };

    const extractText = async (file) => {
        if (!file) {
            alert("Please upload a file first.");
            return;
        }
    
        const fileType = file.type;
    
        if (fileType === "application/pdf") {
            return await processPDF(file);
        } else if (fileType.startsWith("image/")) {
            return await processImage(file);
        } else {
            alert("Unsupported file format! Please upload a PDF, JPG, or PNG.");
            return "Extraction failed";
        }
    };
    
    const processPDF = async (pdfFile) => {
        const reader = new FileReader();
    
        return new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const typedArray = new Uint8Array(reader.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    const page = await pdf.getPage(1);
                    const scale = 2;
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
    
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
    
                    await page.render({ canvasContext: ctx, viewport }).promise;
                    const imageUrl = canvas.toDataURL("image/png");
    
                    const text = await runOCR(imageUrl);
                    resolve(text);
                } catch (error) {
                    console.error("PDF Processing Error:", error);
                    reject("Failed to process PDF");
                }
            };
    
            reader.readAsArrayBuffer(pdfFile);
        });
    };
    
    const processImage = async (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const text = await runOCR(e.target.result);
                    resolve(text);
                } catch (error) {
                    console.error("Image Processing Error:", error);
                    reject("Failed to process image");
                }
            };
            reader.readAsDataURL(imageFile);
        });
    };
    
    const runOCR = async (imageUrl) => {
        try {
            const { data: { text } } = await Tesseract.recognize(imageUrl, "eng", {
                logger: (m) => console.log(m),
            });
            return text;
        } catch (err) {
            console.error("OCR Error:", err);
            return "Error extracting text.";
        }
    };
    
   

    const handleStartInterview = () => {
        navigate('/modes/compatibility-check', { state: { name: "Raghav", level: difficulty, mode: 'Resume Insight', resume: resume } })
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

                    <StartBtn onClick={handleStartInterview} disabled={!fileName} text={'Start Interview'} />

                </div>
                <Loader loading={loading}></Loader>
            </div>
        </section>
    );
};

export default ResumeInsight;
