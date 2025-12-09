import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import EditEligibility from './EditEligibility'
import DeleteEligibility from './DeleteEligibility'

const EligibilityCard = () => {
  return (
    <Card className="shadow-md border-gray-100">
      <CardContent className="">
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Career Service:</span>
            <span className="text-gray-900 font-medium">Professional</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Rating:</span>
            <span className="text-gray-900 font-medium">87.5</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Date Exam:</span>
            <span className="text-gray-900 font-medium">2023-08-15</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Place:</span>
            <span className="text-gray-900 font-medium">Baguio City</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">License No.:</span>
            <span className="text-gray-900 font-medium">123456</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Validity:</span>
            <span className="text-gray-900 font-medium">2028-05-11</span>
          </div>

          <div className='flex justify-end gap-4 items-center'>
            <EditEligibility />
            <DeleteEligibility />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EligibilityCard