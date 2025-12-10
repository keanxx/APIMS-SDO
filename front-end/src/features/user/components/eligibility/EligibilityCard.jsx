import React, { useState } from 'react' // ✅ Remove useEffect and useAuth
import axiosInstance from '@/api/axiosInstance';
import { Card, CardContent } from '@/components/ui/card'
import { EditEligibility } from './AddEligibility'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ✅ Receive data as props instead of fetching
const EligibilityCard = ({ eligibilityList, onUpdate }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  // ✅ Fixed: Actually perform the delete
  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/elegibility/delete/${deleteId}`);
        console.log('Eligibility deleted successfully');
        onUpdate(); // ✅ Refresh data from parent
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error('Failed to delete eligibility:', error);
        alert('Failed to delete eligibility record');
      }
    }
  };

  return (
    <>
      <div className="space-y-4">
        {eligibilityList.map((eligibility) => (
          <Card key={eligibility.id} className="shadow-md border-gray-100">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Career Service:</span>
                  <span className="text-gray-900 font-medium">{eligibility.career_service}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Rating:</span>
                  <span className="text-gray-900 font-medium">{eligibility.rating}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Date Exam:</span>
                  <span className="text-gray-900 font-medium">{eligibility.date_exam}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Place:</span>
                  <span className="text-gray-900 font-medium">{eligibility.place_exam}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">License No.:</span>
                  <span className="text-gray-900 font-medium">{eligibility.license_no || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Validity:</span>
                  <span className="text-gray-900 font-medium">{eligibility.date_valid}</span>
                </div>

                <div className='flex justify-end gap-4 items-center pt-2'>
                  <EditEligibility 
                    eligibilityData={{
                      id: eligibility.id,
                      careerService: eligibility.career_service,
                      rating: eligibility.rating,
                      dateOfExamination: eligibility.date_exam,
                      placeOfExamination: eligibility.place_exam,
                      licenseNumber: eligibility.license_no,
                      validUntil: eligibility.date_valid
                    }}
                    onSuccess={onUpdate} // ✅ Use parent's refresh function
                  />
                  <button
                    onClick={() => handleDelete(eligibility.id)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Eligibility Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this eligibility record? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default EligibilityCard
