import React, { useState, useEffect } from "react";
import { Calendar, Edit2, Trash2, Eye, BookmarkCheck } from "lucide-react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddEditTraining } from "./AddEditTraining";

export function TrainingScreen() {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchTrainings = async () => {
    try {
      const response = await axiosInstance.get(
        `/trainings/${user.employee_id}`
      );

      setTrainings(Array.isArray(response.data.data) ? response.data.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch trainings:", error);
      setTrainings([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchTrainings();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setEditingTraining(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (training) => {
    setEditingTraining(training);
    setIsDialogOpen(true);
  };

  const handleViewFile = (signedUrl) => {
    if (signedUrl) {
      window.open(signedUrl, "_blank");
    } else {
      alert("No file attached");
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axiosInstance.delete(`/trainings/${deleteId}`);
        setTrainings(trainings.filter((t) => t.id !== deleteId));
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      } catch (error) {
        console.error("Failed to delete training:", error);
        alert("Failed to delete training record");
      }
    }
  };

  const handleSuccess = () => {
    fetchTrainings();
  };

  if (loading) {
    return (
      <div className="pb-8">
        <div className="px-4 py-4">
          <p className="text-gray-600">Loading trainings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-[#1A3A1A] " />
          <h2 className="text-gray-900">Trainings & Seminars</h2>
        </div>

        <Button
          variant="ghost"
          onClick={handleAdd}
          className="text-sm text-[#1A3A1A] bg-[#1A3A1A]/10 px-3 py-2 rounded-lg hover:bg-[#1A3A1A]/20 transition-colors"
        >
          + Add Training
        </Button>
      </div>

      <div className="space-y-3">
        {trainings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No training records found. Click "Add Training" to create one.
          </div>
        ) : (
          trainings.map((training) => (
            <Card key={training.id}>
              <CardContent className="p-4">
                {/* ✅ Title and View button on same row */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg text-gray-900">{training.title}</h3>

                  {/* ✅ View button beside title */}
                  {training.signed_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewFile(training.signed_url)}
                      className="gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  )}
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">
                      {training.hours} hrs
                    </span>{" "}
                    • {training.sponsor}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {training.from_date} - {training.to_date}
                  </div>

                  <p className="text-xs text-gray-500">
                    {training.participant_type} • {training.level}
                  </p>
                </div>

                <div className="flex gap-2 pt-3 border-t mt-3">
                  <button
                    onClick={() => handleEdit(training)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1A3A1A] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(training.id)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors ml-3"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <AddEditTraining
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editingTraining={editingTraining}
        onSuccess={handleSuccess}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-[340px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Training</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this training record? This action
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
