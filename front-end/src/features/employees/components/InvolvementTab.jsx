import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InvolvementTab = ({ employeeId }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [involvements, setInvolvements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // track edit mode
  const [editingId, setEditingId] = useState(null); // id of item being edited

  const [formData, setFormData] = useState({
    name_org: "",
    address_org: "",
    date_from: "",
    date_to: "",
    hours_no: 0,
    position: "",
  });

  // Fetch involvements
  const fetchInvolvements = async () => {
    try {
      const res = await axios.get(`${API_URL}/involvement/${employeeId}`);
      setInvolvements(res.data || []);
    } catch (error) {
      console.error("Error fetching involvements:", error);
    }
  };

  useEffect(() => {
    if (employeeId) fetchInvolvements();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Add dialog
  const handleAddClick = () => {
    setFormData({
      name_org: "",
      address_org: "",
      date_from: "",
      date_to: "",
      hours_no: 0,
      position: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setOpenDialog(true);
  };

  // Open Edit dialog
  const handleEditClick = (item) => {
    setFormData({
      name_org: item.name_org,
      address_org: item.address_org,
      date_from: item.date_from,
      date_to: item.date_to,
      hours_no: item.hours_no,
      position: item.position,
    });
    setIsEditing(true);
    setEditingId(item.id);
    setOpenDialog(true);
  };

  // Save Add/Edit
  const handleSave = async () => {
    try {
      if (isEditing) {
        // Edit
        await axios.put(`${API_URL}/involvement/${editingId}`, {
          ...formData,
          employee_id: employeeId,
          hours_no: Number(formData.hours_no),
        });
      } else {
        // Add
        await axios.post(`${API_URL}/involvement`, {
          ...formData,
          employee_id: employeeId,
          hours_no: Number(formData.hours_no),
        });
      }

      fetchInvolvements();
      setOpenDialog(false);

      // Reset form
      setFormData({
        name_org: "",
        address_org: "",
        date_from: "",
        date_to: "",
        hours_no: 0,
        position: "",
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving involvement:", error);
    }
  };

  
    const handleDelete = async (employeeId) => {
      if (!confirm("Are you sure you want to delete this involvement?")) return;
    
      try {
        await axios.delete(`${API_URL}/involvement/${employeeId}`);
        fetchInvolvements(); // refresh table after deletion
      } catch (error) {
        console.error("Delete error:", error);
      }
    };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Involvements</h2>
        <Button onClick={handleAddClick}>Add Involvement</Button>
      </div>

      {involvements.length > 0 ? (
        involvements.map((involvement) => (
          <Card key={involvement.id} className="shadow-sm">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{involvement.name_org}</CardTitle>
              <Button size="sm" variant="outline" onClick={() => handleEditClick(involvement)}>
                Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleDelete(involvement.id)}>
                Delete
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <Label>Address:</Label>
                <p>{involvement.address_org}</p>
              </div>
              <div>
                <Label>Position:</Label>
                <p>{involvement.position}</p>
              </div>
              <div>
                <Label>Date From:</Label>
                <p>{involvement.date_from}</p>
              </div>
              <div>
                <Label>Date To:</Label>
                <p>{involvement.date_to}</p>
              </div>
              <div>
                <Label>Total Hours:</Label>
                <p>{involvement.hours_no}</p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No involvements found.</p>
      )}

      {/* ADD/EDIT DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Involvement" : "Add Involvement"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Organization Name</Label>
              <Input name="name_org" value={formData.name_org} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Address</Label>
              <Input name="address_org" value={formData.address_org} onChange={handleInputChange} />
            </div>

            <div>
              <Label>Position</Label>
              <Input name="position" value={formData.position} onChange={handleInputChange} />
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
              <Label>Total Hours</Label>
              <Input type="number" name="hours_no" value={formData.hours_no} onChange={handleInputChange} />
            </div>
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{isEditing ? "Update" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvolvementTab;
