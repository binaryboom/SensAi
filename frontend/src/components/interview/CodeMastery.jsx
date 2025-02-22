import React, { useRef, useState } from "react";
import { Settings, X } from "lucide-react";
import StartBtn from "../ui/StartBtn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "../ui/loader";
import { useNavigate } from "react-router";

const CodeMastery = () => {
  const inputRef=useRef(null);
  const [difficulty, setDifficulty] = useState("Easy");
  const [skills, setSkills] = useState([]);
  const navigate=useNavigate()

  

  const handleAddSkill = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const newSkill = event.target.value.trim();
      // if(skills.length>=5){
      //   inputRef.current.style.display='none';
      // }
      if (newSkill && !skills.includes(newSkill) && skills.length<5) {
        setSkills([...skills, newSkill]);
      }
      if (skills.length + 1 >= 5 && inputRef.current) { // Check after adding the skill
        inputRef.current.style.display = "none";
      }
      event.target.value = ""; // Clear input after adding
    }
  };

  const handleRemoveSkill = (skill) => {
    // setSkills(skills.filter((s) => s !== skill));
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);

    if (updatedSkills.length < 5 && inputRef.current) {
      inputRef.current.style.display = "block"; // Show input when skills are < 5
    }
  };

  const handleStartInterview = () => {
    if (skills.length === 0) return; // Prevent starting without skills
    // Start interview logic here
    navigate('/modes/compatibility-check')
  };

  return (
    <section id="modes" className="w-full py-12 md:py-24 bg-muted/50 pt-20 md:pt-32 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title & Subtitle */}
        <h2 className="text-5xl text-center font-bold mb-4 gradient-title">
          Code Mastery Interview
        </h2>
        <p className="text-center text-lg text-gray-300 max-w-xl mx-auto mb-8">
          Sharpen your coding skills by answering technical questions based on your programming expertise.
        </p>

        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 bg-background p-8 rounded-xl shadow-lg">

          {/* Skills Input */}
          <div className="w-full">
            <label className="text-2xl text-center font-bold text-[rgb(218,255,251)] mb-2 block">
              I want to be <span className="whitespace-nowrap">interviewed for :</span>
            </label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg border-gray-700 bg-white text-black justify-center">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[rgb(191,249,243)] text-black  rounded-full px-3 py-1 text-sm"
                >
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill)} className="ml-2">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <input ref={inputRef}
                type="text"
                onKeyDown={handleAddSkill}
                placeholder="Type a skill and press Enter..."
                // className="flex-1 p-2 focus:outline-none bg-transparent"
                className="w-full min-w-[160px] p-2 focus:outline-none bg-transparent truncate placeholder-gray-500"
              />
            </div>
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
          <StartBtn onClick={handleStartInterview} disabled={skills.length === 0} text={'Start Interview'} />
        </div>
      </div>
    </section>
  );
};

export default CodeMastery;
