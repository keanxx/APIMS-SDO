import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate, useParams } from "react-router-dom"
import FamilyTab from "../components/FamilyTab"

const EmployeeEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

//fields
  const personalInfoGroups = [
  {
    title: "Name Information",
    fields: [
      { label: "First Name", placeholder: "First Name", type: "text" },
      { label: "Last Name", placeholder: "Last Name", type: "text" },
      { label: "Middle Name", placeholder: "Middle Name", type: "text" },
      { label: "Extension", placeholder: "Extension", type: "text" },
    ],
  },
  {
    title: "Birth Details",
    fields: [
      { label: "Date of Birth", placeholder: "MM/DD/YYYY", type: "date" },
      { label: "Place of Birth", placeholder: "Place of Birth", type: "text" },
      {
        label: "Sex",
        type: "select",
        options: ["Male", "Female", "Other"],
      },
      {
        label: "Citizenship",
        type: "select",
        options: ["Filipino", "Dual Citizen", "Other"],
      },
    ],
  },
  {
    title: "Identification",
    fields: [
      { label: "GSIS ID", placeholder: "GSIS ID Number", type: "text" },
      { label: "Pag-IBIG ID", placeholder: "Pag-IBIG ID Number", type: "text" },
      { label: "PhilHealth ID", placeholder: "PhilHealth Number", type: "text" },
      { label: "SSS Number", placeholder: "SSS Number", type: "text" },
      { label: "TIN", placeholder: "Tax Identification Number", type: "text" },
      { label: "Agency Employee No.", placeholder: "Agency Employee Number", type: "text" },
    ],
  },
  {
    title: "Contact Information",
    fields: [
      { label: "Mobile Number", placeholder: "Mobile Number", type: "text" },
      { label: "Email Address", placeholder: "Email Address", type: "email" },
      { label: "Address", placeholder: "Address", type: "text" },
    ],
  },
];


  return (
    <div className="space-y-4 bg-[#F7F9F7] p-6">
      <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">
        CSC Form 212 - {id}
      </h1>

      <Card>
        <CardContent>
          <Tabs defaultValue="personal">
            <TabsList className="mb-4 flex w-full overflow-x-auto ">
              <TabsTrigger value="personal" className="flex-shrink-0">Personal Information</TabsTrigger>
              <TabsTrigger value="family" className="flex-shrink-0">Family Background</TabsTrigger>
              <TabsTrigger value="education" className="flex-shrink-0">Educational Background</TabsTrigger>
              <TabsTrigger value="work" className="flex-shrink-0">Work Experience</TabsTrigger>
              <TabsTrigger value="other" className="flex-shrink-0">Other Information</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
         <TabsContent value="personal">
  <Card>
    <CardContent className="space-y-8 py-4">
      {personalInfoGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1A3A1A] border-b pb-1">
            {group.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="space-y-2">
                <Label>{field.label}</Label>

                {field.type === "select" ? (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
</TabsContent>

 {/* Family Information Tab */}
         <TabsContent value="family">
           <FamilyTab />
         </TabsContent>


          </Tabs>
        </CardContent>

     
        <CardFooter>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(`/employees/${id}`)}
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EmployeeEdit
