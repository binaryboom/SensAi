import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui's Button component
import { Maximize, Minimize } from "lucide-react"; // Icons for full-screen and exit full-screen

const TestAlertDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Function to toggle full-screen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Enter full-screen mode
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => console.error("Error entering full-screen mode:", err));
    } else {
      // Exit full-screen mode
      document
        .exitFullscreen()
        .then(() => setIsFullScreen(false))
        .catch((err) => console.error("Error exiting full-screen mode:", err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      {/* Full-Screen Button */}
      <Button onClick={toggleFullScreen} className="flex items-center gap-2">
        {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        {isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
      </Button>

      {/* AlertDialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Open Alert Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="z-[9999]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsDialogOpen(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestAlertDialog;