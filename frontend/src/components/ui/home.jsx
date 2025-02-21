import React from 'react'
import HeroSection from '../HeroSection'
import features from '@/data/features'
import faqs from '@/data/faq'
import testimonials from '@/data/testimonials'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"



const home = () => {
    return (
        <div >
            <HeroSection />
            {/* features */}
            <section id='features' className='w-full py-12 md:py-24 lg:py-32 bg-background'>
                <div className='container mx-auto px-4 md:px-6'>
                    <h2 className='text-3xl font-bold tracking-tighter text-center mb-12'>Powerful features for your Career Growth</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
                        {features.map((f, idx) => {
                            return (
                                <Card key={idx} className='border-2  hover:border-primary transition-colors duration-300'>
                                    <CardContent className='pt-6 text-center flex flex-col items-center'>
                                        <div className='flex flex-col items-center justify-center'>
                                            {f.icon}
                                            <h3 className='text-xl font-bold mb-2'>{f.title}</h3>
                                            <p className='text-muted-foreground'>{f.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
            {/* features ends */}

            {/* Stats */}
            <section id='stats' className="w-full py-12 md:py-24 bg-muted/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <h3 className="text-4xl font-bold">50+</h3>
                            <p className="text-muted-foreground">Languages and Subjects Covered</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <h3 className="text-4xl font-bold">1000+</h3>
                            <p className="text-muted-foreground">Interview Questions</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <h3 className="text-4xl font-bold">95%</h3>
                            <p className="text-muted-foreground">Success Rate</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <h3 className="text-4xl font-bold">24/7</h3>
                            <p className="text-muted-foreground">Support Team Available</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Stats ends */}


            {/* Testimonials */}
            {/* <section id='testimonials' className="w-full py-12 md:py-24 bg-muted/50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-background">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="relative h-12 w-12 flex-shrink-0">
                                                <img
                                                    width={40}
                                                    height={40}
                                                    src={testimonial.image}
                                                    alt={testimonial.author}
                                                    className="rounded-full object-cover border-2 border-primary/20"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{testimonial.author}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {testimonial.role}
                                                </p>
                                                <p className="text-sm text-primary">
                                                    {testimonial.company}
                                                </p>
                                            </div>
                                        </div>
                                        <blockquote>
                                            <p className="text-muted-foreground italic relative">
                                                <span className="text-3xl text-primary absolute -top-4 -left-2">
                                                    &quot;
                                                </span>
                                                {testimonial.quote}
                                                <span className="text-3xl text-primary absolute -bottom-4">
                                                    &quot;
                                                </span>
                                            </p>
                                        </blockquote>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section> */}

            <section id='testimonials' className="w-full py-12 md:py-24 bg-muted/50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    <Carousel opts={{ align: "start", loop: true, }}>
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="flex justify-center md:basis-1/2 lg:basis-1/3">
                                    <Card className="bg-background max-w-lg mx-auto">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <div className="relative h-12 w-12 flex-shrink-0">
                                                        <img
                                                            width={40}
                                                            height={40}
                                                            src={testimonial.image}
                                                            alt={testimonial.author}
                                                            className="rounded-full object-cover border-2 border-primary/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{testimonial.author}</p>
                                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                                        <p className="text-sm text-primary">{testimonial.company}</p>
                                                    </div>
                                                </div>
                                                <blockquote>
                                                    <p className="text-muted-foreground italic relative">
                                                        <span className="text-3xl text-primary absolute -top-4 -left-2">&quot;</span>
                                                        {testimonial.quote}
                                                        <span className="text-3xl text-primary absolute -bottom-4">&quot;</span>
                                                    </p>
                                                </blockquote>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        <CarouselPrevious className='hidden lg:block' />
                        <CarouselNext className='hidden lg:block' />
                        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 md:left-4 lg:hidden" />
                        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 md:right-4 lg:hidden" />
                    </Carousel>
                </div>
            </section>
            {/* Testimonials ends */}


            {/* FAQs */}
            <section id='faqs' className="w-full py-12 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground">
                            Find answers to common questions about our platform
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
            {/* FAQs ends */}



        </div>
    )
}

export default home
