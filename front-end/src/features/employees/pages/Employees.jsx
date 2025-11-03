import React from 'react'
import SearchFilter from '../components/SearchFilter'
import EmployeeTable from '../components/EmployeeTable'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import AddEmployee from '../components/AddEmployee'

const Employees = () => {
  return (
    <div className="space-y-4 bg-[#F7F9F7] px-5 py-2">
      <div>
        <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">
          Employee Management
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Manage and Review Employee
        </p>
      </div>

      <div>
        <SearchFilter />
      </div>
      <div>
        <div className="flex justify-end mb-4 overflow-auto">
          <Dialog>
  <DialogTrigger asChild>
    <Button>Add Employee</Button>
  </DialogTrigger>
  <DialogContent className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
    <AddEmployee />
  </DialogContent>
</Dialog>

        </div>
        <div>
        <EmployeeTable />
      </div>
      </div>
      
    </div>
  )
}

export default Employees
