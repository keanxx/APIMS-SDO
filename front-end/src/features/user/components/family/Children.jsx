import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Edit2, Trash2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/features/auth/components/AuthContext'
import axiosInstance from '@/api/axiosInstance'
import AddEditChild from './AddEditChild'

const Row = ({ label, value }) => (
  <div className="flex gap-2 text-sm">
    <span className="w-24 font-medium text-muted-foreground">{label}:</span>
    <span className="text-foreground">{value}</span>
  </div>
);

const Children = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchChildren = async () => {
    if (!user?.employee_id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get(
        `/family/children/by-employee/${user.employee_id}`
      );
      
      setChildren(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch children:', err);
      setError('Failed to load children data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchChildren();
    }
  }, [user?.employee_id]);

  const handleAdd = () => {
    setSelectedChild(null);
    setDialogOpen(true);
  };

  const handleEdit = (child) => {
    setSelectedChild(child);
    setDialogOpen(true);
  };

  const handleDeleteClick = (child) => {
    setChildToDelete(child);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!childToDelete) return;

    try {
      setDeleting(true);
      await axiosInstance.delete(`/family/children/delete/${childToDelete.id}`);
      
      // Refresh the list after successful deletion
      await fetchChildren();
      
      setDeleteDialogOpen(false);
      setChildToDelete(null);
    } catch (err) {
      console.error('Failed to delete child:', err);
      // Optionally show error message to user
      alert('Failed to delete child. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleSuccess = () => {
    fetchChildren();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Skeleton className="h-9 w-32" />
        </div>
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAdd}>+ Add Child</Button>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
        <AddEditChild
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          childData={selectedChild}
          onSuccess={handleSuccess}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={handleAdd}>+ Add Child</Button>
      </div>

      {children.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">
              No children records found.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {children.map((child) => (
            <Card key={child.id}>
              <CardContent className="p-4 space-y-3">
                <Row label="Name" value={child.full_name} />
                <Separator />
                <Row label="Birthday" value={child.b_day} />

                <Separator className="mt-3" />

                <div className="flex gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleEdit(child)}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteClick(child)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddEditChild
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        childData={selectedChild}
        onSuccess={handleSuccess}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {childToDelete?.full_name}'s record. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Children;
