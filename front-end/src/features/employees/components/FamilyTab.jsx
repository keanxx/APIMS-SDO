import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const FamilyTab = ({ employeeId }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [familyData, setFamilyData] = useState({});
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false); // true if record exists

  // -----------------------------------------
  // 1. FETCH FAMILY RECORD
  // -----------------------------------------
  useEffect(() => {
    if (!employeeId) return;

    const fetchFamilyData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/family/${employeeId}`);
        const data = res.data.data || res.data;

        if (!data) {
          setExists(false);
          setFamilyData({});
        } else {
          setExists(true);
          setFamilyData(data);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setExists(false);
          setFamilyData({});
        } else {
          console.error("Error fetching family data:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyData();
  }, [employeeId]);

  // -----------------------------------------
  // 2. HANDLE INPUT CHANGES
  // -----------------------------------------
  const handleChange = (key, value) => {
    setFamilyData((prev) => ({ ...prev, [key]: value }));
  };

  // -----------------------------------------
  // 3. CREATE FAMILY RECORD
  // -----------------------------------------
 

  // -----------------------------------------
  // 4. UPDATE FAMILY RECORD
  // -----------------------------------------
  const handleSave = async () => {
  try {
    // Build a complete object with defaults
    const payload = {
      employee_id: employeeId,
      spouse_fname: familyData.spouse_fname || "",
      spouse_mname: familyData.spouse_mname || "",
      spouse_lname: familyData.spouse_lname || "",
      spouse_exname: familyData.spouse_exname || "",
      occupation: familyData.occupation || "",
      employer_business: familyData.employer_business || "",
      business_add: familyData.business_add || "",
      tel_no: familyData.tel_no || "",
      father_lname: familyData.father_lname || "",
      father_fname: familyData.father_fname || "",
      father_mname: familyData.father_mname || "",
      father_exname: familyData.father_exname || "",
      mother_maidenname: familyData.mother_maidenname || "",
      mother_fname: familyData.mother_fname || "",
      mother_mname: familyData.mother_mname || "",
    };

    if (!exists) {
      // CREATE
      const res = await axios.post(`${API_URL}/family/add`, payload);
      const created = res.data.data || res.data;

      setFamilyData({ ...payload, family_id: created.family_id });
      setExists(true);

      alert("✅ Family record created!");
      return;
    }

    // UPDATE
    await axios.put(
      `${API_URL}/family/update/${familyData.id}`,
      payload
    );

    alert("✅ Family information updated!");
  } catch (err) {
    console.error("Error saving family data:", err);
    alert("❌ Save failed. Check console for details.");
  }
};



  if (loading) return <p>Loading family data...</p>;

 

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
         <Card>
          <CardContent>
            <h2 className="text-lg font-semibold border-b pb-1">Spouse Information</h2>
            <div className="space-y-3 mt-3">
              <div>
                <Label>First Name</Label>
                <Input value={familyData.spouse_fname || ""} onChange={(e) => handleChange("spouse_fname", e.target.value)} />
              </div>
              <div>
                <Label>Middle Name</Label>
                <Input value={familyData.spouse_mname || ""} onChange={(e) => handleChange("spouse_mname", e.target.value)} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={familyData.spouse_lname || ""} onChange={(e) => handleChange("spouse_lname", e.target.value)} />
              </div>
              <div>
                <Label>Extension</Label>
                <Input value={familyData.spouse_exname || ""} onChange={(e) => handleChange("spouse_exname", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupation Information */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold border-b pb-1">Occupation Information</h2>
            <div className="space-y-3 mt-3">
              <div>
                <Label>Occupation</Label>
                <Input value={familyData.occupation || ""} onChange={(e) => handleChange("occupation", e.target.value)} />
              </div>
              <div>
                <Label>Employer / Business</Label>
                <Input value={familyData.employer_business || ""} onChange={(e) => handleChange("employer_business", e.target.value)} />
              </div>
              <div>
                <Label>Business Address</Label>
                <Input value={familyData.business_add || ""} onChange={(e) => handleChange("business_add", e.target.value)} />
              </div>
              <div>
                <Label>Telephone No.</Label>
                <Input value={familyData.tel_no || ""} onChange={(e) => handleChange("tel_no", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent Information */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold border-b pb-1">Parent Information</h2>
            <div className="space-y-3 mt-3">
              <div>
                <Label>Father's Last Name</Label>
                <Input value={familyData.father_lname || ""} onChange={(e) => handleChange("father_lname", e.target.value)} />
              </div>
              <div>
                <Label>Father's First Name</Label>
                <Input value={familyData.father_fname || ""} onChange={(e) => handleChange("father_fname", e.target.value)} />
              </div>
              <div>
                <Label>Father's Middle Name</Label>
                <Input value={familyData.father_mname || ""} onChange={(e) => handleChange("father_mname", e.target.value)} />
              </div>
              <div>
                <Label>Father's Extension</Label>
                <Input value={familyData.father_exname || ""} onChange={(e) => handleChange("father_exname", e.target.value)} />
              </div>
              <div>
                <Label>Mother's Maiden Name</Label>
                <Input value={familyData.mother_maidenname || ""} onChange={(e) => handleChange("mother_maidenname", e.target.value)} />
              </div>
              <div>
                <Label>Mother's First Name</Label>
                <Input value={familyData.mother_fname || ""} onChange={(e) => handleChange("mother_fname", e.target.value)} />
              </div>
              <div>
                <Label>Mother's Middle Name</Label>
                <Input value={familyData.mother_mname || ""} onChange={(e) => handleChange("mother_mname", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children Information */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-[#1A3A1A] border-b pb-1">
              Children Information
            </h2>
            <p className="text-gray-500">No children added yet.</p>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">Add Child</Button>
              </DialogTrigger>
              <DialogContent>
                <div className="space-y-4">
                  <Label>Name</Label>
                  <Input placeholder="Enter child name" />
                  <Label>Birth Date</Label>
                  <Input placeholder="MM/DD/YYYY" type="date" />
                  <div>
                    <Button variant="secondary" className="mr-2">
                      Cancel
                    </Button>
                    <Button>Save Child</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button className="bg-blue-600 text-white" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default FamilyTab;