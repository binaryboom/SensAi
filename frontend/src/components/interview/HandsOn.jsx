import React, { useState } from "react";
import { Settings } from "lucide-react";
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

const HandsOn = () => {
  const [difficulty, setDifficulty] = useState("Easy");
  const navigate=useNavigate()




  const handleStartInterview = () => {
    navigate('/modes/compatibility-check')
  };

  return (
    <section id="hands-on" className="w-full py-12 md:py-24 bg-muted/50 pt-20 md:pt-32 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title & Subtitle */}
        <h2 className="text-5xl text-center font-bold mb-4 gradient-title">
          Hands-On Interview
        </h2>
        <p className="text-center text-lg text-gray-300 max-w-xl mx-auto mb-8">
          Showcase your projects, internships, and introduce yourself to answer tailored questions.
        </p>

        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 bg-background p-8 rounded-xl shadow-lg">


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

          <StartBtn onClick={handleStartInterview} disabled={false} text={'Start Interview'} />

        </div>
        <Loader loading={false}></Loader>
      </div>
    </section>
  );
};

export default HandsOn;
