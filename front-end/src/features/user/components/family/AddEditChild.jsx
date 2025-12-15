import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/features/auth/components/AuthContext'
import axiosInstance from '@/api/axiosInstance'

const AddEditChild = ({ open, onOpenChange, childData, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    b_day: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEdit = !!childData;

  // Populate form when dialog opens
  useEffect(() => {
    if (open) {
      if (childData) {
        setFormData({
          full_name: childData.full_name || '',
          b_day: childData.b_day || '',
        });
      } else {
        setFormData({ full_name: '', b_day: '' });
      }
      setError(null);
    }
  }, [open, childData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Include employee_id in the request body
      const requestData = {
        ...formData,
        employee_id: user.employee_id
      };

      if (isEdit) {
        // Update existing child
        await axiosInstance.put(`/family/children/update/${childData.id}`, requestData);
      } else {
        // Add new child
        await axiosInstance.post('/family/children/add', requestData);
      }

      // Reset form and close dialog
      setFormData({ full_name: '', b_day: '' });
      onOpenChange(false);
      
      // Trigger refresh in parent component
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to save child:', err);
      setError(err.response?.data?.message || 'Failed to save child data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Child' : 'Add Child'}</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? 'Update the child information below.' 
              : 'Add a new child to your family records.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="b_day">Birthday</Label>
              <Input
                id="b_day"
                name="b_day"
                type="date"
                value={formData.b_day}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEdit ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditChild;
