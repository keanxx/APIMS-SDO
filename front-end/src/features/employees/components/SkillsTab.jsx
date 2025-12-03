import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SkillsTab = ({ employeeId }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [records, setRecords] = useState([]);
  const [skill, setSkill] = useState("");
  const [open, setOpen] = useState(false);

  // For editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch existing data
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/skills-membership/employee/${employeeId}/skills`
      );
      setRecords(res.data.skills || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open Add Dialog
  const openAdd = () => {
    setSkill("");
    setIsEditing(false);
    setEditingId(null);
    setOpen(true);
  };

  // Open Edit Dialog
  const openEdit = (item) => {
    setSkill(item.skill);
    setIsEditing(true);
    setEditingId(item.id);
    setOpen(true);
  };

  // Submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      skills: skill,
      membership:null,
      employee_id: employeeId,
    };

    try {
      if (isEditing && editingId) {
        // PUT update
        await axios.put(`${API_URL}/skills-membership/${editingId}`, payload);
      } else {
        // POST create
        await axios.post(`${API_URL}/skills-membership/`, payload);
      }

      setSkill("");
      setIsEditing(false);
      setEditingId(null);
      setOpen(false);
      fetchData(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
  };
     const handleDelete = async (employeeId) => {
        if (!confirm("Are you sure you want to delete this skill?")) return;
      
        try {
          await axios.delete(`${API_URL}/skills-membership/${employeeId}`);
          fetchData(); // refresh table after deletion
        } catch (error) {
          console.error("Delete error:", error);
        }
      };


  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Skills</CardTitle>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd}>Add New</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Skill" : "Add Skill"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing
                    ? "Update this skill."
                    : "Enter a new skill."}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Skills</Label>
                  <Input
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="Enter skill"
                  />
                </div>

                <Button type="submit" className="w-full">
                  {isEditing ? "Update" : "Save"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {records.length === 0 ? (
            <p className="text-sm text-gray-500">No records found.</p>
          ) : (
            <div className="space-y-3">
              {records.map((item, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-md flex justify-between"
                >
                  <div>
                    <p>{item.skill}</p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(item)}
                  >
                    Edit
                  </Button>
                  
                   <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>

                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsTab;
