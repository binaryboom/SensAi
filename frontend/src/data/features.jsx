import { BrainCircuit, Briefcase, LineChart, ScrollText } from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "AI-Powered Interview Simulation",
    description:
      "Engage in interactive interview simulations where AI customizes questions in real-time based on your performance, helping you prepare effectively.",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description:
      "Prepare for success with role-specific practice questions designed to mirror real-life scenarios, with personalized feedback for each answer.",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "Multi-Domain Support",
    description:
      "Master both technical and HR interview rounds, with the flexibility to switch between domains, ensuring a comprehensive and balanced preparation.",
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
    title: "Personalized Performance Reports",
    description:
      "Gain valuable insights into your performance with AI-driven reports highlighting areas for improvement.",
  }
];


export default features;