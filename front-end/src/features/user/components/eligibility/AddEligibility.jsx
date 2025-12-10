import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit2 } from 'lucide-react'
import React, { useState, useEffect } from 'react' // ✅ Add useEffect
import { useAuth } from '@/features/auth/components/AuthContext'
import axiosInstance from '@/api/axiosInstance'

const EligibilityModal = ({ mode = 'add', eligibilityData = null, trigger, onSuccess }) => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    careerService: '',
    rating: '',
    dateOfExamination: '',
    placeOfExamination: '',
    licenseNumber: '',
    validUntil: ''
  })

  // ✅ Update form when eligibilityData changes or modal opens
  useEffect(() => {
    if (eligibilityData && open) {
      setFormData({
        careerService: eligibilityData.careerService || '',
        rating: eligibilityData.rating || '',
        dateOfExamination: eligibilityData.dateOfExamination || '',
        placeOfExamination: eligibilityData.placeOfExamination || '',
        licenseNumber: eligibilityData.licenseNumber || '',
        validUntil: eligibilityData.validUntil || ''
      })
    } else if (!open) {
      // Reset form when modal closes
      setFormData({
        careerService: '',
        rating: '',
        dateOfExamination: '',
        placeOfExamination: '',
        licenseNumber: '',
        validUntil: ''
      })
    }
  }, [eligibilityData, open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const payload = {
      career_service: formData.careerService,
      rating: parseFloat(formData.rating),
      date_exam: formData.dateOfExamination,
      place_exam: formData.placeOfExamination,
      license_no: formData.licenseNumber,
      date_valid: formData.validUntil,
      employee_id: user.employee_id
    }

    try {
      if (mode === 'add') {
        await axiosInstance.post('/elegibility/add', payload)
        console.log('Eligibility added successfully')
      } else if (mode === 'edit') {
        // ✅ FIX: Use eligibilityData.id, not user.employee_id
        if (!eligibilityData?.id) {
          alert('Missing eligibility ID')
          return
        }
        await axiosInstance.put(`/elegibility/update/${eligibilityData.id}`, payload)
        console.log('Eligibility updated successfully')
      }
      
      setOpen(false)
      if (onSuccess) onSuccess()
      // ✅ Remove window.location.reload() - onSuccess already refreshes data
    } catch (error) {
      console.error('Error saving eligibility:', error)
      console.error('Error details:', error.response?.data) // ✅ See exact error
      alert('Failed to save eligibility. Please try again.')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1A3A1A]">
            {mode === 'add' ? 'Add Eligibility' : 'Edit Eligibility'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Add your civil service eligibility information here.'
              : 'Update your civil service eligibility information here.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="careerService">Career Service</Label>
            <Input
              id="careerService"
              placeholder="e.g., Professional"
              value={formData.careerService}
              onChange={handleChange}
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
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfExamination">Date of Examination</Label>
            <Input
              id="dateOfExamination"
              type="date"
              value={formData.dateOfExamination}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="placeOfExamination">Place of Examination</Label>
            <Input
              id="placeOfExamination"
              placeholder="e.g., Manila"
              value={formData.placeOfExamination}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number (if applicable)</Label>
            <Input
              id="licenseNumber"
              placeholder="License number"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              value={formData.validUntil}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-between gap-2 pt-4">
            <div className="flex gap-2 ml-auto">
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
                {mode === 'add' ? 'Add Eligibility' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Add button component
export const AddEligibility = ({ onSuccess }) => (
  <EligibilityModal 
    mode="add"
    onSuccess={onSuccess}
    trigger={
      <Button className="flex items-center gap-1 text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors">
        <Plus className="w-4 h-4" />
        <span className="text-sm">add</span>
      </Button>
    }
  />
)

// Edit button component
export const EditEligibility = ({ eligibilityData, onSuccess }) => (
  <EligibilityModal 
    mode="edit"
    eligibilityData={eligibilityData}
    onSuccess={onSuccess}
    trigger={
      <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1A3A1A] transition-colors">
        <Edit2 className="w-4 h-4" />
        Edit
      </button>
    }
  />
)

export default AddEligibility
