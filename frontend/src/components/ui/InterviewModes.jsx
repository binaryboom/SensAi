import React from 'react'
import modes from '../../data/modes'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const InterviewModes = () => {
    const navigate=useNavigate();
    return (
        <section id='modes' className="w-full py-12 md:py-24 bg-muted/50 pt-20 md:pt-32 scroll-mt-24">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-4xl font-bold text-center mb-10 gradient-title">
                    Select interview <span className="whitespace-nowrap">mode :</span>
                </h2>
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-6xl mx-auto ">


                    {modes.map((mode, idx) => {
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }} // Animation starts with opacity 0 and moves up
                                animate={{ opacity: 1, y: 0 }} // Ends with full opacity and normal position
                                transition={{ duration: 0.5, delay: idx * 0.2 }} // Delay each card slightly
                            >
                                <Card onClick={()=>{ navigate(mode.href)}} key={idx} className='border-2  hover:border-primary transition-colors duration-300 h-full flex flex-col'>
                                    <CardContent className='pt-6 text-center flex flex-col items-center flex-grow'>
                                        <div className='flex flex-col items-center justify-center flex-grow'>
                                            {mode.icon}
                                            <h3 className='text-xl font-bold mb-2'>{mode.title}</h3>
                                            <p className='text-muted-foreground'>{mode.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default InterviewModes;
