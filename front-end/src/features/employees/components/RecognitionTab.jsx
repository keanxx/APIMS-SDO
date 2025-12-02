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

const RecognitionTab = ({ employeeId }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [recognition, setRecognition] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    award: "",
    award_body: "",
    date_awarded: "",
    award_level: "",
  });

  // Fetch all recognition for this employee
  const fetchRecognition = async () => {
    try {
      const res = await axios.get(`${API_URL}/recognition/${employeeId}`);
      setRecognition(res.data || []);
    } catch (error) {
      console.error("Error fetching recognition:", error);
    }
  };

  useEffect(() => {
    if (employeeId) fetchRecognition();
  }, [employeeId]);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open add dialog
  const openAddDialog = () => {
    setFormData({ award: "", award_body: "", date_awarded: "", award_level: "" });
    setIsEditing(false);
    setEditingId(null);
    setOpenDialog(true);
  };

  // Open edit dialog
  const openEditDialog = (award) => {
    setFormData({
      award: award.award,
      award_body: award.award_body,
      date_awarded: award.date_awarded,
      award_level: award.award_level,
    });
    setIsEditing(true);
    setEditingId(award.id);
    setOpenDialog(true);
  };

  // Submit form (add or edit)
  const handleSubmit = async () => {
    try {
      if (isEditing && editingId) {
        await axios.put(`${API_URL}/recognition/${editingId}`, {
          ...formData,
          employee_id: employeeId,
        });
      } else {
        await axios.post(`${API_URL}/recognition`, {
          ...formData,
          employee_id: employeeId,
        });
      }

      fetchRecognition();
      setOpenDialog(false);
      setFormData({ award: "", award_body: "", date_awarded: "", award_level: "" });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving award:", error);
    }
  };

     const handleDelete = async (employeeId) => {
          if (!confirm("Are you sure you want to delete this recognition?")) return;
        
          try {
            await axios.delete(`${API_URL}/recognition/${employeeId}`);
            fetchRecognition(); // refresh table after deletion
          } catch (error) {
            console.error("Delete error:", error);
          }
        };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Awards</h2>
        <Button onClick={openAddDialog}>Add Award</Button>
      </div>

      {recognition.length > 0 ? (
        recognition.map((a) => (
          <Card key={a.id} className="shadow-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{a.award}</CardTitle>
              <Button size="sm" variant="outline" onClick={() => openEditDialog(a)}>
                Edit
              </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(a.id)}>
                  Delete
                </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              <div>
                <Label>Awarding Body:</Label>
                <p>{a.award_body}</p>
              </div>
              <div>
                <Label>Award Level:</Label>
                <p>{a.award_level}</p>
              </div>
              <div>
                <Label>Date Awarded:</Label>
                <p>{a.date_awarded}</p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No recognition found.</p>
      )}

      {/* ADD / EDIT DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Award" : "Add Award"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Award</Label>
              <Input name="award" value={formData.award} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Awarding Body</Label>
              <Input name="award_body" value={formData.award_body} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Award Level</Label>
              <Input name="award_level" value={formData.award_level} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Date Awarded</Label>
              <Input type="date" name="date_awarded" value={formData.date_awarded} onChange={handleInputChange} />
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

export default RecognitionTab;
