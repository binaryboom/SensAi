import React, { useState } from "react";
import { StarsIcon, SendToBack, PhoneMissed } from "lucide-react";
import { useNavigate } from "react-router";

const InterviewHeader = ({ exitFullScreen, layout, setLayout, queType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate=useNavigate()

  return (
    <div className="relative">
      <header className="fixed top-0 w-full border-b bg-background z-40">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left Section (Logo & Icon) */}
          <div className="flex">
            <StarsIcon style={{ color: "#dafffb" }} className="mr-2 w-8 h-8 md:h-9 md:w-9" />
            <img alt="logo" className="h-8 w-[100px] md:w-[150px] md:h-10" src="/logo2.png" />
          </div>

          {/* Right Section (Buttons) */}
          <div className="flex items-center space-x-3">
            {/* Layout Change Button */}
            {layout !== 3 && queType !== "coding" && (
              <button
                onClick={() => setLayout((prev) => (prev % 2) + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <span className="hidden md:inline">Change Layout</span>
                <SendToBack className="w-5 h-5 md:ml-2 inline" />
              </button>
            )}

            {/* End Interview Button */}
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              <span className="hidden md:inline">End Interview</span>
              <PhoneMissed className="w-5 h-5 md:ml-2 inline" />
            </button>
          </div>
        </nav>
      </header>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-[50000000]">
          <div className="bg-background p-6 rounded-lg shadow-lg w-80 z-[50000000]">
            <h3 className="text-xl font-semibold gradient-title">End Interview</h3>
            <p className="mt-2 text-[rgb(218,255,251)]">Are you sure you want to end the interview?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  exitFullScreen();
                  setIsDialogOpen(false);
                  navigate('/thank-you');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewHeader;
