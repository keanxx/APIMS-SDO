import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const EmployeeOverview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`${API_URL}/employee/personal_info/${id}`);
        const data = await res.json();
        setEmployee(data)
      } catch (err) {
        setError("Failed to fetch employee data.")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id, API_URL])

    if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!employee) return <div className="p-6">No employee data found.</div>

  return (
    <div className="space-y-6 bg-[#F7F9F7] p-6">
      {/* Back Button */}
      <Button variant="outline" onClick={() => navigate("/employees")}>
        ← Back to List
      </Button>

      {/* Employee Header Card */}
      <Card>
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6">
          {/* Left Side - Avatar + Info */}
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-xl">
                {employee.f_name && employee.l_name
                  ? `${employee.f_name[0]}${employee.l_name[0]}`.toUpperCase()
                  : "N/A"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-2xl font-semibold text-[#1A3A1A]">
               {employee.f_name} {employee.m_name} {employee.l_name}
              </h2>
              <p className="text-muted-foreground text-base">
               {employee.position_name || "No position"}
              </p>
              <p className="text-sm text-gray-500">{employee.workstation_name || "—"}</p>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex flex-wrap gap-3">
           <Button onClick={() => navigate(`/employees/${id}/edit`)}>
              CSC Form 212
            </Button>
            <Button variant="outline">Leave Credits</Button>
            <Button variant="outline" onClick={() => navigate(`/employees/${id}/empservice_record`)}>Service Records</Button>
            <Button variant="outline">Performance Rating</Button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Section: Two Columns */}
      <div className="grid md:grid-cols-[2fr_1fr] gap-6">
        {/* Trainings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Trainings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title:
                  "International Training and Seminar on Non-Teaching Personnel Development",
                date: "June 12, 2023",
                branch: "Jakarta, Indonesia",
              },
              {
                title: "Regional HR Enhancement Workshop",
                date: "March 5, 2023",
                branch: "Quezon City",
              },
              {
                title: "Digital Transformation Seminar",
                date: "January 20, 2023",
                branch: "DepEd Central Office",
              },
            ].map((training, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm">
                  <p className="font-medium w-[70%]">{training.title}</p>
                  <p className="text-muted-foreground">{training.date}</p>
                </div>
                <p className="text-xs text-gray-500">{training.branch}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-2 md:gap-4">
               <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>{employee.email_address || "No email"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>{employee.mobile_no || "No phone number"}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>
                {employee.province
                  ? `${employee.province}, ${employee.municipality}`
                  : "No address on record"}
              </span>
            </div>
            </div>
           
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EmployeeOverview
