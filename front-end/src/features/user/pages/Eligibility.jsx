import React, { useEffect, useState } from 'react'
import { useAuth } from '@/features/auth/components/AuthContext'
import axiosInstance from '@/api/axiosInstance'
import HeaderUser from '../components/dashboard/HeaderUser'
import EligibilityCard from '../components/eligibility/EligibilityCard'
import AddEligibility from '../components/eligibility/AddEligibility'

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
          <AddEligibility onSuccess={handleSuccess} /> {/* ✅ Pass callback */}
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
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
