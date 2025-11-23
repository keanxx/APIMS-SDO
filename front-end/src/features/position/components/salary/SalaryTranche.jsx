import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SalaryTranche = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const [newGrade, setNewGrade] = useState({
    salary_grade: "",
    step1: "",
    step2: "",
    step3: "",
    step4: "",
    step5: "",
    step6: "",
    step7: "",
    step8: "",
    code: "",
  })

  const API_URL = import.meta.env.VITE_API_URL

  // Fetch salary data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/salary_tranches/`)
      setData(res.data)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch salary tranches.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    if (isEditOpen) {
      setSelectedRow((prev) => ({...prev, [name]: value }))
    } else {
      setNewGrade((prev) => ({...prev, [name]: value }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = {
        salary_grade: Number(newGrade.salary_grade),
        step1: Number(newGrade.step1),
        step2: Number(newGrade.step2),
        step3: Number(newGrade.step3),
        step4: Number(newGrade.step4),
        step5: Number(newGrade.step5),
        step6: Number(newGrade.step6),
        step7: Number(newGrade.step7),
        step8: Number(newGrade.step8),
        code: newGrade.code,
      }

      await axios.post(`${API_URL}/salary_tranches/add`, payload)
      setIsDialogOpen(false)
      setNewGrade({
        salary_grade: "",
        step1: "",
        step2: "",
        step3: "",
        step4: "",
        step5: "",
        step6: "",
        step7: "",
        step8: "",
        code: "",
      })
      fetchData()
    } catch (err) {
      console.error(err)
      alert("Failed to add salary grade.")
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try{
      const payload = {
        salary_grade: Number(selectedRow.salary_grade),
        step1: Number(selectedRow.step1),
        step2: Number(selectedRow.step2),
        step3: Number(selectedRow.step3),
        step4: Number(selectedRow.step4),
        step5: Number(selectedRow.step5),
        step6: Number(selectedRow.step6),
        step7: Number(selectedRow.step7),
        step8: Number(selectedRow.step8),
        code: selectedRow.code,
    }

      await axios.put(`${API_URL}/salary_tranches/${selectedRow.id}`, payload)
      setIsEditOpen(false)
      setSelectedRow(null)
      fetchData()
    } catch (err) {
      console.error(err)
      alert("Failed to update salary grade.")
    }
  }

  if (loading) return <p>Loading salary tranches...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <>
      <Card className="mt-4">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Salary Tranches</CardTitle>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => setIsDialogOpen(true)}>+ Add Grade</Button>
            <Button>Create New Tranche</Button>
          </div>
          
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Salary Grade</TableHead>
                  <TableHead>Step 1</TableHead>
                  <TableHead>Step 2</TableHead>
                  <TableHead>Step 3</TableHead>
                  <TableHead>Step 4</TableHead>
                  <TableHead>Step 5</TableHead>
                  <TableHead>Step 6</TableHead>
                  <TableHead>Step 7</TableHead>
                  <TableHead>Step 8</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">
                        {row.salary_grade}
                      </TableCell>
                      <TableCell>₱{row.step1.toLocaleString()}</TableCell>
                      <TableCell>₱{row.step2.toLocaleString()}</TableCell>
                      <TableCell>₱{row.step3.toLocaleString()}</TableCell>
                      <TableCell>₱{row.step4.toLocaleString()}</TableCell>
                      <TableCell>₱{row.step5.toLocaleString()}</TableCell>
                      <TableCell>₱{row.step6.toLocaleString()}</TableCell>
                      <TableCell>₱{row.step7.toLocaleString()}</TableCell>
                      <TableCell>₱{row.step8.toLocaleString()}</TableCell>
                      <TableCell><Button 
                      size="sm"
                      variant="outline"
                      onClick ={() => {
                        setSelectedRow(row)
                        setIsEditOpen(true)
                      }}
                      >Edit</Button></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Salary Grade Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Salary Grade</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label htmlFor="salary_grade">Salary Grade</Label>
                <Input
                  id="salary_grade"
                  name="salary_grade"
                  placeholder="e.g. 3"
                  value={newGrade.salary_grade}
                  onChange={handleChange}
                  required
                />
              </div>

              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <Label htmlFor={`step${i + 1}`}>Step {i + 1}</Label>
                  <Input
                    id={`step${i + 1}`}
                    name={`step${i + 1}`}
                    placeholder="₱"
                    value={newGrade[`step${i + 1}`]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="col-span-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="e.g. SG3-2025"
                  value={newGrade.code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button type="submit">Add Grade</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Salary Grade</DialogTitle>
          </DialogHeader>

          {selectedRow && (
            <form onSubmit={handleEdit}>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="salary_grade">Salary Grade</Label>
                  <Input
                    id="salary_grade"
                    name="salary_grade"
                    value={selectedRow.salary_grade}
                    onChange={handleChange}
                    required
                  />
                </div>

                {[...Array(8)].map((_, i) => (
                  <div key={i}>
                    <Label htmlFor={`step${i + 1}`}>Step {i + 1}</Label>
                    <Input
                      id={`step${i + 1}`}
                      name={`step${i + 1}`}
                      value={selectedRow[`step${i + 1}`]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="col-span-2">
                  <Label htmlFor="code">Code</Label>
                  <Input
                    id="code"
                    name="code"
                    value={selectedRow.code}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SalaryTranche
