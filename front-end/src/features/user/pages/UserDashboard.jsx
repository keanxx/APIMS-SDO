
import React from 'react'
import HeaderUser from '../components/HeaderUser'
import Trainings from '../components/Trainings'

const UserDashboard = () => {
  return (
    <div className='p-6 bg-[#F7F9F7] space-y-4 h-screen'>
        <HeaderUser/>
        <Trainings/>
    </div>
  )
}

export default UserDashboard