import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit2 } from 'lucide-react'
import React, { useState } from 'react'

const EditEligibility = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form updated')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1A3A1A] transition-colors">
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1A3A1A]">Edit Eligibility</DialogTitle>
          <DialogDescription>
            Update your civil service eligibility information here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="careerService">Career Service</Label>
            <Input
              id="careerService"
              defaultValue="Professional"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              step="0.01"
              defaultValue="87.5"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfExamination">Date of Examination</Label>
            <Input
              id="dateOfExamination"
              type="date"
              defaultValue="2023-08-15"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="placeOfExamination">Place of Examination</Label>
            <Input
              id="placeOfExamination"
              defaultValue="Baguio City"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number (if applicable)</Label>
            <Input
              id="licenseNumber"
              defaultValue="123456"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              defaultValue="2028-05-11"
              required
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1A3A1A] hover:bg-[#1A3A1A]/90 text-white"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditEligibility