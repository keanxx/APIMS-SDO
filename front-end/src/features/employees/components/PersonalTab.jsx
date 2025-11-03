import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const PersonalTab = () => {
  const PersonalSections = [
    {
      title: "Name Information",
      fields: [
        { key: "first_name", label: "First Name", placeholder: "Enter first name" },
        { key: "last_name", label: "Last Name", placeholder: "Enter last name" },
        { key: "middle_name", label: "Middle Name", placeholder: "Enter Middlename" },
        { key: "name_extension", label: "Name Extension", placeholder: "Jr., Sr." },
      ],
    },
    {
      title: "Birth Details",
      type: "repeatable",
      fields: [
        { key: "date_of_birth", label: "Date of Birth", placeholder: "MM/DD/YYYY", type: "date" },
        { key: "place_of_birth", label: "Place of Birth", placeholder: "Enter place of birth" },
        { key: "sex", label: "Sex", placeholder: "Select sex", type: "select", options: ["Male", "Female", "Other"] },
        { key: "citizenship", label: "Citizenship", placeholder: "Select citizenship", type: "select", options: ["Filipino", "Dual Citizen", "Other"] },
      ],
    },
    {
      title: "Government Identification",
      type: "repeatable",
      fields: [
        { key: "gsis_id", label: "GSIS ID", placeholder: "Enter GSIS ID" },
        { key: "pagibig_id", label: "Pag-IBIG ID", placeholder: "Enter Pag-IBIG ID" },
        { key: "philhealth_id", label: "PhilHealth ID", placeholder: "Enter PhilHealth ID" },
        { key: "sss_id", label: "SSS ID", placeholder: "Enter SSS ID" },
        { key: "tin", label: "TIN", placeholder: "Enter TIN" },
        { key: "agency_employee_no", label: "Agency Employee No.", placeholder: "Enter Agency Employee No." },
      ],
    },
    {
      title: "Contact Information",
      fields: [
        { key: "mobile_num", label: "Mobile Number", placeholder: "Enter mobile number" },
        { key: "email", label: "Email Address", placeholder: "Enter email address" },
        { key: "address", label: "Address", placeholder: "Enter address" },
      ],
    },
  ];

  return (
    <div>
     
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {PersonalSections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardContent>
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-[#1A3A1A] border-b pb-1">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="space-y-2">
                          <Label>{field.label}</Label>
                          <Input
                            placeholder={field.placeholder}
                            type={field.type || "text"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                {section.title === "Children Information" && (
                  <CardFooter>
                    <Button>Add Child</Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
    </div>
  );
};

export default PersonalTab;