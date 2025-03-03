import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Loader from "../ui/loader";
import StartBtn from "../ui/StartBtn";
import { useNavigate } from "react-router";
import { Star } from "lucide-react";

const Thanks = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [loading,setLoading]=useState(false);

    const submitFeedback = () => {
        // navigate('/modes/compatibility-check')
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
            navigate('/')
        },2000)
    };

    return (
        <section id="thanks" className="w-full py-12 md:py-24 bg-muted/50 pt-20 md:pt-32 scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
                {/* Title & Subtitle */}
                <h2 className="text-5xl text-center font-bold mb-4 gradient-title">
                    Thanks for taking the interview :)
                </h2>
                <p className="text-center text-lg text-gray-300 max-w-xl mx-auto mb-8">
                    Please rate your experience and provide feedback.
                </p>

                <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 bg-background p-8 rounded-xl shadow-lg">
                    {/* Star Rating */}
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={40}
                                className="cursor-pointer transition-colors"
                                fill={star <= rating ? "#FACC15" : "#9CA3AF"} // Changes the star color
                                stroke="black" // Keeps the border visible
                                onClick={() => setRating(star)}
                            />
                        ))} 
                    </div>
                    
                    {/* Feedback Input */}
                    <div className="flex gap-5 justify-between items-center w-full">
                        <div className="text-xl font-semibold text-[rgb(218,255,251)] flex flex-col gap-2 w-full">
                            <Label htmlFor="message">Enter Feedback :</Label>
                            <Textarea placeholder="Enter Feedback (optional)" id="message" />
                        </div>
                    </div>

                    <StartBtn onClick={submitFeedback} disabled={rating <= 0} text={'Submit'} />
                </div>
                <Loader loading={loading}></Loader>
            </div>
        </section>
    );
};

export default Thanks;
