import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";



const CodingPlayground = ({ codingQue, setUserResponse }) => {
  const [code, setCode] = useState(codingQue?.funcTemplate || "");

  const description = codingQue?.description;
  const testcase = codingQue?.testcase;
  const handleSubmit = () => {
    if (!code.trim()) {
      alert("Please write some code before submitting.");
      return;
    }
    const sanitizedCode = code.replace(/\n/g, " "); // Replace newlines with spaces
    setUserResponse(`Here is my solution: ${sanitizedCode}`);  };

  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }} // Start off-screen to the right
      animate={{ x: 0, opacity: 1 }} // Animate to its final position
      transition={{ type: "tween", duration: 1 }} // Smooth transition
      className="h-screen w-full mt-14 bg-muted/40 text-white flex"
    >
      <ResizablePanelGroup direction="horizontal">
        {/* Left Side - Coding Question */}
        <ResizablePanel>
          <div className="h-[90vh] p-6 overflow-auto border-r border-gray-700">
            <h2 className="text-2xl font-bold mb-4 gradient-title">Coding Question</h2>
            <pre className="whitespace-pre-wrap text-gray-300 text-sm">{description}</pre>
            <h3 className="text-lg mt-4 font-bold mb-4 gradient-title">Test Cases</h3>
            <pre className="whitespace-pre-wrap text-gray-300 text-sm">{typeof testcase === "string" ? testcase : JSON.stringify(testcase, null, 2)}</pre>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Side - Code Editor */}
        <ResizablePanel defaultSize={70}>
          <div className="h-full p-6">
            <div className="flex justify-between items-center mb-2">

              <h2 className="text-2xl font-bold  gradient-title inline">Your Solution</h2>

              <Button onClick={() => { handleSubmit()}}
                className='bg-green-700 text-white rounded-md hover:bg-green-800 transition'>
                <span className='hidden md:inline'>Submit</span>
                <SendHorizonal className="w-4 h-4 inline" /></Button>
            </div>

            <Editor
              height="70vh"
              theme="vs-dark"
              defaultLanguage="java"
              value={code || ""}
              onChange={(value) => { if (value !== undefined) setCode(value); }}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </motion.div>
  );
};

export default CodingPlayground;
