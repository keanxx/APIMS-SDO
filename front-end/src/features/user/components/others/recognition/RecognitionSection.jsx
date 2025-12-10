import React, { useState, useEffect } from 'react';
import { Trophy, Edit2, Trash2, Calendar } from 'lucide-react';
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
import { AddEditRecognition } from './AddEditRecognition';

export function RecognitionSection() {
  const { user } = useAuth();
  const [recognitions, setRecognitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingRecognition, setEditingRecognition] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchRecognitions = async () => {
    try {
      const response = await axiosInstance.get(
        `/recognition/${user.employee_id}`
      );
      
      console.log('Recognition Response:', response.data);
      setRecognitions(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch recognitions:', error);
      console.error('Error details:', error.response?.data);
      setRecognitions([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchRecognitions();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setEditingRecognition(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (recognition) => {
    setEditingRecognition(recognition);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/recognition/${deleteId}`);
        setRecognitions(recognitions.filter((r) => r.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error('Failed to delete recognition:', error);
        alert('Failed to delete recognition');
      }
    }
  };

  const handleSuccess = () => {
    fetchRecognitions();
  };

  if (loading) {
    return <div className="text-gray-600">Loading recognitions...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#1A3A1A]" />
          <h2 className="text-gray-900">Distinctions / Recognitions</h2>
        </div>
        <button
          onClick={handleAdd}
          className="text-sm text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {recognitions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recognitions added yet. Click "Add" to create one.
          </div>
        ) : (
          recognitions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
            >
              <h3 className="text-gray-900 font-medium mb-2">{item.award}</h3>
              
              <div className="space-y-1 mb-3">
                <p className="text-sm text-gray-600">
                  Awarded by: {item.award_body}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date_awarded}
                </p>
                <p className="text-xs text-gray-500">
                  Level: {item.award_level}
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

      <AddEditRecognition
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingRecognition={editingRecognition}
        onSuccess={handleSuccess}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Recognition</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this recognition? This action
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
