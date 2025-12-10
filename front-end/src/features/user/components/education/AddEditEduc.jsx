import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance';

export function AddEditEduc({ 
  isOpen, 
  onClose, 
  editingEducation, 
  onSuccess 
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    level: "",
    school_name: "",
    graduated_year: "",
    date_from: "",
    date_to: "",
  });

  useEffect(() => {
    if (editingEducation) {
      setFormData({
        level: editingEducation.level || "",
        school_name: editingEducation.school_name || "",
        graduated_year: editingEducation.graduated_year || "",
        date_from: editingEducation.date_from || "",
        date_to: editingEducation.date_to || "",
      });
    } else {
      setFormData({
        level: "",
        school_name: "",
        graduated_year: "",
        date_from: "",
        date_to: "",
      });
    }
  }, [editingEducation, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEducation) {
        const response = await axiosInstance.put(
          `/education/update/${editingEducation.id}`,
          {
            ...formData,
            employee_id: user.employee_id
          }
        );
        onSuccess();
      } else {
        const response = await axiosInstance.post('/education/add', {
          ...formData,
          employee_id: user.employee_id
        });
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.error('Failed to save education:', error);
      alert('Failed to save education record');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[340px] rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingEducation ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData({ ...formData, level: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elementary">Elementary</SelectItem>
                  <SelectItem value="Junior High">Junior High</SelectItem>
                  <SelectItem value="Senior High">Senior High</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="Graduate Studies">
                    Graduate Studies
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>School Name</Label>
              <Input
                value={formData.school_name}
                onChange={(e) =>
                  setFormData({ ...formData, school_name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Date From</Label>
              <Input
                type="date"
                value={formData.date_from}
                onChange={(e) =>
                  setFormData({ ...formData, date_from: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Date To</Label>
              <Input
                type="date"
                value={formData.date_to}
                onChange={(e) =>
                  setFormData({ ...formData, date_to: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Year Graduated</Label>
              <Input
                value={formData.graduated_year}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    graduated_year: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-[#1A3A1A] hover:bg-[#1A3A1A]/90"
            >
              {editingEducation ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}