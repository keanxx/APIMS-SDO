import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const FamilyTab = () => {
  const familySections = [
    {
      title: "Spouse Information",
      fields: [
        { key: "spouse_first_name", label: "Spouse's Suname", placeholder: "Enter first name" },
        { key: "spouse_last_name", label: "Spouse's First Name", placeholder: "Enter last name" },
        { key: "spouse_last_name", label: "Spouse's Middle Name", placeholder: "Enter Middlename" },
        { key: "spouse_last_name", label: "Spouse's Name Extension", placeholder: "Jr., Sr." },
      ],
    },
    {
      title: "Occupation Information",
      type: "repeatable", // 👈 special flag
      fields: [
        { key: "child_name", label: "Occupation", placeholder: "Enter child name" },
        { key: "spouse_occupation", label: "Occupation", placeholder: "Enter occupation" },
        { key: "spouse_employer", label: "Employer/Business Name", placeholder: "Enter employer" },
        { key: "spouse_employer", label: "Telephone Number", placeholder: "043850346" },
      ],
    },
    {
      title: "Children Information",
      type: "repeatable", // 👈 special flag
      fields: [
        { key: "child_name", label: "Child Name", placeholder: "Enter child name" },
        { key: "child_birth_date", label: "Birth Date", placeholder: "MM/DD/YYYY", type: "date" },
      ],
    },
    {
      title: "Parent Information",
      fields: [
        { key: "father_name", label: "Father's Name", placeholder: "Enter father's name" },
        { key: "mother_name", label: "Mother's Maiden Name", placeholder: "Enter mother's name" },
      ],
    },
  ];

  return (
    <div>
      <Card>
        <CardContent>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {familySections.map((section, sectionIndex) => (
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
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyTab;