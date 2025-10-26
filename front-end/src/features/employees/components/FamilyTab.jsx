import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const FamilyTab = () => {

    const familySections = [
  {
    title: "Spouse Information",
    fields: [
      { key: "spouse_first_name", label: "First Name", placeholder: "Enter first name" },
      { key: "spouse_last_name", label: "Last Name", placeholder: "Enter last name" },
      { key: "spouse_occupation", label: "Occupation", placeholder: "Enter occupation" },
      { key: "spouse_employer", label: "Employer/Business Name", placeholder: "Enter employer" },
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
                <div className='grid grid-cols-2 gap-4'>
                    <Card>
                        <CardContent>
                             <h2 className="text-lg font-semibold text-[#1A3A1A] border-b pb-1">Spouse Information</h2>
                             <div className="space-y-2">
                                <Label>Spouse First Name</Label>
                                <Input placeholder="Enter first name" />
                             </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                                <h2 className="text-lg font-semibold text-[#1A3A1A] border-b pb-1">Children Information</h2>
                                <div>
                                    <Label>Child 1 Name</Label>
                                    <Input placeholder="Enter child 1 name" />
                                </div>
                                <div>
                                    <Label>Child 2 Name</Label>
                                    <Input placeholder="Enter child 2 name" />
                                </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default FamilyTab