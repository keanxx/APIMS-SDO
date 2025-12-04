import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PositionTable = () => {
  const [positiondata, setPositionData] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [positionToDelete, setPositionToDelete] = useState(null)
  const [salaryGrade, setSalaryGrade] = useState([])
  const [selectedSalaryGrade, setSelectedSalaryGrade] = useState("")

  const [formData, setFormData] = useState({
    position: "",
    classification: "",
    salary_grade: ""
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const API_URL = import.meta.env.VITE_API_URL

  // Fetch positions
  const fetchPositions = async () => {
    try {
      const response = await axios.get(`${API_URL}/position/all`)
      setPositionData(response.data)
    } catch (error) {
      console.error("Error fetching positions:", error)
    }
  }

  // Fetch salary grades (Tranches)
  const fetchSalaryGrades = async () => {
    try {
      const response = await axios.get(`${API_URL}/salary_tranches`)
      setSalaryGrade(response.data)
    } catch (error) {
      console.error("Error fetching salary grades:", error)
    }
  }

  useEffect(() => {
    fetchPositions()
    fetchSalaryGrades()
  }, [API_URL])


  // ---------- FIXED EDIT BUTTON ----------
  const handleEditClick = (position) => {
    setSelectedPosition(position)

    // Attempt to get UUID (backend may NOT return it)
    let gradeUUID = position?.tranche?.id || ""

    // If UUID missing → match by salary_grade number
    if (!gradeUUID && position?.tranche?.salary_grade) {
      const matchedGrade = salaryGrade.find(
        (g) => g.salary_grade === position.tranche.salary_grade
      )
      if (matchedGrade) gradeUUID = matchedGrade.id
    }

    console.log("Mapped Grade UUID:", gradeUUID)

    setFormData({
      position: position.position,
      classification: position.classification,
      salary_grade: gradeUUID
    })

    setSelectedSalaryGrade(gradeUUID)
    setIsDialogOpen(true)
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  // ---------- SAVE CHANGES ----------
  const handleSaveChanges = async () => {
    if (!selectedPosition) return

    const finalSalaryGrade = selectedSalaryGrade || formData.salary_grade

    try {
      await axios.put(`${API_URL}/position/update/${selectedPosition.id}`, {
        position: formData.position,
        classification: formData.classification,
        salary_grade: finalSalaryGrade
      })

      alert("✅ Position updated successfully!")
      setIsDialogOpen(false)
      fetchPositions()
    } catch (error) {
      console.error("Error updating position:", error)
      alert("Failed to update position.")
    }
  }


  // ---------- DELETE ---------
  const handleDeleteClick = (position) => {
    setPositionToDelete(position)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!positionToDelete) return

    try {
      await axios.delete(`${API_URL}/position/delete/${positionToDelete.id}`)
      alert("🗑️ Position deleted successfully!")
      setIsDeleteDialogOpen(false)
      fetchPositions()
    } catch (error) {
      console.error("Error deleting position:", error)
      alert("Failed to delete position.")
    }
  }


  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = positiondata.slice(startIndex, endIndex)
  const totalPages = Math.ceil(positiondata.length / itemsPerPage)

  return (
    <Card>
      <CardTitle className="px-5 font-light">Positions ({positiondata.length})</CardTitle>
      <CardContent>
        
        {/* TABLE */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Salary Grade</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentData.map((position, index) => (
              <TableRow key={index}>
                <TableCell>{position.position}</TableCell>
                <TableCell>{position.classification}</TableCell>
                <TableCell>{position.tranche.salary_grade}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[#F7F9F7] border border-[#7CB342] text-[#2D5A2D]"
                    onClick={() => handleEditClick(position)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-red-100 border border-red-500 text-red-600 ml-2"
                    onClick={() => handleDeleteClick(position)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

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

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>


        {/* EDIT DIALOG */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Position</DialogTitle>
            </DialogHeader>

            <div className="space-y-3 mt-3">

              <div>
                <Label>Position</Label>
                <Input name="position" value={formData.position} onChange={handleChange} />
              </div>

              <div>
                <Label>Classification</Label>
                <Select value={formData.classification} onValueChange={(value) => handleSelectChange('classification', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select classification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teaching">Teaching</SelectItem>
                    <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                    <SelectItem value="Teaching Related">Teaching Related</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* FIXED SALARY GRADE SELECT */}
              <div>
                <Label>Salary Grade</Label>
                <Select value={selectedSalaryGrade} onValueChange={setSelectedSalaryGrade}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Salary Grade Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {salaryGrade.map((salary) => (
                        <SelectItem key={salary.id} value={salary.id}>
                          {salary.salary_grade}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-[#7CB342] text-white" onClick={handleSaveChanges}>
                Save Changes
              </Button>

            </div>
          </DialogContent>
        </Dialog>


        {/* DELETE CONFIRMATION */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>

            <p>
              Are you sure you want to delete <strong>{positionToDelete?.position}</strong>?  
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button className="bg-red-600 text-white" onClick={handleConfirmDelete}>Delete</Button>
            </div>

          </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  )
}

export default PositionTable
