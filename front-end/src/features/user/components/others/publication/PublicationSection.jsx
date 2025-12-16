import React, { useState, useEffect } from 'react';
import { BookOpen, Edit2, Trash2, Calendar } from 'lucide-react';
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
import { AddEditPublication } from './AddEditPublication';
import { ProfileSectionSkeleton } from '@/features/user/pages/Profile';

export function PublicationSection() {
  const { user } = useAuth();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchPublications = async () => {
    try {
      const response = await axiosInstance.get(
        `/publication/${user.employee_id}`
      );

      console.log('Publication Response:', response.data);
      setPublications(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch publications:', error);
      console.error('Error details:', error.response?.data);
      setPublications([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchPublications();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setEditingPublication(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (publication) => {
    setEditingPublication(publication);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/publication/delete/${deleteId}`);
        setPublications(publications.filter((p) => p.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error('Failed to delete publication:', error);
        alert('Failed to delete publication');
      }
    }
  };

  const handleSuccess = () => {
    fetchPublications();
  };

  if (loading) {
    return <div className="text-gray-600"><ProfileSectionSkeleton /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#1A3A1A]" />
          <h2 className="text-gray-900">Publications</h2>
        </div>
        <button
          onClick={handleAdd}
          className="text-sm text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {publications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No publications added yet. Click "Add" to create one.
          </div>
        ) : (
          publications.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
            >
              <h3 className="text-gray-900 font-medium mb-2">{item.title}</h3>

              <div className="mb-3">
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Published: {item.date}
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

      <AddEditPublication
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingPublication={editingPublication}
        onSuccess={handleSuccess}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Publication</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this publication? This action
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
