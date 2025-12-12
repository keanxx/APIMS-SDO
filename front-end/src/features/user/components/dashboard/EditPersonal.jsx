import React, { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditPersonal({
  isOpen,
  onClose,
  section,
  profileData,
  onSuccess,
  employeeUuid, // UUID from user context
}) {
  const [formData, setFormData] = useState(profileData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if profile data exists (has id)
  const isAddMode = !profileData?.id;

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      // Transform form data back to API format
      const apiData = {
        id: employeeUuid,
        employer_id: formData.id || employeeUuid,
        l_name: formData.lastName || "",
        f_name: formData.firstName || "",
        m_name: formData.middleName || "",
        ex_name: formData.suffix || "",
        b_day: formData.dateOfBirth || null,
        p_birth: formData.placeOfBirth || "",
        gender: formData.gender || "",
        civil_status: formData.civilStatus || "",
        height: parseFloat(formData.height) || 0,
        weight: parseFloat(formData.weight) || 0,
        blood_type: formData.bloodType || "",
        gsis_num: formData.gsis || "",
        pagibig_num: formData.pagibig || "",
        philhealth_num: formData.philhealth || "",
        sss_num: formData.sss || "",
        tin_num: formData.tin || "",
        citizenship: formData.citizenship || "",
        house_no: formData.houseNo || "",
        baranggay: formData.baranggay || "",
        street: formData.street || "",
        municipality: formData.municipality || "",
        subdivision: formData.subdivision || "",
        province: formData.province || "",
        tel_no: formData.telephoneNumber || "",
        mobile_no: formData.mobileNumber || "",
        email_address: formData.email || "",
      };

      let response;

      if (isAddMode) {
        // POST request for new profile
        response = await axiosInstance.post("/employee/add", apiData);
        console.log("Add response:", response.data);
      } else {
        // PUT request for existing profile using UUID
        response = await axiosInstance.put(
          `/employee/update/${employeeUuid}`,
          apiData
        );
        console.log("Update response:", response.data);
      }

      // Call success callback to refresh data
      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Failed to save profile:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[350px] max-h-[80vh] overflow-y-auto"
        style={{ borderRadius: "12px" }}
      >
        <DialogHeader>
          <DialogTitle>
            {isAddMode ? "Add" : "Edit"}{" "}
            {section === "personal"
              ? "Personal"
              : section === "contact"
              ? "Contact"
              : "Government IDs"}{" "}
            Information
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-4 py-4">
          {section === "personal" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    readOnly
                    id="firstName"
                    value={formData.firstName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    readOnly
                    id="middleName"
                    value={formData.middleName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, middleName: e.target.value })
                    }
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    readOnly
                    id="lastName"
                    value={formData.lastName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <Label htmlFor="suffix">Suffix</Label>
                  <Input
                    readOnly
                    id="suffix"
                    value={formData.suffix || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, suffix: e.target.value })
                    }
                    placeholder="Jr., Sr., III"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  readOnly
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="placeOfBirth">Place of Birth</Label>
                <Input
                  readOnly
                  id="placeOfBirth"
                  value={formData.placeOfBirth || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, placeOfBirth: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="gender">Sex</Label>
                <Input
                  readOnly
                  id="gender"
                  value={formData.gender || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  placeholder="Male/Female"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="civilStatus">Civil Status</Label>
                <Input
                  readOnly
                  id="civilStatus"
                  value={formData.civilStatus || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, civilStatus: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="citizenship">Citizenship</Label>
                <Input
                  readOnly
                  id="citizenship"
                  value={formData.citizenship || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, citizenship: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    readOnly
                    id="height"
                    type="number"
                    value={formData.height || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    readOnly
                    id="weight"
                    type="number"
                    value={formData.weight || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Input
                    readOnly
                    id="bloodType"
                    value={formData.bloodType || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodType: e.target.value })
                    }
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
            </>
          )}

          {section === "contact" && (
            <>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  value={formData.mobileNumber || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="telephoneNumber">Telephone Number</Label>
                <Input
                  id="telephoneNumber"
                  value={formData.telephoneNumber || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      telephoneNumber: e.target.value,
                    })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="houseNo">House No.</Label>
                <Input
                  id="houseNo"
                  value={formData.houseNo || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, houseNo: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={formData.street || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="subdivision">Subdivision</Label>
                <Input
                  id="subdivision"
                  value={formData.subdivision || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, subdivision: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="baranggay">Baranggay</Label>
                <Input
                  id="baranggay"
                  value={formData.baranggay || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, baranggay: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="municipality">Municipality</Label>
                <Input
                  id="municipality"
                  value={formData.municipality || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, municipality: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  value={formData.province || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </>
          )}

          {section === "government" && (
            <>
              <div>
                <Label htmlFor="gsis">GSIS Number</Label>
                <Input
                  id="gsis"
                  value={formData.gsis || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, gsis: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="pagibig">Pag-IBIG Number</Label>
                <Input
                  id="pagibig"
                  value={formData.pagibig || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, pagibig: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="philhealth">PhilHealth Number</Label>
                <Input
                  id="philhealth"
                  value={formData.philhealth || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, philhealth: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="sss">SSS Number</Label>
                <Input
                  id="sss"
                  value={formData.sss || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, sss: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div>
                <Label htmlFor="tin">TIN</Label>
                <Input
                  id="tin"
                  value={formData.tin || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, tin: e.target.value })
                  }
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            style={{ borderRadius: "8px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#1A3A1A] hover:bg-[#2d5a2d]"
            style={{ borderRadius: "8px" }}
          >
            {loading ? "Saving..." : isAddMode ? "Add" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
