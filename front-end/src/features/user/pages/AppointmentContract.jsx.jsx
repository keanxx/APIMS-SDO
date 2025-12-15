import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import HeaderUser from "../components/dashboard/HeaderUser";
import { Briefcase } from "lucide-react";

const AppointmentContract = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch function to get both appointments and contracts
  const fetchData = async () => {
    if (!user?.employee_id) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch both appointments and contracts in parallel
      const [appointmentsRes, contractsRes] = await Promise.allSettled([
        axiosInstance.get(`/appointment/employee/${user.employee_id}`),
        axiosInstance.get(`/contracts/employee/${user.employee_id}`),
      ]);

      // Handle appointments response
      if (appointmentsRes.status === "fulfilled") {
        const appointmentsData = appointmentsRes.value.data;
        // Check if response has 'results' array
        const appointmentsArray = appointmentsData?.results || appointmentsData;
        setAppointments(
          Array.isArray(appointmentsArray) ? appointmentsArray : []
        );
        console.log("Appointments:", appointmentsArray);
      } else {
        console.error("Failed to fetch appointments:", appointmentsRes.reason);
        setAppointments([]);
      }

      // Handle contracts response
      if (contractsRes.status === "fulfilled") {
        const contractsData = contractsRes.value.data;
        // Check if response has 'results' array
        const contractsArray = contractsData?.results || contractsData;
        setContracts(Array.isArray(contractsArray) ? contractsArray : []);
        console.log("Contracts:", contractsArray);
      } else {
        console.error("Failed to fetch contracts:", contractsRes.reason);
        setContracts([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError(error.message);
      setAppointments([]);
      setContracts([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchData();
    }
  }, [user?.employee_id]);

  // Combine appointments and contracts into a single array for display
  const allRecords = [
    ...appointments.map((apt) => ({
      id: apt.id || `apt-${apt.employee_id}`,
      type: "appointment",
      workstation: apt.workstation_name || apt.workstation,
      status: apt.status,
      itemNumber: apt.item_id,
      nature: apt.nature,
      startDate: apt.start_date,
      endDate: apt.end_date,
      file: apt.signed_url || apt.file,
    })),
    ...contracts.map((contract) => ({
      id: contract.id || `contract-${contract.employee_id}`,
      type: "contractual",
      workstation: contract.workstation_name || contract.workstation,
      status: contract.status,
      position: contract.position_name,
      itemNumber: contract.position_name,
      nature: contract.classification || "Contract",
      startDate: contract.start_date,
      endDate: contract.end_date,
      salary: contract.salary,
      file: contract.signed_url || contract.file,
    })),
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "permanent":
        return "bg-green-100 text-green-800";
      case "contractual":
      case "bading":
        return "bg-blue-100 text-blue-800";
      case "temporary":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <HeaderUser />
      <div className="bg-[#F7F9F7] p-4 space-y-4 min-h-screen">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-900 px-1">Appointments & Contracts</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3A1A] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        ) : allRecords.length > 0 ? (
          <div className="space-y-3">
            {allRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#1A3A1A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Briefcase className="w-5 h-5 text-[#1A3A1A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 font-medium">
                        {record.type === "appointment"
                          ? "Appointment"
                          : "Contract"}
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {record.workstation}
                      </p>
                      {record.position && (
                        <p className="text-sm text-gray-700 font-medium mt-1">
                          {record.position}
                        </p>
                      )}
                      <span
                        className={`inline-block text-xs px-2.5 py-1 rounded-full mt-2 ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      {record.type === "appointment"
                        ? "Item Number:"
                        : "Position ID:"}
                    </span>
                    <span className="text-gray-900 break-all text-right ml-2">
                      {record.itemNumber}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Nature:</span>
                    <span className="text-gray-900">{record.nature}</span>
                  </div>
                  {record.salary && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Salary:</span>
                      <span className="text-gray-900">
                        ₱{parseFloat(record.salary).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Start Date:</span>
                    <span className="text-gray-900">
                      {formatDate(record.startDate)}
                    </span>
                  </div>
                  {record.endDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">End Date:</span>
                      <span className="text-gray-900">
                        {formatDate(record.endDate)}
                      </span>
                    </div>
                  )}
                  {record.file && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Document:</span>
                      <a
                        href={record.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1A3A1A] hover:underline"
                      >
                        View File
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No appointments or contracts found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AppointmentContract;
