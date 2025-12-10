import React, { useState, useEffect } from 'react';
import { GraduationCap, Edit2, Trash2, Calendar } from 'lucide-react';
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
import { AddEditScholarship } from './AddEditScholarship';

export function ScholarshipSection() {
  const { user } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchScholarships = async () => {
    try {
      const response = await axiosInstance.get(
        `/schoolarship/${user.employee_id}`
      );

      console.log('Scholarship Response:', response.data);
      setScholarships(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch scholarships:', error);
      console.error('Error details:', error.response?.data);
      setScholarships([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchScholarships();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setEditingScholarship(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/schoolarship/${deleteId}`);
        setScholarships(scholarships.filter((s) => s.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error('Failed to delete scholarship:', error);
        alert('Failed to delete scholarship');
      }
    }
  };

  const handleSuccess = () => {
    fetchScholarships();
  };

  if (loading) {
    return <div className="text-gray-600">Loading scholarships...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#1A3A1A]" />
          <h2 className="text-gray-900">Scholarships / Academic Honors</h2>
        </div>
        <button
          onClick={handleAdd}
          className="text-sm text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {scholarships.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No scholarships added yet. Click "Add" to create one.
          </div>
        ) : (
          scholarships.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
            >
              <h3 className="text-gray-900 font-medium mb-2">{item.title}</h3>

              <div className="space-y-1 mb-3">
                <p className="text-sm text-gray-600">
                  Sponsor: {item.sponsor}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date_from} - {item.date_to}
                </p>
              </div>

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

      <AddEditScholarship
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingScholarship={editingScholarship}
        onSuccess={handleSuccess}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Scholarship</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this scholarship? This action
              cannot be undone.
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
