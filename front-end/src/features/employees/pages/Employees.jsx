import SidebarLayout from '@/components/SidebarLayout'
import React from 'react'
import SearchFilter from '../components/SearchFilter'
import EmployeeTable from '../components/EmployeeTable'

const Employees = () => {
  return (

      <div className='space-y-4 bg-[#F7F9F7]'>
        <div>
        <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">Employee Management</h1>
        <p className="text-xs md:text-sm text-muted-foreground">Manage and Review Employee</p>
        </div>

        <div>
          <SearchFilter/>
        </div>
        <div>
          <EmployeeTable/>
        </div>
      </div>

  )
}

export default Employees