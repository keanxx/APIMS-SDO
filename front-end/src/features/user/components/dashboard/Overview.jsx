import { Card, CardContent } from '@/components/ui/card'
import { BadgeCheck } from 'lucide-react'

const Overview = () => {
  return (
    <div className="px-4 space-y-4">

   
    <Card className="shadow-lg border-0 rounded-[14px]">
      <CardContent className="px-4">
        <div className="flex items-start gap-4">
            <div className='rounded-xl bg-[#1A3A1A]/10 p-3'>
                <BadgeCheck className="h-7 w-7 text-[#1A3A1A] flex-shrink-0 mt-1" />
            </div>
          
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1A3A1A] mb-3">Eligibility</h3>
            
            <div className="">
              <div className='flex justify-between mb-2'>
                <p className="text-sm text-muted-foreground">Career Service:</p>
                <p className="text-sm font-medium text-gray-900">Professional</p>
              </div>
              
              <div className='flex justify-between mb-2'>
                <p className="text-sm text-muted-foreground">Rating:</p>
                <p className="text-sm font-medium text-gray-900">87.5</p>
              </div>
              
              <div className='flex justify-between'>
                <p className="text-sm text-muted-foreground">Valid Until:</p>
                <p className="text-sm font-medium text-gray-900">2028-05-11</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
     </div>
  )
}

export default Overview
