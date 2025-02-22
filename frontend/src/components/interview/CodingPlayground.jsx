import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { motion } from "framer-motion";



const CodingPlayground = ({codingQue,basicBoilderPlate}) => {
  const [code, setCode] = useState(basicBoilderPlate);

  const codingQuestion = `Given an array of integers, return indices of the two numbers such that they add up to a specific target.

  Example:
  Input: nums = [2, 7, 11, 15], target = 9
  Output: [0,1]
  
  Implement function:
  function twoSum(nums, target) {}`;

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
            <pre className="whitespace-pre-wrap text-gray-300 text-sm">{codingQuestion}</pre>
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
              onChange={(value) => setCode(value)}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </motion.div>
  );
};

export default CodingPlayground;
