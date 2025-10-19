import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'

const Header = () => {
  return (
    <div className="flex items-center space-x-4 px-4 py-3 shadow-md">
    
    <main className='justify-between flex w-full'>
        <section className="flex items-center space-x-2">
            
            <div className="w-10 h-10 bg-gradient-to-br from-[#2D5A2D] to-[#1A3A1A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            
            <div>
              <h1 className="text-xl font-semibold text-grass-dark">APIMS</h1>
              <p className="text-xs text-muted-foreground">SDO - Camarines Norte</p>
            </div>

        </section>
            
        <section className='pr-5'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Avatar>
                        <AvatarFallback className="bg-[#7CB342] text-[#1A3A1A]" >KT</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-sm font-medium text-[#1A3A1A]'>Kean Tan</p>
                        <p className='text-xs text-[#5A6F5A]'>Super nikka</p>
                    </div>

                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-52'>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                    

                </DropdownMenuContent>
            </DropdownMenu>

        </section>
    </main>
         
    </div>

  )
}

export default Header