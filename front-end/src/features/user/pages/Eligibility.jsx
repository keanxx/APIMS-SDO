
import React from 'react'
import HeaderUser from '../components/dashboard/HeaderUser'
import EligibilityCard from '../components/eligibility/EligibilityCard'
import AddEligibility from '../components/eligibility/AddEligibility'

const Eligibility = () => {
  return (
    <>
      <HeaderUser/>
      <div className=' bg-[#F7F9F7] p-4 space-y-4 h-screen'>
        <div className='flex justify-between items-center'>
           <h2 className="text-gray-900 px-1">Latest Eligibility</h2>
          <AddEligibility/>
        </div>
        
        <EligibilityCard/>
       
        
      </div>
    </>
  )
}

export default Eligibility