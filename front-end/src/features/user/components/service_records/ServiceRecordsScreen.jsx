import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { useAuth } from "@/features/auth/components/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { Card } from "@/components/ui/card";

export function ServiceRecordsScreen() {
  const { user } = useAuth();
  const [serviceRecords, setServiceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServiceRecords = async () => {
    try {
      const response = await axiosInstance.get(
        `/service_records/employee/${user.employee_id}`
      );

      console.log("Service Records Response:", response.data);

      setServiceRecords(
        Array.isArray(response.data) ? response.data : []
      );
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch service records:", error);
      setServiceRecords([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_id) {
      fetchServiceRecords();
    }
  }, [user?.employee_id]);

  if (loading) {
    return <div className="text-gray-600">Loading service records...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Briefcase className="w-5 h-5 text-[#1A3A1A]" />
        <h2 className="text-gray-900">Service Records</h2>
      </div>

      <div className="space-y-3">
        {serviceRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No service records found.
          </div>
        ) : (
          serviceRecords.map((record) => (
            <Card key={record.service_id}>
              <div className="mb-3">
                <h3 className="text-gray-900 font-medium">{record.position_name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 bg-[#1A3A1A]/10 text-[#1A3A1A] rounded">
                    {record.employment_status}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                    ₱{parseFloat(record.salary).toLocaleString()}
                  </span>
                  {record.position_classification && (
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                      {record.position_classification}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-20 text-gray-600 font-medium">Period:</span>
                  <span className="text-gray-900">
                    {record.date_from} – {record.date_to}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="w-20 text-gray-600 font-medium">Office:</span>
                  <span className="text-gray-900">{record.workstation_name}</span>
                </div>
                {record.branch && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-20 text-gray-600 font-medium">Branch:</span>
                    <span className="text-gray-900">{record.branch}</span>
                  </div>
                )}
                {record.leave_pay && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-20 text-gray-600 font-medium">Leave:</span>
                    <span className="text-gray-900">{record.leave_pay}</span>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
