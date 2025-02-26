import React, { useState } from "react";
import { Button } from "../ui/button";
import { Upload, FileText, Settings } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Loader from "../ui/loader";
import StartBtn from "../ui/StartBtn";
import { useNavigate } from "react-router";
import * as pdfjsLib from "pdfjs-dist";
import { createWorker } from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;

const ResumeInsight = () => {
    const [fileName, setFileName] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [resume, setResume] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const api = import.meta.env.VITE_BACKEND_API;

    // Handle File Upload
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            setFileName("");
            setResume("");
            return;
        }

        setLoading(true);
        setFileName(file.name);

        try {
            const extractedText = await extractText(file);
            console.log("Extracted Text:", extractedText);

            // Send extracted text to backend for processing
            const response = await fetch(`${api}/summarize-text`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ resume: extractedText }),
            });

            const data = await response.json();
            setResume(data.message);
        } catch (error) {
            console.error("Error processing file:", error);
            alert("Failed to process the file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Extract text from PDF or Image
    const extractText = async (file) => {
        if (file.type === "application/pdf") {
            return await processPDF(file);
        } else if (file.type.startsWith("image/")) {
            return await processImage(file);
        } else {
            throw new Error("Unsupported file format! Please upload a PDF, JPG, or PNG.");
        }
    };

    // Process PDF and convert to image for OCR
    const processPDF = async (pdfFile) => {
        const pdf = await pdfjsLib.getDocument(await pdfFile.arrayBuffer()).promise;
        const page = await pdf.getPage(1);
        const scale = 2;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;
        const imageUrl = canvas.toDataURL("image/png");

        return await runOCR(imageUrl);
    };

    // Process image file directly with OCR
    const processImage = async (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const text = await runOCR(e.target.result);
                    resolve(text);
                } catch (error) {
                    reject("Failed to process image");
                }
            };
            reader.onerror = () => reject("Error reading image file");
            reader.readAsDataURL(imageFile);
        });
    };

    // Run OCR on an image (either from PDF or uploaded image)
    const runOCR = async (imageDataUrl) => {
        try {
            const worker = await createWorker("eng"); // No load() required in v6
            const { data: { text } } = await worker.recognize(imageDataUrl);
            await worker.terminate();
            return text;
        } catch (err) {
            console.error("OCR Error:", err);
            throw new Error("Failed to extract text.");
        }
    };

    // Navigate to Interview
    const handleStartInterview = () => {
        navigate("/modes/compatibility-check", {
            state: {
                name: "Raghav",
                level: difficulty,
                mode: "Resume Insight",
                resume: resume,
            },
        });
    };

    return (
        <section id="resume-insight" className="w-full py-12 md:py-24 bg-muted/50 pt-20 md:pt-32 scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-5xl text-center font-bold mb-4 gradient-title">Resume Insight Interview</h2>
                <p className="text-center text-lg text-gray-300 max-w-xl mx-auto mb-8">
                    Upload your resume and challenge yourself with AI-driven interview questions.
                </p>

                <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 bg-background p-8 rounded-xl shadow-lg">
                    <div className="flex gap-5 justify-between items-center w-full">
                        <div className="text-xl font-semibold text-[rgb(218,255,251)] flex items-center gap-2">
                            <FileText size={22} /> Resume:
                        </div>

                        <label
                            htmlFor="resume-upload"
                            className="cursor-pointer w-[200px] px-6 py-2 flex items-center justify-center gap-2 bg-white font-semibold text-black rounded-lg hover:bg-gray-200 transition md:whitespace-nowrap"
                        >
                            <Upload size={20} />
                            {fileName ? "Change Resume" : "Upload Resume"}
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

                    <StartBtn onClick={handleStartInterview} disabled={!fileName} text={"Start Interview"} />
                </div>
                <Loader loading={loading} />
            </div>
        </section>
    );
};

export default ResumeInsight;
