import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

const AddEligibility = () => {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log('Form submitted')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm">add</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1A3A1A]">Add Eligibility</DialogTitle>
          <DialogDescription>
            Add your civil service eligibility information here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="careerService">Career Service</Label>
            <Input
              id="careerService"
              placeholder="e.g., Professional"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              step="0.01"
              placeholder="e.g., 87.5"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfExamination">Date of Examination</Label>
            <Input
              id="dateOfExamination"
              type="date"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="placeOfExamination">Place of Examination</Label>
            <Input
              id="placeOfExamination"
              placeholder="e.g., Manila"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number (if applicable)</Label>
            <Input
              id="licenseNumber"
              placeholder="License number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
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
              Add Eligibility
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEligibility