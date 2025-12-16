import React, { useEffect, useState } from "react";
import { Edit2, Plus } from "lucide-react";

import { useAuth } from '@/features/auth/components/AuthContext';
import axiosInstance from '@/api/axiosInstance'; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddEditFamily } from "./AddEditFamily";
import Children from "./Children";
import { ProfileSectionSkeleton } from "../../pages/Profile";

export default function FamilyScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("spouse");
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
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

  // ✅ Extract fetch function so it can be reused
  const fetchFamilyData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/family/${user.employee_id}`
      );
      
      console.log('Family API Response:', response.data);
      
      // Check if response has actual data
      if (response.data && Object.keys(response.data).length > 0) {
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
          id: response.data.id
        });
        setHasData(true);
      } else {
        setHasData(false);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch family data:', error);
      // If 404 or error, means no data yet
      if (error.response?.status === 404) {
        setHasData(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchFamilyData();
    }
  }, [user?.employee_id]);

  const handleEdit = (type) => {
    setEditingType(type);
    setIsDialogOpen(true);
  };

  // ✅ Call fetchFamilyData to refresh after save
  const handleSuccess = () => {
    fetchFamilyData();
  };

  if (loading) {
    return (
      <div className="pb-8">
        <ProfileSectionSkeleton />
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="px-4 mb-4 ">
        <Tabs value={activeTab} onValueChange={setActiveTab} >
          <TabsList className="inline-flex whitespace-nowrap scroll-smooth w-full min-w-max md:h-[50px] mb-4">
            <TabsTrigger value="spouse">Spouse</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
          </TabsList>

          {/* ================= SPOUSE ================= */}
          <TabsContent value="spouse" className="mt-4 space-y-4">
            {!hasData || !familyData.spouse_fname ? (
              <div className="flex justify-end">
                <Button size="sm" onClick={() => handleEdit("spouse")}>
                  + Add Spouse
                </Button>
              </div>
            ) : null}

            <Card>
              <CardContent className="p-4 space-y-3">
                {hasData && familyData.spouse_fname ? (
                  <>
                    <Row label="Name" value={`${familyData.spouse_fname} ${familyData.spouse_mname} ${familyData.spouse_lname} ${familyData.spouse_exname}`.trim()} />
                    <Separator />
                    <Row label="Occupation" value={familyData.occupation || "N/A"} />
                    <Separator />
                    <Row label="Employer" value={familyData.employer_business || "N/A"} />
                    <Separator />
                    <Row label="Address" value={familyData.business_add || "N/A"} />
                    <Separator />
                    <Row label="Contact" value={familyData.tel_no || "N/A"} />
                    <Separator className="mt-3" />

                    <Button onClick={() => handleEdit("spouse")} variant="ghost" size="sm" className="gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No spouse information found.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children" className="mt-4 space-y-3">
            <Children/>
          </TabsContent>

          <TabsContent value="parents" className="mt-4 space-y-4">
            {!hasData || (!familyData.mother_fname && !familyData.father_fname) ? (
              <div className="flex justify-end">
                <Button size="sm" onClick={() => handleEdit("mother")}>
                  + Add Parents
                </Button>
              </div>
            ) : null}

            {/* Mother */}
            <div>
              <h3 className="text-sm font-medium mb-2">Mother</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  {hasData && familyData.mother_fname ? (
                    <>
                      <Row label="First Name" value={familyData.mother_fname} />
                      <Separator />
                      <Row label="Middle Name" value={familyData.mother_mname || "N/A"} />
                      <Separator />
                      <Row label="Maiden Name" value={familyData.mother_maidenname || "N/A"} />
                      <Separator className="mt-3" />

                      <Button onClick={() => handleEdit("mother")} variant="ghost" size="sm" className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No mother information found.
                      </p>
                      {/* ✅ Show Add button if no mother data but family record exists */}
                      {hasData && !familyData.mother_fname && (
                        <>
                          <Separator className="mt-3" />
                          <Button onClick={() => handleEdit("mother")} variant="ghost" size="sm" className="gap-2">
                            <Edit2 className="w-4 h-4" />
                            Add
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Father */}
            <div>
              <h3 className="text-sm font-medium mb-2">Father</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  {hasData && familyData.father_fname ? (
                    <>
                      <Row label="First Name" value={familyData.father_fname} />
                      <Separator />
                      <Row label="Middle Name" value={familyData.father_mname || "N/A"} />
                      <Separator />
                      <Row label="Last Name" value={familyData.father_lname || "N/A"} />
                      <Separator />
                      <Row label="Extension Name" value={familyData.father_exname || "N/A"} />
                      <Separator className="mt-3" />

                      <Button onClick={() => handleEdit("father")} variant="ghost" size="sm" className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No father information found.
                      </p>
                      {/* ✅ Show Add button if no father data but family record exists */}
                      {hasData && !familyData.father_fname && (
                        <>
                          <Separator className="mt-3" />
                          <Button onClick={() => handleEdit("father")} variant="ghost" size="sm" className="gap-2">
                            <Edit2 className="w-4 h-4" />
                            Add
                          </Button>
                        </>
                      )}
                    </>
                  )}
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
        editingData={hasData ? {...familyData, id: familyData.id} : null}
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
