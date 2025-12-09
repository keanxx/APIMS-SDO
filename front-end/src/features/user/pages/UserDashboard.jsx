
import React from 'react'
import HeaderUser from '../components/dashboard/HeaderUser'
import Overview from '../components/dashboard/Overview'

const UserDashboard = () => {
  return (
    <div className=' bg-[#F7F9F7] space-y-4 h-screen'>
        <HeaderUser/>
        <Overview/>
    </div>
  )
}

export default UserDashboard