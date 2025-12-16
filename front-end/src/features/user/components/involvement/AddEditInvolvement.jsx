// AddEditInvolvement.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AddEditInvolvement({ isOpen, onClose, editingInvolvement, onSuccess }) {
  const { user } = useAuth();
  const isEdit = !!editingInvolvement;

  const [formData, setFormData] = useState({
    name_org: "",
    address_org: "",
    date_from: "",
    date_to: "",
    hours_no: 0,
    position: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (editingInvolvement) {
        setFormData({
          name_org: editingInvolvement.name_org || "",
          address_org: editingInvolvement.address_org || "",
          date_from: editingInvolvement.date_from || "",
          date_to: editingInvolvement.date_to || "",
          hours_no: editingInvolvement.hours_no || 0,
          position: editingInvolvement.position || "",
        });
      } else {
        setFormData({
          name_org: "",
          address_org: "",
          date_from: "",
          date_to: "",
          hours_no: 0,
          position: "",
        });
      }
      setError("");
    }
  }, [editingInvolvement, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "hours_no" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        employee_id: user.employee_id,
      };

      if (isEdit) {
        await axiosInstance.put(`/involvement/${editingInvolvement.id}`, payload);
      } else {
        await axiosInstance.post("/involvement/", payload);
      }

      console.log(
        `Involvement ${isEdit ? "updated" : "created"} successfully`
      );
      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to save involvement:", err);
      setError(
        err.response?.data?.message || "Failed to save involvement record"
      );
      setLoading(false);
    }
  };

  const handleOpenChange = (open) => {
    if (!open && !loading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Involvement" : "Add Involvement"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name_org">Organization Name</Label>
              <Input
                id="name_org"
                name="name_org"
                value={formData.name_org}
                onChange={handleChange}
                required
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="Enter position"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address_org">Address</Label>
            <Input
              id="address_org"
              name="address_org"
              value={formData.address_org}
              onChange={handleChange}
              required
              placeholder="Enter organization address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date_from">Start Date</Label>
              <Input
                id="date_from"
                name="date_from"
                type="date"
                value={formData.date_from}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="date_to">End Date</Label>
              <Input
                id="date_to"
                name="date_to"
                type="date"
                value={formData.date_to}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="hours_no">Hours</Label>
              <Input
                id="hours_no"
                name="hours_no"
                type="number"
                min="0"
                step="0.5"
                value={formData.hours_no}
                onChange={handleChange}
                required
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-[#1A3A1A] hover:bg-[#1A3A1A]/90"
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
