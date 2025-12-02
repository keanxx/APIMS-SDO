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

const ResearchInnovationTab = ({ employeeId }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [innovations, setInnovations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date_from: "",
    date_to: "",
    abstract_summary: "",
  });

  // Fetch all research/innovation records for this employee
  const fetchInnovations = async () => {
    try {
      const res = await axios.get(`${API_URL}/research-innovation/${employeeId}`);
      setInnovations(res.data || []);
    } catch (error) {
      console.error("Error fetching research innovations:", error);
    }
  };

  useEffect(() => {
    if (employeeId) fetchInnovations();
  }, [employeeId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Add Dialog
  const openAddDialog = () => {
    setFormData({ title: "", date_from: "", date_to: "", abstract_summary: "" });
    setIsEditing(false);
    setEditingId(null);
    setOpenDialog(true);
  };

  // Open Edit Dialog
  const openEditDialog = (record) => {
    setFormData({
      title: record.title,
      date_from: record.date_from,
      date_to: record.date_to,
      abstract_summary: record.abstract_summary,
    });
    setIsEditing(true);
    setEditingId(record.id);
    setOpenDialog(true);
  };

  // Submit Add/Edit
  const handleSubmit = async () => {
    try {
      if (isEditing && editingId) {
        await axios.put(`${API_URL}/research-innovation/${editingId}`, {
          ...formData,
          employee_id: employeeId,
        });
      } else {
        await axios.post(`${API_URL}/research-innovation`, {
          ...formData,
          employee_id: employeeId,
        });
      }

      fetchInnovations();
      setOpenDialog(false);
      setFormData({ title: "", date_from: "", date_to: "", abstract_summary: "" });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving research innovation:", error);
    }
  };

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this record?")) return;

  try {
    await axios.delete(`${API_URL}/research-innovation/${id}`);
    // Instead of relying on fetch, you can also optimistically remove it:
    setInnovations((prev) => prev.filter((rec) => rec.id !== id));
  } catch (error) {
    console.error("Delete error:", error);
  }
};


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Research & Innovation</h2>
        <Button onClick={openAddDialog}>Add Research/Innovation</Button>
      </div>

      {innovations.length > 0 ? (
        innovations.map((rec) => (
          <Card key={rec.id} className="shadow-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{rec.title}</CardTitle>
              <Button size="sm" variant="outline" onClick={() => openEditDialog(rec)}>
                Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleDelete(rec.id)}>
                Delete
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              <div>
                <Label>Date From:</Label>
                <p>{rec.date_from}</p>
              </div>
              <div>
                <Label>Date To:</Label>
                <p>{rec.date_to}</p>
              </div>
              <div>
                <Label>Abstract/Summary:</Label>
                <p>{rec.abstract_summary}</p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No research or innovation records found.</p>
      )}

      {/* ADD / EDIT DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Record" : "Add Research/Innovation"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Date From</Label>
              <Input type="date" name="date_from" value={formData.date_from} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Date To</Label>
              <Input type="date" name="date_to" value={formData.date_to} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Abstract / Summary</Label>
              <Input name="abstract_summary" value={formData.abstract_summary} onChange={handleInputChange} />
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

export default ResearchInnovationTab;
