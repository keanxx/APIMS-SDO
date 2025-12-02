import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EducationTab = ({ employeeId }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [educationData, setEducationData] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    school_name: '',
    combined: '', 
    basic_education: '',
    degree: '',
    course: '',
    graduated_year: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchEducationData = async () => {
    try {
      const response = await axios.get(`${API_URL}/education/all/${employeeId}`);
      setEducationData(response.data || []);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      school_name: '',
      combined: '',
      basic_education: '',
      degree: '',
      course: '',
      graduated_year: '',
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEdit = (school) => {
    setFormData({
      ...school,
      combined: `${school.basic_education} - ${school.degree} - ${school.course}`,
    });
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      // Split combined into separate fields
      let [basic_education, degree, course] = formData.combined.split(' - ');
      basic_education = basic_education?.trim() || '';
      degree = degree?.trim() || '';
      course = course?.trim() || '';

      const payload = {
        school_name: formData.school_name,
        basic_education,
        degree,
        course,
        graduated_year: Number(formData.graduated_year) || 0,
        employee_id: employeeId,
      };

      if (isEditing) {
        await axios.put(`${API_URL}/education/update/${formData.id}`, payload);
      } else {
        await axios.post(`${API_URL}/education/add`, payload);
      }

      fetchEducationData();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving education data:', error);
    }
  };
useEffect(() => {
    fetchEducationData();
  }, [employeeId]);

    const handleDelete = async (employeeId) => {
      if (!confirm("Are you sure you want to delete this involvement?")) return;
    
      try {
        await axios.delete(`${API_URL}/education/delete/${employeeId}`);
        fetchEducationData(); // refresh table after deletion
      } catch (error) {
        console.error("Delete error:", error);
      }
    };
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-[#1A3A1A] border-b pb-1">
        Education Information
      </h2>

      <Button className="btn btn-primary mb-4" onClick={handleAdd}>
        Add Education
      </Button>

      <div>
        {educationData.length > 0 ? (
          educationData.map((school) => (
            <Card className="mt-2" key={school.id}>
              <CardContent>
                <div>
                  <Label>School Name</Label>
                  <p>{school.school_name}</p>
                </div>
                <div>
                  <Label>Basic Education / Degree / Course</Label>
                  <p>{`${school.basic_education}`}</p>
                </div>
                <div>
                  <Label>Year Graduated</Label>
                  <p>{school.graduated_year}</p>
                </div>
                <Button className="btn btn-secondary mt-2" onClick={() => handleEdit(school)}>
                  Edit
                </Button>
                <Button className="btn btn-danger mt-2 ml-2" onClick={() => handleDelete(school.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No education data available.</div>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Education' : 'Add Education'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>School Name</Label>
              <Input
                name="school_name"
                value={formData.school_name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Basic Education / Degree / Course</Label>
              <Input
                name="combined"
                value={formData.combined}
                onChange={handleInputChange}
                placeholder="e.g. High School - Bachelor - Computer Science"
              />
            </div>

            <div>
              <Label>Year Graduated</Label>
              <Input
                name="graduated_year"
                value={formData.graduated_year}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationTab;
