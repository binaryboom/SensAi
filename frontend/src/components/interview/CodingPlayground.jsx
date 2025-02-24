import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { motion } from "framer-motion";



const CodingPlayground = ({codingQue,setCode,code}) => {
  // const [code, setCode] = useState(codingQue.funcTemplate);

  const description = codingQue.description;
  const testcase=codingQue.testcase;

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
            <pre className="whitespace-pre-wrap text-gray-300 text-sm">{testcase}</pre>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Side - Code Editor */}
        <ResizablePanel defaultSize={70}>
          <div className="h-full p-6">
            <h2 className="text-2xl font-bold mb-4 gradient-title">Your Solution</h2>
            <Editor
              height="70vh"
              theme="vs-dark"
              defaultLanguage="java"
              value={code}
              onChange={(value) =>{ setCode(value)}}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </motion.div>
  );
};

export default CodingPlayground;
