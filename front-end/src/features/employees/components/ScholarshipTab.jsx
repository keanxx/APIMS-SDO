import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ScholarshipTab = ({ employeeId }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [scholarships, setScholarships] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    sponsor: "",
    date_from: "",
    date_to: "",
  });

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      const res = await axios.get(`${API_URL}/schoolarship/${employeeId}`);
      setScholarships(res.data || []);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    }
  };

  useEffect(() => {
    if (employeeId) fetchScholarships();
  }, [employeeId]);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open dialog for adding
  const openAddDialog = () => {
    setFormData({ title: "", sponsor: "", date_from: "", date_to: "" });
    setIsEditing(false);
    setEditingId(null);
    setOpenDialog(true);
  };

  // Open dialog for editing
  const openEditDialog = (scholarship) => {
    setFormData({
      title: scholarship.title,
      sponsor: scholarship.sponsor,
      date_from: scholarship.date_from,
      date_to: scholarship.date_to,
    });
    setIsEditing(true);
    setEditingId(scholarship.id);
    setOpenDialog(true);
  };

  // Submit form (add or edit)
  const handleSubmit = async () => {
    try {
      if (isEditing && editingId) {
        // Edit
        await axios.put(`${API_URL}/schoolarship/${editingId}`, {
          ...formData,
          employee_id: employeeId,
        });
      } else {
        // Add
        await axios.post(`${API_URL}/schoolarship`, {
          ...formData,
          employee_id: employeeId,
        });
      }

      fetchScholarships();
      setOpenDialog(false);
      setFormData({ title: "", sponsor: "", date_from: "", date_to: "" });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving scholarship:", error);
    }
  };

   const handleDelete = async (employeeId) => {
        if (!confirm("Are you sure you want to delete this involvement?")) return;
      
        try {
          await axios.delete(`${API_URL}/schoolarship/${employeeId}`);
          fetchScholarships(); // refresh table after deletion
        } catch (error) {
          console.error("Delete error:", error);
        }
      };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Scholarships</h2>
        <Button onClick={openAddDialog}>Add Scholarship</Button>
      </div>

      {scholarships.length > 0 ? (
        scholarships.map((sch) => (
          <Card key={sch.id} className="shadow-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{sch.title}</CardTitle>
              <Button size="sm" variant="outline" onClick={() => openEditDialog(sch)}>
                Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleDelete(sch.id)}>
                Delete
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              <div>
                <Label>Sponsor:</Label>
                <p>{sch.sponsor}</p>
              </div>
              <div>
                <Label>Date From:</Label>
                <p>{sch.date_from}</p>
              </div>
              <div>
                <Label>Date To:</Label>
                <p>{sch.date_to}</p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No scholarships found.</p>
      )}

      {/* ADD / EDIT SCHOLARSHIP DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Scholarship" : "Add Scholarship"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Sponsor</Label>
              <Input name="sponsor" value={formData.sponsor} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Date From</Label>
              <Input type="date" name="date_from" value={formData.date_from} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Date To</Label>
              <Input type="date" name="date_to" value={formData.date_to} onChange={handleInputChange} />
            </div>
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>{isEditing ? "Update" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScholarshipTab;
