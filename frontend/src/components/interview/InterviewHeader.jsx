import React from 'react';
import { StarsIcon, SendToBack, PhoneMissed, SendHorizonal } from 'lucide-react';



const InterviewHeader = ({ exitFullScreen, layout, setLayout }) => {

  return (
    <header className="fixed top-0 w-full border-b bg-background z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section (Logo & Icon) */}
        <div className="flex">
          <StarsIcon style={{ color: '#dafffb' }} className="mr-2 w-8 h-8 md:h-9 md:w-9" />
          <img alt="logo" className="h-8 w-[100px] md:w-[150px] md:h-10" src="/logo2.png" />
        </div>

        {/* Right Section (Buttons) */}
        <div className="flex items-center space-x-3">
          {/* Layout Change Button */}
          {
            layout != 3 &&
            <button
              onClick={() => setLayout((prev) => (prev % 3) + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <span className='hidden md:inline'>Change Layout </span>
              <SendToBack className="w-5 h-5 md:ml-2 inline" />
            </button>
          }

          {/* Code Submit Button */}
          {
            layout===3 && 
          <button
          onClick={() => setLayout((prev) => (prev % 3) + 1)}
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
          >
            <span className='hidden md:inline'>Submit</span>
            <SendHorizonal className="w-5 h-5 md:ml-2 inline " />
          </button>
          }

          {/* End Interview Button */}
          <button
            onClick={exitFullScreen}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <span className='hidden md:inline'>End Interview</span>
            <PhoneMissed className="w-5 h-5 md:ml-2 inline " />
          </button>

        </div>
      </nav>
    </header>
  );
};

export default InterviewHeader;