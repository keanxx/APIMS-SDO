import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const EmployeeTable = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    maxPage: 1,
    totalRecords: 0,
  })
 const currentData = employee; 
const totalPages = pagination.maxPage;
const [alert, setAlert] = useState(null);


const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_URL}/employee/with_workstation?page=${currentPage}`);
        const data = await response.json();
        setEmployee(data.data);
        setPagination({
         maxPage: data.max_page || 1,
          totalRecords: data.total_records || 0,
        })
      } catch (error) {
        console.error("❌ Fetch failed:", error);
      }
    };

    fetchEmployees();
  }, [API_URL, currentPage]);

 const handleDelete = async (employee) => {
    try {
      await axios.delete(`${API_URL}/employee/${employee.employee_id}`)
      
      setAlert({
        type: 'success',
        title: 'Employee Deleted',
        description: `Employee ${employee.f_name} ${employee.l_name} has been deleted successfully.`
      })
      onDeleted?.(employee.id) 
    } catch (error) {
      console.error("❌ Delete failed:", error)
      setAlert({ type: "error",
        title: "Delete failed",
        description: "Something went wrong while deleting the employee.",})
    }
  }
  return (
    <>
    <Card >
      <CardTitle className="px-5 font-light">Employees ({employee.length})</CardTitle>
      <CardContent className={"h-[50vh] overflow-y-auto"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Position</TableHead>
              <TableHead >School/Office</TableHead>
              <TableHead >District</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarFallback>
  {employee.f_name && employee.l_name
    ? `${employee.f_name[0]}${employee.l_name[0]}`.toUpperCase()
    : 'N/A'}
</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{`${employee.f_name} ${employee.l_name}`}</p>
                      <p className="text-muted-foreground text-xs md:text-sm truncate">
                        {employee.email_address}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.position_name}</TableCell>
                <TableCell>
                  <Button className = 'bg-[#F7F9F7] border border-[#7CB342] text-[#2D5A2D] size="sm" variant="outline"'
                  onClick={() => navigate(`/employees/${employee.employee_id}`)}>View</Button>
                   <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className='bg-[#F7F9F7] border border-[#b3424b] text-[#832e35]'
              size="sm"
              variant="outline"
            >
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete {employee.f_name} {employee.l_name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The employee record will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(employee)}
                className="bg-[#b3424b] text-white hover:bg-[#9a3740]"
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>

        <Pagination>
          <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

    {/* Page numbers */}
    {Array.from({ length: pagination.maxPage}, (_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          isActive={currentPage === i + 1}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}

    {/* Next button */}
    <PaginationItem>
      <PaginationNext
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.maxPage))}
        className={currentPage === pagination.maxPage ? "pointer-events-none opacity-50" : ""}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
</CardFooter>
    </Card>
    
    {alert && (
  <div className="fixed bottom-5 right-5 z-50 w-80 animate-in fade-in-50">
    <Alert
      className={
        alert.type === 'success'
          ? 'border-green-600 bg-green-50 text-green-800'
          : 'border-red-600 bg-red-50 text-red-800'
      }
    >
      <CheckCircle2Icon className="h-5 w-5" />
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription>{alert.description}</AlertDescription>
    </Alert>
  </div>
)}
</>
     
  )
}

export default EmployeeTable
