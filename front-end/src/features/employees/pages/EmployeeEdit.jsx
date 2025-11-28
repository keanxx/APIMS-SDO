import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useNavigate, useParams } from "react-router-dom"
import FamilyTab from "../components/FamilyTab"
import EducationTab from "../components/EducationTab"
import PersonalTab from "../components/PersonalTab"
import EligibilityTab from "../components/EligibilityTab"

const EmployeeEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()




  return (
    <div className="space-y-4 bg-[#F7F9F7] p-6">
      <h1 className="md:text-2xl text-xl font-semibold text-[#1A3A1A]">
        CSC Form 212 - {id}
      </h1>
      <Button variant="outline" onClick={() => navigate(`/employees/${id}`)}>
        ← Back to List
      </Button>

      <Card>
        <CardContent>
          <Tabs defaultValue="personal">
            <TabsList className="mb-4 flex w-full overflow-x-auto ">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="other">Tranings</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
         <TabsContent value="personal">
          <PersonalTab employeeId = {id}/>

        </TabsContent>

         {/* Family Information Tab */}
         <TabsContent value="family">
  <FamilyTab employeeId={id} />
</TabsContent>

         {/* Education Information Tab */}
         <TabsContent value="education">
           <EducationTab />
         </TabsContent>


        <TabsContent value="eligibility">
            <EligibilityTab employeeId={id} />
          </TabsContent>
          </Tabs>
          
        </CardContent>

     
        
      </Card>
    </div>
  )
}

export default EmployeeEdit
