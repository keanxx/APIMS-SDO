import React, { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance'; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddEditFamily } from "./AddEditFamily";
export function FamilyScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("spouse");
    const [loading, setLoading] = useState(true);
const [isDialogOpen, setIsDialogOpen] = useState(false);
 const [editingType, setEditingType] = useState(null);
const [familyData, setFamilyData] = useState({
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


  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const response = await axiosInstance.get(
          `/family/${user.employee_id}`
        );
        
        console.log('Family API Response:', response.data);
        
        setFamilyData({
         spouse_fname: response.data.spouse_fname || "",
        spouse_mname: response.data.spouse_mname || "",
        spouse_lname: response.data.spouse_lname || "",
        spouse_exname: response.data.spouse_exname || "",
        occupation: response.data.occupation || "",
        employer_business: response.data.employer_business || "",
        business_add: response.data.business_add || "",
        tel_no: response.data.tel_no || "",
        father_lname: response.data.father_lname || "",
        father_fname: response.data.father_fname || "",
        father_mname: response.data.father_mname || "",
        father_exname: response.data.father_exname || "",
        mother_maidenname: response.data.mother_maidenname || "",
        mother_fname: response.data.mother_fname || "",
        mother_mname: response.data.mother_mname || "",
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch family data:', error);
        setLoading(false);
      }
    };

    if (user?.employee_id) {
      fetchFamilyData();
    }
  }, [user?.employee_id]);

  
  const handleEdit = (type) => {
  setEditingType(type);
  setIsDialogOpen(true);
};


  const handleSuccess = (data) => {
    setFamilyData(data);
  };

  if (loading) {
    return (
      <div className="pb-8">
        <div className="px-4 py-4">
          <p className="text-gray-600">Loading family information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">

      <div className="px-4 mb-4 ">
        <Tabs value={activeTab} onValueChange={setActiveTab} >
          <TabsList  className="inline-flex whitespace-nowrap scroll-smooth w-full min-w-max md:h-[50px] mb-4">
            <TabsTrigger value="spouse">Spouse</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
          </TabsList>

          {/* ================= SPOUSE ================= */}
          <TabsContent value="spouse" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <Row label="Name" value={familyData.spouse_fname + " " + familyData.spouse_mname + " " + familyData.spouse_lname + " " + familyData.spouse_exname} />
                <Separator />
                <Row label="Occupation" value={familyData.occupation} />
                <Separator />
                <Row label="Employer" value={familyData.employer_business} />
                <Separator />
                <Row label="Address" value={familyData.business_add} />
                <Separator />
                <Row label="Contact" value={familyData.tel_no} />
                <Separator className="mt-3" />

                <Button  onClick={() => handleEdit("spouse")} variant="ghost" size="sm" className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= CHILDREN =================
          <TabsContent value="children" className="mt-4 space-y-3">
            <div className="flex justify-end">
              <Button size="sm">+ Add Child</Button>
            </div>

        {children.map((child, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-3">
                  <Row label="Name" value={child.name} />
                  <Separator />
                  <Row label="Birthday" value={child.birthday} />

                  <Separator className="mt-3" />

                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent> */}

          {/* ================= PARENTS ================= */}
          <TabsContent value="parents" className="mt-4 space-y-4">
            {/* Mother */}
            <div>
              <h3 className="text-sm font-medium mb-2">Mother</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <Row label="Name" value={familyData.mother_fname} />
                  <Separator />
                  <Row label="Occupation" value={familyData.mother_mname} />
                  <Separator />
                  <Row label="Address" value={familyData.mother_maidenname} />
                  <Separator className="mt-3" />

                  <Button onClick={() => handleEdit("mother")} variant="ghost" size="sm" className="gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Father */}
            <div>
              <h3 className="text-sm font-medium mb-2">Father</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <Row label="First Name" value={familyData.father_fname} />
                  <Separator />
                  <Row label="Middle Name" value={familyData.father_mname} />
                  <Separator />
                  <Row label="Last Name" value={familyData.father_lname} />
                   <Separator />
                  <Row label="Extension Name" value={familyData.father_exname} />
                  <Separator className="mt-3" />

                  <Button onClick={() => handleEdit("father")} variant="ghost" size="sm" className="gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
               <AddEditFamily
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        familyType={editingType}
        editingData={{...familyData, id: familyData.id}}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

/* ================= REUSABLE ROW COMPONENT ================= */
function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
