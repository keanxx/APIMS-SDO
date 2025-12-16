// UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  Award,
  GraduationCap,
  Clock,
  Users,
  IdCard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    trainings: 0,
    recognition: 0,
    involvements: 0,
    familyMembers: 0,
  });

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    if (!user?.employee_id) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch profile, position, and stats in parallel
      const [profileRes, positionRes, trainingsRes, recognitionsRes, involvementsRes] = await Promise.all([
        axiosInstance.get(`/employee/personal_info/${user.employee_id}`),
        axiosInstance.get(`/employee/with-postion/${user.employee_id}`).catch(() => null),
        axiosInstance.get(`/trainings/${user.employee_id}`).catch(() => ({ data: { count: 0 } })),
        axiosInstance.get(`/recognition/${user.employee_id}`).catch(() => ({ data: [] })),
        axiosInstance.get(`/involvement/${user.employee_id}`).catch(() => ({ data: [] })),
      ]);

      console.log("Dashboard Data:", {
        profile: profileRes.data,
        position: positionRes?.data,
        trainings: trainingsRes.data,
        recognition: recognitionsRes.data,
        involvements: involvementsRes.data,
      });

      // Set stats - trainings has count, others are arrays
      setStats({
        trainings: trainingsRes.data?.count || 0,
        recognition: Array.isArray(recognitionsRes.data) ? recognitionsRes.data.length : 0,
        involvements: Array.isArray(involvementsRes.data) ? involvementsRes.data.length : 0,
        familyMembers: 0,
      });

      // Get position data from with-position endpoint
      const positionData = positionRes?.data || {};
      const positionName = positionData.position_name || "N/A";
      const workstationName = positionData.workstation_name || "N/A";
      const employmentStatus = positionData.status || "N/A";

      // Check if profile response has data
      if (!profileRes.data || Object.keys(profileRes.data).length === 0) {
        setProfile({
          id: null,
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: "",
          position: positionName,
          department: workstationName,
          employmentStatus: employmentStatus,
          email: "",
          mobileNumber: "",
          telephoneNumber: "",
          address: "",
          houseNo: "",
          street: "",
          baranggay: "",
          municipality: "",
          subdivision: "",
          province: "",
          dateOfBirth: "",
          placeOfBirth: "",
          civilStatus: "",
          citizenship: "",
          gender: "",
          height: "",
          weight: "",
          bloodType: "",
          gsis: "",
          pagibig: "",
          philhealth: "",
          sss: "",
          tin: "",
        });
      } else {
        const apiData = profileRes.data;
        const transformedData = {
          id: apiData.employer_id,
          firstName: apiData.f_name || "",
          middleName: apiData.m_name || "",
          lastName: apiData.l_name || "",
          suffix: apiData.ex_name || "",
          position: positionName,
          department: workstationName,
          employmentStatus: employmentStatus,
          email: apiData.email_address || "",
          mobileNumber: apiData.mobile_no || "",
          telephoneNumber: apiData.tel_no || "",
          address: [
            apiData.house_no,
            apiData.street,
            apiData.subdivision,
            apiData.baranggay,
            apiData.municipality,
            apiData.province,
          ]
            .filter(Boolean)
            .join(", "),
          houseNo: apiData.house_no || "",
          street: apiData.street || "",
          baranggay: apiData.baranggay || "",
          municipality: apiData.municipality || "",
          subdivision: apiData.subdivision || "",
          province: apiData.province || "",
          dateOfBirth: apiData.b_day || "",
          placeOfBirth: apiData.p_birth || "",
          civilStatus: apiData.civil_status || "",
          citizenship: apiData.citizenship || "",
          gender: apiData.gender || "",
          height: apiData.height || "",
          weight: apiData.weight || "",
          bloodType: apiData.blood_type || "",
          gsis: apiData.gsis_num || "",
          pagibig: apiData.pagibig_num || "",
          philhealth: apiData.philhealth_num || "",
          sss: apiData.sss_num || "",
          tin: apiData.tin_num || "",
        };
        setProfile(transformedData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);

      if (error.response?.status === 404) {
        setProfile({
          id: null,
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: "",
          position: "N/A",
          department: "N/A",
          employmentStatus: "N/A",
          email: "",
          mobileNumber: "",
          telephoneNumber: "",
          address: "",
          houseNo: "",
          street: "",
          baranggay: "",
          municipality: "",
          subdivision: "",
          province: "",
          dateOfBirth: "",
          placeOfBirth: "",
          civilStatus: "",
          citizenship: "",
          gender: "",
          height: "",
          weight: "",
          bloodType: "",
          gsis: "",
          pagibig: "",
          philhealth: "",
          sss: "",
          tin: "",
        });
        setStats({
          trainings: 0,
          recognition: 0,
          involvements: 0,
          familyMembers: 0,
        });
      } else {
        setError(error.message);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchDashboardData();
    }
  }, [user?.employee_id]);

  const getInitials = () => {
    if (!profile || !profile.firstName || !profile.lastName) return "NA";
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
  };

  const getFullName = () => {
    if (!profile || !profile.firstName) return "No Name";
    return `${profile.firstName} ${profile.middleName} ${profile.lastName}${
      profile.suffix ? " " + profile.suffix : ""
    }`;
  };

  const calculateAge = () => {
    if (!profile?.dateOfBirth) return "N/A";
    
    const birthDate = new Date(profile.dateOfBirth);
    
    if (isNaN(birthDate.getTime())) {
      return "N/A";
    }
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    
    return age;
  };

  const formatHeight = (height) => {
    if (!height) return "N/A";
    return typeof height === "number" ? `${height} cm` : height;
  };

  const formatWeight = (weight) => {
    if (!weight) return "N/A";
    return typeof weight === "number" ? `${weight} kg` : weight;
  };

  const quickStats = [
    {
      label: "Years of Service",
      value: "8",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      label: "Trainings",
      value: stats.trainings,
      icon: GraduationCap,
      color: "text-purple-600",
    },
    {
      label: "Recognition",
      value: stats.recognition,
      icon: Award,
      color: "text-amber-600",
    },
    {
      label: "Involvements",
      value: stats.involvements,
      icon: Users,
      color: "text-green-600",
    },
  ];

  // Skeleton Loading State
  if (loading) {
    return (
      <div className="px-4 pb-6">
        {/* Profile Header Skeleton */}
        <Card className="mb-4 overflow-hidden pt-0" style={{ borderRadius: "12px" }}>
          <Skeleton className="h-24 w-full rounded-none" />
          <CardContent className="relative pt-0 px-4 pb-4">
            <div className="flex items-start justify-between -mt-12 mb-4">
              <Skeleton className="w-24 h-24 rounded-full border-4 border-white" />
            </div>
            <div className="mb-3">
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-48" />
          </CardContent>
        </Card>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} style={{ borderRadius: "12px" }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-10" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information Skeleton */}
        <Card className="mb-4" style={{ borderRadius: "12px" }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index}>
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-4 w-4 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  {index < 3 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Skeleton */}
        <Card className="mb-4" style={{ borderRadius: "12px" }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-44" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index} className={index === 8 ? "col-span-2" : ""}>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Government IDs Skeleton */}
        <Card style={{ borderRadius: "12px" }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index}>
                  <div className="flex justify-between items-center py-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  {index < 5 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading profile: {error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="px-4 py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No profile data found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-6">
      {/* Profile Header Card */}
      <Card
        className="mb-4 overflow-hidden pt-0"
        style={{ borderRadius: "12px" }}
      >
        <div className="bg-gradient-to-r from-[#1A3A1A] to-[#2d5a2d] h-24" />
        <CardContent className="relative pt-0 px-4 pb-4">
          <div className="flex items-start justify-between -mt-12 mb-4">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src="" alt={getFullName()} />
              <AvatarFallback className="bg-[#1A3A1A] text-white text-xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mb-3">
            <h2 className="text-gray-900 mb-1">{getFullName()}</h2>
            <p className="text-gray-600 mb-2">{profile.position}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Building2 className="w-4 h-4" />
              <span>{profile.department}</span>
            </div>
            <Badge
              className={`${
                profile.employmentStatus === "Permanent"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : profile.employmentStatus === "Job Order"
                  ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
              }`}
            >
              {profile.employmentStatus}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IdCard className="w-4 h-4" />
            <span>Employee ID: {profile.id || user.employee_id}</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} style={{ borderRadius: "12px" }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Contact Information */}
      <Card className="mb-4" style={{ borderRadius: "12px" }}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-[#1A3A1A]" />
            <h3 className="text-gray-900">Contact Information</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                <p className="text-sm text-gray-900 break-all">
                  {profile.email || "N/A"}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Mobile Number</p>
                <p className="text-sm text-gray-900">
                  {profile.mobileNumber || "N/A"}
                </p>
              </div>
            </div>

            <Separator />

            {profile.telephoneNumber && (
              <>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">
                      Telephone Number
                    </p>
                    <p className="text-sm text-gray-900">
                      {profile.telephoneNumber}
                    </p>
                  </div>
                </div>
                <Separator />
              </>
            )}

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">
                  Residential Address
                </p>
                <p className="text-sm text-gray-900">
                  {profile.address || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="mb-4" style={{ borderRadius: "12px" }}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[#1A3A1A]" />
            <h3 className="text-gray-900">Personal Information</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Date of Birth</p>
              <p className="text-sm text-gray-900">
                {profile.dateOfBirth
                  ? new Date(profile.dateOfBirth).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Age</p>
              <p className="text-sm text-gray-900">
                {calculateAge() === "N/A" ? "N/A" : `${calculateAge()} years old`}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Gender</p>
              <p className="text-sm text-gray-900">{profile.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Civil Status</p>
              <p className="text-sm text-gray-900">
                {profile.civilStatus || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Citizenship</p>
              <p className="text-sm text-gray-900">
                {profile.citizenship || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Height</p>
              <p className="text-sm text-gray-900">
                {formatHeight(profile.height)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Weight</p>
              <p className="text-sm text-gray-900">
                {formatWeight(profile.weight)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Blood Type</p>
              <p className="text-sm text-gray-900">
                {profile.bloodType || "N/A"}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500 mb-0.5">Place of Birth</p>
              <p className="text-sm text-gray-900">
                {profile.placeOfBirth || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Government IDs */}
      <Card style={{ borderRadius: "12px" }}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#1A3A1A]" />
            <h3 className="text-gray-900">Government IDs</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">GSIS No.</span>
              <span className="text-sm text-gray-900">
                {profile.gsis || "N/A"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Pag-IBIG No.</span>
              <span className="text-sm text-gray-900">
                {profile.pagibig || "N/A"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">PhilHealth No.</span>
              <span className="text-sm text-gray-900">
                {profile.philhealth || "N/A"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">SSS No.</span>
              <span className="text-sm text-gray-900">
                {profile.sss || "N/A"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">TIN</span>
              <span className="text-sm text-gray-900">
                {profile.tin || "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
