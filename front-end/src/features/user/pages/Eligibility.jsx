import React, { useEffect, useState } from 'react'
import { useAuth } from '@/features/auth/components/AuthContext'
import axiosInstance from '@/api/axiosInstance'
import HeaderUser from '../components/dashboard/HeaderUser'
import EligibilityCard from '../components/eligibility/EligibilityCard'
import AddEligibility from '../components/eligibility/AddEligibility'
import { Skeleton } from '@/components/ui/skeleton'

const Eligibility = () => {
  const { user } = useAuth()
  const [eligibilityList, setEligibilityList] = useState([]) 
  const [loading, setLoading] = useState(true)

  // ✅ Fetch function to reuse
  const fetchEligibilityData = async () => {
    try {
      const response = await axiosInstance.get(
        `/elegibility/${user.employee_id}`
      )
      
      console.log('Eligibility Response:', response.data)
      
      // Set the array directly
      setEligibilityList(Array.isArray(response.data) ? response.data : [])
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch eligibility data:', error)
      setEligibilityList([])
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.employee_id) {
      fetchEligibilityData()
    }
  }, [user?.employee_id])

  // ✅ Callback to refresh data after add
  const handleSuccess = () => {
    fetchEligibilityData()
  }

  return (
    <>
      <HeaderUser/>
      <div className='bg-[#F7F9F7] p-4 space-y-4 min-h-screen'>
        <div className='flex justify-between items-center'>
          <h2 className="text-gray-900 px-1">Eligibility Records</h2>
          <AddEligibility onSuccess={handleSuccess} />
        </div>
        
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : eligibilityList.length > 0 ? (
          <EligibilityCard 
            eligibilityList={eligibilityList} 
            onUpdate={fetchEligibilityData}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No eligibility records found. Click "add" to create one.
          </div>
        )}
      </div>
    </>
  )
}

export default Eligibility
