import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PositionTable = () => {
  const navigate = useNavigate();
  const [positiondata, setPositionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const startIndex = (currentPage - 1) * itemsPerPage
const endIndex = startIndex + itemsPerPage
  const currentData = positiondata.slice(startIndex, endIndex)
  const totalPages = Math.ceil(positiondata.length / itemsPerPage)

const API_URL = import.meta.env.VITE_API_URL

useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${API_URL}/position/all`);
        setPositionData(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    }
    
    fetchPositions()
  }, [API_URL]);

  return (
    <Card>
      <CardTitle className="px-5 font-light">Employees ({positiondata.length})</CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead >Classification</TableHead>
              <TableHead >Salary Grade</TableHead>
              <TableHead >Salary Code</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((position, index) => (
              <TableRow key={index}>
                <TableCell>{position.position}</TableCell>
                <TableCell >{position.classification}</TableCell>
                <TableCell >{position.tranche.salary_grade}</TableCell>
                 <TableCell >{position.tranche.code}</TableCell>
                <TableCell>
                  <Button className = "bg-[#F7F9F7 border border-[#7CB342] text-[#2D5A2D]"size="sm" variant="outline"
                  onClick={() => navigate(`/employees/${position.id}`)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
  <PaginationContent>
   
    <PaginationItem>
      <PaginationPrevious
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
      />
    </PaginationItem>

    {/* Page numbers */}
    {Array.from({ length: totalPages }, (_, i) => (
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
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>

      </CardContent>
    </Card>
  )
}

export default PositionTable
