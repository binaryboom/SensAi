import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='bg-muted/50 py-12'>
            <div className='container mx-auto px-4 text-center text-gray-200'>
                <div className='grid '>
                    {/* About SensAi */}
                    <div className='text-left'>
                        <p className='text-lg font-semibold' style={{ color: 'rgb(218, 255, 251)' }}>About SensAI</p>
                        <p className='text-sm '>
                            SensAI is dedicated to transforming the way professionals prepare for interviews, offering AI-powered tools for personalized guidance, practice, and career growth.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className='text-left mt-5'>
                        <p className='text-lg font-semibold' style={{ color: 'rgb(218, 255, 251)' }}>Quick Links</p>
                        <div className='flex flex-wrap justify-start items-start space-x-6 text-sm'>
                            <a href="#" className='hover:underline'>Home</a>
                            <a href="#features" className='hover:underline'>Features</a>
                            <a href="#faqs" className='hover:underline'>FAQs</a>
                            <a href="#pricing" className='hover:underline'>Pricing</a>
                            <a href="#testimonials" className='hover:underline'>Testimonials</a>
                            <a href="#contact" className='hover:underline'>Contact Us</a>
                        </div>
                    </div>

                    {/* Follow Us */}
                    {/* <div className='text-left'>
                        <p className='text-lg font-semibold' style={{ color: 'rgb(218, 255, 251)' }}>Follow Us</p>
                        <div className='flex space-x-4'>
                            <a href="#" className='hover:text-blue-600'><FaFacebook className="text-xl" /></a>
                            <a href="#" className='hover:text-blue-400'><FaTwitter className="text-xl" /></a>
                            <a href="#" className='hover:text-blue-700'><FaLinkedin className="text-xl" /></a>
                            <a href="#" className='hover:text-pink-500'><FaInstagram className="text-xl" /></a>
                        </div>
                    </div> */}
                </div>

                {/* Contact */}
                <div id='contact' className="mt-20 text-sm text-center">
                    <p>For inquiries or support, reach out to us at: <a href="mailto:sensai.help@gmail.com" className="font-bold" style={{ color: 'rgb(218, 255, 251)' }}>sensai.help@gmail.com</a></p>
                </div>

                {/* Footer Credit */}
                <div className="mt-6 text-sm text-center">
                    <p>Made with ❤️ by BinaryBoom</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
