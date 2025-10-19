import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Landing from '../components/Landing'

const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]=useState("login");

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div className='flex h-[100vh] w-full'>
      
        {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2d5f2e] via-[#3a7a3c] to-[#4a9a4d] p-12 flex-col justify-center text-white">
        <Landing/>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Get Started</h2>
          <p className='pb-5'>Create an account or sign in to continue</p>
          
           <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-5 bg-white border border-[#2d5f2e]/15 p-1">
                <TabsTrigger value="login"
                 className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2d5f2e] data-[state=active]:to-[#3a7a3c] data-[state=active]:text-white">Log in</TabsTrigger>
                <TabsTrigger value="signup"
                 className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2d5f2e] data-[state=active]:to-[#3a7a3c] data-[state=active]:text-white">Sign up</TabsTrigger>
            </TabsList>

    {/*Log in tab */}
            <TabsContent value="login">
                <Card>
                    <CardContent >
                        <form action=""
                         className='space-y-4'>

                            <div className='space-y-2'>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" 
                                id="email" 
                                placeholder="you@example.com"
                               className="bg-[#f3f7f3] border-[#2d5f2e]/20 focus-visible:!border-[#2d5f2e] focus-visible:!ring-[#2d5f2e]/50 focus-visible:!ring-[3px]" />
                            </div>

                            <div className='space-y-2'>
                                <div className='flex justify-between'>
                                <Label htmlFor="password">Password</Label>
                                <button className='hover:text-[#3a7a3c]'>Forgot?</button>
                                </div>
                                
                                <Input type="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-[#f3f7f3] border-[#2d5f2e]/20 focus-visible:!border-[#2d5f2e] focus-visible:!ring-[#2d5f2e]/50 focus-visible:!ring-[3px]"/>
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter>
                        <Button 
                        type="button"
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-[#2d5f2e] to-[#3a7a3c] hover:from-[#3a7a3c] hover:to-[#4a9a4d] text-white shadow-md shadow-[#2d5f2e]/20 transition-all">Log in</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

       {/*Sign up tab */}
             <TabsContent value="signup">
                <Card>
                    <CardContent >
                        <form action=""
                         className='space-y-4'>

                            <div className='space-y-2'>
                              <Label htmlFor="name">Full Name</Label>
                              <Input type="text" 
                              id="name" 
                              placeholder="John Doe"
                              className="bg-[#f3f7f3] border-[#2d5f2e]/20 focus-visible:!border-[#2d5f2e] focus-visible:!ring-[#2d5f2e]/50 focus-visible:!ring-[3px]" />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" 
                                id="email" 
                                placeholder="you@example.com"
                               className="bg-[#f3f7f3] border-[#2d5f2e]/20 focus-visible:!border-[#2d5f2e] focus-visible:!ring-[#2d5f2e]/50 focus-visible:!ring-[3px]" />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-[#f3f7f3] border-[#2d5f2e]/20 focus-visible:!border-[#2d5f2e] focus-visible:!ring-[#2d5f2e]/50 focus-visible:!ring-[3px]"/>
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter>
                        <Button 
                        className="w-full bg-gradient-to-r from-[#2d5f2e] to-[#3a7a3c] hover:from-[#3a7a3c] hover:to-[#4a9a4d] text-white shadow-md shadow-[#2d5f2e]/20 transition-all">Sign up</Button>
                    </CardFooter>
                </Card>
            </TabsContent>


           </Tabs>
        
        </div>
      </div>
    </div>
  )
}

export default Login