// AddEditResearch.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AddEditResearch({ isOpen, onClose, editingResearch, onSuccess }) {
  const { user } = useAuth();
  const isEdit = !!editingResearch;

  const [formData, setFormData] = useState({
    title: "",
    date_from: "",
    date_to: "",
    abstract_summary: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (editingResearch) {
        setFormData({
          title: editingResearch.title || "",
          date_from: editingResearch.date_from || "",
          date_to: editingResearch.date_to || "",
          abstract_summary: editingResearch.abstract_summary || "",
        });
      } else {
        setFormData({
          title: "",
          date_from: "",
          date_to: "",
          abstract_summary: "",
        });
      }
      setError("");
    }
  }, [editingResearch, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        await axiosInstance.put(`/research-innovation/${editingResearch.id}`, payload);
      } else {
        await axiosInstance.post("/research-innovation/", payload);
      }

      console.log(
        `Research ${isEdit ? "updated" : "created"} successfully`
      );
      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to save research:", err);
      setError(
        err.response?.data?.message || "Failed to save research record"
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
            {isEdit ? "Edit Research" : "Add Research"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter research title"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div>
            <Label htmlFor="abstract_summary">Abstract Summary</Label>
            <Textarea
              id="abstract_summary"
              name="abstract_summary"
              value={formData.abstract_summary}
              onChange={handleChange}
              required
              placeholder="Enter abstract summary"
              rows={6}
              className="resize-none"
            />
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
