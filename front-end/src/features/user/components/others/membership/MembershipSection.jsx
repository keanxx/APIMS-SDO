import React, { useState, useEffect } from 'react';
import { Users, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AddEditMembership } from './AddEditMembership';

export function MembershipSection() {
  const { user } = useAuth();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchMemberships = async () => {
    try {
      const response = await axiosInstance.get(
        `/skills-membership/employee/${user.employee_id}/membership`
      );
      
      console.log('Membership Response:', response.data);
      
      // ✅ Adjust based on actual response structure
      const membershipsArray = response.data.memberships || response.data || [];
      setMemberships(Array.isArray(membershipsArray) ? membershipsArray : []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch memberships:', error);
      console.error('Error response:', error.response?.data);
      setMemberships([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchMemberships();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setEditingMembership(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (membership) => {
    setEditingMembership(membership);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/memberships/${deleteId}`);
        setMemberships(memberships.filter((m) => m.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error('Failed to delete membership:', error);
        alert('Failed to delete membership');
      }
    }
  };

  const handleSuccess = () => {
    fetchMemberships();
  };

  if (loading) {
    return <div className="text-gray-600">Loading memberships...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#1A3A1A]" />
          <h2 className="text-gray-900">Membership in Organizations</h2>
        </div>
        <button
          onClick={handleAdd}
          className="text-sm text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {memberships.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No memberships added yet. Click "Add" to create one.
          </div>
        ) : (
          memberships.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
            >
              <p className="text-gray-900 mb-3">{item.membership}</p>
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1A3A1A] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors ml-3"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <AddEditMembership
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingMembership={editingMembership}
        onSuccess={handleSuccess}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Membership</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this membership? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
