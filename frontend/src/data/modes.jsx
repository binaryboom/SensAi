import { BrainCircuit, CodeXml, ScrollText, Users } from "lucide-react";

const modes = [
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "Resume Insight Mode",
    description:
      "Get interview questions tailored to your resume, focusing on your skills, experience, and past roles.",
    href:'/modes/resume-insight'
  },
  {
    icon: <CodeXml className="w-10 h-10 mb-4 text-primary" />,
    title: "Code Mastery Mode",
    description:
      "Test your expertise in a specific programming language with technical and problem-solving questions.",
    href:'/modes/code-mastery'
  },
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "Hands-On Q&A Mode",
    description:
      "Answer questions based on your introduction, projects, and internships to showcase your practical experience.",
    href:'/modes/hands-on'
  },
  {
    icon: <Users className="w-10 h-10 mb-4 text-primary" />,
    title: "Culture Fit Q&A",
    description:
      "Prepare for behavioral and situational questions to demonstrate your soft skills and workplace adaptability.",
    href:'/modes/culture-fit'
  },
];

export default modes;
