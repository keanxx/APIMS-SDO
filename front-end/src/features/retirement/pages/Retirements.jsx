import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import React from 'react'

const Retirements = () => {
  return (
 
      <div className='space-y-4 bg-[#F7F9F7]'>
        <div>
        <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">Retirement Management</h1>
        <p className="text-xs md:text-sm text-muted-foreground">Manage and Review Employee</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
      <Card className="shadow-lg border-0">
        <CardContent>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-[#5A6F5A]'>Total Employee</p>
              <p className='text-[#2D5A2D] text-2xl font-semibold'>100</p>
            </div>

            <div className='rounded-lg bg-[#7CB342]/20 p-3'>
              <TrendingUp className='h-6 w-6 text-[#2D5A2D]'/>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardContent>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-[#5A6F5A]'>Total Employee</p>
              <p className='text-[#2D5A2D] text-2xl font-semibold'>100</p>
            </div>

            <div className='rounded-lg bg-[#7CB342]/20 p-3'>
              <TrendingUp className='h-6 w-6 text-[#2D5A2D]'/>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardContent>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-[#5A6F5A]'>Total Employee</p>
              <p className='text-[#2D5A2D] text-2xl font-semibold'>100</p>
            </div>

            <div className='rounded-lg bg-[#7CB342]/20 p-3'>
              <TrendingUp className='h-6 w-6 text-[#2D5A2D]'/>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardContent>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-[#5A6F5A]'>Total Employee</p>
              <p className='text-[#2D5A2D] text-2xl font-semibold'>100</p>
            </div>

            <div className='rounded-lg bg-[#7CB342]/20 p-3'>
              <TrendingUp className='h-6 w-6 text-[#2D5A2D]'/>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>
      </div>
  
  )
}

export default Retirements