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
import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance';

export function AddEditFamily({ 
  isOpen, 
  onClose, 
  familyType,
  editingData, // ✅ If this exists, we're editing; if null, we're adding
  onSuccess 
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    spouse_fname: "",
    spouse_mname: "",
    spouse_lname: "",
    spouse_exname: "",
    occupation: "",
    employer_business: "",
    business_add: "",
    tel_no: "",
    father_lname: "",
    father_fname: "",
    father_mname: "",
    father_exname: "",
    mother_maidenname: "",
    mother_fname: "",
    mother_mname: "",
  });
  const [loading, setLoading] = useState(false);

  const isEditing = editingData && editingData.id;

  // ✅ Load the FULL family data when editing
  useEffect(() => {
    if (isOpen) {
      if (editingData && editingData.id) {
        setFormData({
          spouse_fname: editingData.spouse_fname || "",
          spouse_mname: editingData.spouse_mname || "",
          spouse_lname: editingData.spouse_lname || "",
          spouse_exname: editingData.spouse_exname || "",
          occupation: editingData.occupation || "",
          employer_business: editingData.employer_business || "",
          business_add: editingData.business_add || "",
          tel_no: editingData.tel_no || "",
          father_lname: editingData.father_lname || "",
          father_fname: editingData.father_fname || "",
          father_mname: editingData.father_mname || "",
          father_exname: editingData.father_exname || "",
          mother_maidenname: editingData.mother_maidenname || "",
          mother_fname: editingData.mother_fname || "",
          mother_mname: editingData.mother_mname || "",
        });
      } else {
        // Reset form for adding new record
        setFormData({
          spouse_fname: "",
          spouse_mname: "",
          spouse_lname: "",
          spouse_exname: "",
          occupation: "",
          employer_business: "",
          business_add: "",
          tel_no: "",
          father_lname: "",
          father_fname: "",
          father_mname: "",
          father_exname: "",
          mother_maidenname: "",
          mother_fname: "",
          mother_mname: "",
        });
      }
    }
  }, [editingData, isOpen]);

  // ✅ Separate function for adding new family data
  const handleAdd = async (payload) => {
    const response = await axiosInstance.post('/family/add', payload);
    return response;
  };

  // ✅ Separate function for updating existing family data
  const handleUpdate = async (payload) => {
    const response = await axiosInstance.put(
      `/family/update/${editingData.id}`,
      payload
    );
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Send ALL fields with employee_id
      const payload = {
        spouse_fname: formData.spouse_fname,
        spouse_mname: formData.spouse_mname,
        spouse_lname: formData.spouse_lname,
        spouse_exname: formData.spouse_exname,
        occupation: formData.occupation,
        employer_business: formData.employer_business,
        business_add: formData.business_add,
        tel_no: formData.tel_no,
        father_lname: formData.father_lname,
        father_fname: formData.father_fname,
        father_mname: formData.father_mname,
        father_exname: formData.father_exname,
        mother_maidenname: formData.mother_maidenname,
        mother_fname: formData.mother_fname,
        mother_mname: formData.mother_mname,
        employee_id: user.employee_id
      };

      // ✅ Call the appropriate function based on mode
      const response = isEditing ? await handleUpdate(payload) : await handleAdd(payload);

      onSuccess(response.data);
      onClose();
    } catch (error) {
      console.error('Failed to save family data:', error);
      alert(error.response?.data?.message || 'Failed to save family information');
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    if (familyType === "spouse") {
      return (
        <>
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={formData.spouse_fname || ""}
              onChange={(e) =>
                setFormData({ ...formData, spouse_fname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Middle Name</Label>
            <Input
              value={formData.spouse_mname || ""}
              onChange={(e) =>
                setFormData({ ...formData, spouse_mname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              value={formData.spouse_lname || ""}
              onChange={(e) =>
                setFormData({ ...formData, spouse_lname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Extension Name</Label>
            <Input
              value={formData.spouse_exname || ""}
              onChange={(e) =>
                setFormData({ ...formData, spouse_exname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Occupation</Label>
            <Input
              value={formData.occupation || ""}
              onChange={(e) =>
                setFormData({ ...formData, occupation: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Employer/Business</Label>
            <Input
              value={formData.employer_business || ""}
              onChange={(e) =>
                setFormData({ ...formData, employer_business: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Business Address</Label>
            <Input
              value={formData.business_add || ""}
              onChange={(e) =>
                setFormData({ ...formData, business_add: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Contact Number</Label>
            <Input
              value={formData.tel_no || ""}
              onChange={(e) =>
                setFormData({ ...formData, tel_no: e.target.value })
              }
              disabled={loading}
            />
          </div>
        </>
      );
    } else if (familyType === "father") {
      return (
        <>
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={formData.father_fname || ""}
              onChange={(e) =>
                setFormData({ ...formData, father_fname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Middle Name</Label>
            <Input
              value={formData.father_mname || ""}
              onChange={(e) =>
                setFormData({ ...formData, father_mname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              value={formData.father_lname || ""}
              onChange={(e) =>
                setFormData({ ...formData, father_lname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Extension Name</Label>
            <Input
              value={formData.father_exname || ""}
              onChange={(e) =>
                setFormData({ ...formData, father_exname: e.target.value })
              }
              disabled={loading}
            />
          </div>
        </>
      );
    } else if (familyType === "mother") {
      return (
        <>
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={formData.mother_fname || ""}
              onChange={(e) =>
                setFormData({ ...formData, mother_fname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Middle Name</Label>
            <Input
              value={formData.mother_mname || ""}
              onChange={(e) =>
                setFormData({ ...formData, mother_mname: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Maiden Name</Label>
            <Input
              value={formData.mother_maidenname || ""}
              onChange={(e) =>
                setFormData({ ...formData, mother_maidenname: e.target.value })
              }
              disabled={loading}
            />
          </div>
        </>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit' : 'Add'} {familyType?.charAt(0).toUpperCase() + familyType?.slice(1)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {renderFields()}
          </div>

          <DialogFooter className="gap-2">
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
              className="bg-[#1A3A1A] hover:bg-[#1A3A1A]/90"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
