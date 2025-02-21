import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LucideLayoutDashboard, StarsIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const header = () => {
    return (
        // <header className='fixed top-0 w-full border-b bg-background/80 backdrop:blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
        <header className='fixed top-0 w-full border-b bg-background z-50'>
            <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
                <NavLink to={'/'}>
                <div className='flex'>

                    <StarsIcon style={{color:'#dafffb'}}  className='mr-2 w-9 h-9' />
                    <img alt='logo' height='10' width='150' src={'/logo2.png'}></img>
                    {/* <StarsIcon  className='mr-2 w-9 h-9' />
                    <img alt='logo' height='10' width='150' src={'/logo.png'}></img> */}
                    {/* <StarsIcon  className='mr-2' />
                    <img alt='logo' height='300rem' width='100rem' src={'/logo.png'}></img> */}
                    
                </div>
                </NavLink>
                <div className='flex'>
                    <SignedIn>
                        <DropdownMenu >
                            <DropdownMenuTrigger>
                                <Button>
                                    <LayoutDashboard className='w-4 h-4' />
                                    <span className='hidden md:block'>Industry Insights</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>



                        {/* <SignedIn> */}
                            <UserButton appearance={
                                {
                                    elements: {
                                        avatarBox: 'w-9 h-9 ml-3', userButtonPopoverCard: 'shadow-xl', userPreviewMainIdentifier: 'font-semibold'
                                    }
                                }
                            }
                                afterSignOutUrl='/'
                            />
                        {/* </SignedIn> */}


                    </SignedIn>

                    <NavLink to='/login'>
                    <SignedOut>
                        {/* <SignInButton > */}
                            <Button >Login</Button>
                        {/* </SignInButton> */}
                    </SignedOut>
                    </NavLink>
                </div>
            </nav>

        </header>
    )
}

export default header
