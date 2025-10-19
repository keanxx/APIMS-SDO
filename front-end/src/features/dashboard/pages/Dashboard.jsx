import SidebarLayout from '@/components/SidebarLayout'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
 
    <div className='grid grid-cols-4 gap-4'>
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

      <Card>
        <CardContent>
          <div className='flex justify-between items-center'>
            <div>
              <p>Total Employee</p>
              <p>100</p>
            </div>

            <div>
              <TrendingUp className='h-6 w-6 text-green-500'/>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className='flex justify-between items-center'>
            <div>
              <p>Total Employee</p>
              <p>100</p>
            </div>

            <div>
              <TrendingUp className='h-6 w-6 text-green-500'/>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className='flex justify-between items-center'>
            <div>
              <p>Total Employee</p>
              <p>100</p>
            </div>

            <div>
              <TrendingUp className='h-6 w-6 text-green-500'/>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>

  )
}

export default Dashboard