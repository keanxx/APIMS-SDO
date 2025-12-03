import { use, useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton
} from "mantine-react-table";

import {
  Box,
  Button,
  Flex,
  Modal,
  Text,
    TextInput,
} from "@mantine/core";

import axios from "axios";
import { Label } from "@/components/ui/label";
import { SearchableDropdown } from "@/components/SearchableDropdown";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ContractTable = () => {
  const [contracts, setContracts] = useState([]);
  const [opened, setOpened] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [addOpened, setAddOpened] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [workstations, setWorkstations] = useState([]);
  const [selectedWorkstation, setSelectedWorkstation] = useState("");
  const [formData, setFormData] = useState({
    employee_id: "",
    position_id: "",
    workstation: "",
    status: "",
    salary: "",
    start_date: "",
    end_date: "",
    id: null,
    file: null,
  });
const [totalCount, setTotalCount] = useState(0);

const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 5, // default rows per page
});

const [editOpened, setEditOpened] = useState(false);
const [editingContract, setEditingContract] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

   const fetchContracts = async () => {
  try {
    const page = pagination.pageIndex + 1; // MRT is 0-based
    const limit = pagination.pageSize;

    const res = await axios.get(
      `${API_URL}/contracts/paginated?page=${page}&limit=${limit}`
    );

    setContracts(res.data.results || []);
    setTotalCount(res.data.total_records || res.data.results?.length || 0);
  } catch (error) {
    console.error("Error fetching contracts:", error);
  }
};


    const fetchPositions = async () => {
      try {
        const res = await axios.get(`${API_URL}/position/all`);
        const formatted = res.data.map((pos) => ({
          value: pos.id,
          label: pos.position,
        }));
        setPositions(formatted);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

const fetchWorkstations = async () => {
  try {
    const res = await axios.get(`${API_URL}/workstation/all`);
    console.log(res.data.data);
    const formatted = (res.data.data || []).map((ws) => ({
      value: ws.workstation_id,
      label: ws.workstation_name,
    }));

    setWorkstations(formatted);

  } catch (error) {
    console.error("Error fetching workstations:", error);
  }
};


  useEffect(() => {
 

    fetchContracts();
    fetchPositions();
    fetchWorkstations();
  }, []);

useEffect(() => {
  fetchContracts();
}, [pagination.pageIndex, pagination.pageSize]);

  const handleViewFile = (url) => {
    setFileUrl(url);
    setOpened(true);
  };

 

   const handleEmployeeIdBlur = async () => {
      if (!formData.employee_id) return;
  
      try {
        const res = await axios.get(
          `${API_URL}/employee/names?employer_id=${formData.employee_id}`
        );
  
        if (res.data && res.data.length > 0) {
          const e = res.data[0];
          const fullName = `${e.f_name} ${e.m_name || ""} ${e.l_name}`.trim();
          formData.id = e.id;
          setFormData((prev) => ({ ...prev, employee_name: fullName }));
        } else {
          setFormData((prev) => ({ ...prev, employee_name: "Not Found" }));
        }
      } catch (error) {
        console.error("Name lookup error:", error);
        setFormData((prev) => ({ ...prev, employee_name: "Error" }));
      }
    };

  const handleAddContract = async () => {
    try {
      const fd = new FormData();
      fd.append("employee_id", formData.id);
      fd.append("position_id", formData.position_id);
      fd.append("workstation", formData.workstation);
      fd.append("status", formData.status);
      fd.append("salary", formData.salary);
      fd.append("start_date", formData.start_date);
      fd.append("end_date", formData.end_date);
      fd.append("file", formData.file);

      await axios.post(`${API_URL}/contracts/upload_and_create`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAddOpened(false);

      setFormData({

        employee_id: "",
        position_id: selectedPosition,
        workstation: selectedWorkstation,
        status: "",
        salary: "",
        start_date: "",
        end_date: "",
        file: null,
      });

      fetchContracts();
      fetchPositions();
    } catch (err) {
      console.log("Error adding contract:", err);
    }
  };



  const handleEditClick = (contract) => {
  setEditingContract(contract);
  setFormData({
    employee_id: contract.employer_id || "",
    employee_name: `${contract.f_name} ${contract.m_name || ""} ${contract.l_name}`.trim(),
    position_id: contract.position_id || "",
    workstation: contract.workstation_id || "",
    status: contract.status || "",
    salary: contract.salary || "",
    start_date: contract.start_date || "",
    end_date: contract.end_date || "",
    id: contract.employee_id || "",
    file_path: contract.file_path || "",
    file: null,
  });
  setSelectedPosition(contract.position_id || "");
  setSelectedWorkstation(contract.workstation_id || "");
  setEditOpened(true);
};

const handleEditContract = async () => {
  try {
    const fd = new FormData();
    fd.append("contract_id", editingContract.id);
    fd.append("employee_id", formData.id);
    fd.append("position_id", formData.position_id);
    fd.append("workstation", formData.workstation);
    fd.append("status", formData.status);
    fd.append("salary", formData.salary);
    fd.append("start_date", formData.start_date);
    fd.append("end_date", formData.end_date);
    fd.append("file_path", formData.file_path);
   if (formData.file) {
      fd.append("file", formData.file);
    } else {
 
    }

    await axios.put(`${API_URL}/contracts/${editingContract.id}`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });


    setEditOpened(false);
    setEditingContract(null);
    fetchContracts();
  } catch (err) {
    console.log("Error editing contract:", err);
  }
};

  const handleDelete = async (contract_id) => {
      if (!confirm("Are you sure you want to delete this contract?")) return;
    
      try {
        await axios.delete(`${API_URL}/contracts/${contract_id}`);
        fetchContracts();
      } catch (error) {
        console.error("Delete error:", error);
      }
    };

  // --- MRT COLUMN DEFINITIONS ---
  const columns = useMemo(
    () => [
{
      accessorFn: (row) => `${row.f_name} ${row.m_name || ""} ${row.l_name}`, 
      id: "full_name", 
      header: "Full Name",
      enableColumnFilter: true,
      filterVariant: "text",
    },
      {
        accessorKey: "position_name",
        header: "Position",
        enableColumnFilter: true,
        filterVariant: "text",
      },
      {
        accessorKey: "workstation_name",
        header: "Workstation",
        enableColumnFilter: true,
        filterVariant: "text",
      },
      {
        accessorKey: "status",
        header: "Status",
        filterVariant: "select",
      },
      {
        accessorKey: "salary",
        header: "Salary",
        filterVariant: "range",
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
        filterVariant: "date-range",
      },
      {
        accessorKey: "end_date",
        header: "End Date",
        filterVariant: "date-range",
      },
      {
        id: "signed_url",
        header: "File",
        Cell: ({ row }) => (
          <Button
            size="xs"
            variant="light"
            disabled={!row.original.signed_url}
            onClick={() => handleViewFile(row.original.signed_url)}
            
          >
            View
          </Button>
        ),
      },
        {
      id: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <Flex gap="xs">
          <Button
            size="xs"
            variant="light"
            color="blue"
            onClick={() => handleEditClick(row.original)}
          >
            Edit
          </Button>
               <Button
            size="xs"
            variant="light"
            color="red"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        </Flex>
      ),
    },
    ],
    []
  );

const table = useMantineReactTable({
  columns,
  data: contracts,

  // server-side mode
  manualPagination: true,
  rowCount: totalCount,

  enablePagination: true,

  onPaginationChange: setPagination,
  state: { pagination },

  initialState: {
    pagination: { pageSize: 4, pageIndex: 0 },
    showGlobalFilter: true,
  },

  renderTopToolbar: ({ table }) => (
    <Flex p="md" justify="space-between">
      <Flex gap="xs">
        <MRT_GlobalFilterTextInput table={table} />
        <MRT_ToggleFiltersButton table={table} />
      </Flex>
      <Button
        color="green"
        onClick={() => {
          setAddOpened(true);
          fetchPositions();
          fetchWorkstations();
        }}
      >
        + Add Contract
      </Button>
    </Flex>
  ),
});

  return (
    <>
      {/* FILE PREVIEW MODAL */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="90%"
        centered
        title="Contract File Viewer"
      >
        {fileUrl ? (
          <iframe
            src={fileUrl}
            style={{ width: "100%", height: "600px", border: "none" }}
          />
        ) : (
          <Text>No file available.</Text>
        )}
      </Modal>

    <Dialog open={addOpened} onOpenChange={setAddOpened}>
  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Add Contract</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">

      {/* EMPLOYEE ID */}
      <div>
        <Label>Employee ID</Label>
        <Input
          className="border rounded p-2 w-full"
          value={formData.employee_id}
          onChange={(e) =>
            setFormData({ ...formData, employee_id: e.target.value })
          }
          onBlur={handleEmployeeIdBlur}
        />
      </div>

      {/* EMPLOYEE NAME */}
      <div>
        <Label>Employee Name</Label>
        <Input
          className="border rounded p-2 w-full bg-gray-100"
          value={formData.employee_name}
          disabled
        />
      </div>

      {/* POSITION DROPDOWN */}
      <div>
        <Label>Position</Label>
        <SearchableDropdown
          items={positions}
          value={selectedPosition}
          onChange={(value) => {
            setSelectedPosition(value);
            setFormData((prev) => ({ ...prev, position_id: value }));
          }}
        />
      </div>

    

      {/* WORKSTATION */}
      <div>
        <Label>Workstation</Label>
        <SearchableDropdown
          items={workstations}
          value={selectedWorkstation}
          onChange={(value) => {
            setSelectedWorkstation(value);
            setFormData((prev) => ({ ...prev, workstation: value }));
          }}
        />
      </div>

      {/* STATUS */}
      <div>
        <Label>Status</Label>
        <Input
          className="border rounded p-2 w-full"
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
        />
      </div>

      {/* SALARY */}
      <div>
        <Label>Salary</Label>
        <Input
          className="border rounded p-2 w-full"
          value={formData.salary}
          onChange={(e) =>
            setFormData({ ...formData, salary: e.target.value })
          }
        />
      </div>

      {/* DATES */}
      <div>
        <Label>Start Date</Label>
        <Input
          type="date"
          className="border rounded p-2 w-full"
          value={formData.start_date}
          onChange={(e) =>
            setFormData({ ...formData, start_date: e.target.value })
          }
        />
      </div>

      <div>
        <Label>End Date</Label>
        <Input
          type="date"
          className="border rounded p-2 w-full"
          value={formData.end_date}
          onChange={(e) =>
            setFormData({ ...formData, end_date: e.target.value })
          }
        />
      </div>

      {/* FILE UPLOAD */}
      <div>
        <Label>File Upload</Label>
        <Input
          type="file"
          className="w-full"
          onChange={(e) =>
            setFormData({ ...formData, file: e.target.files[0] })
          }
        />
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={() => setAddOpened(false)}>
        Cancel
      </Button>

      <Button onClick={handleAddContract}>
        Submit
      </Button>
    </DialogFooter>

  </DialogContent>
</Dialog>

 {/* EDIT CONTRACT DIALOG */}
    <Dialog open={editOpened} onOpenChange={setEditOpened}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Contract</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Same form fields as Add, but pre-filled */}
          {/* EMPLOYEE ID */}
          <div>
            <Label>Employee ID</Label>
            <Input
              className="border rounded p-2 w-full"
              value={formData.employee_id}
              disabled
            />
          </div>
          {/* EMPLOYEE NAME */}
          <div>
            <Label>Employee Name</Label>
            <Input
              className="border rounded p-2 w-full bg-gray-100"
              value={formData.employee_name}
              disabled
            />
          </div>
          {/* POSITION DROPDOWN */}
          <div>
            <Label>Position</Label>
            <SearchableDropdown
              items={positions}
              value={selectedPosition}
              onChange={(value) => {
                setSelectedPosition(value);
                setFormData((prev) => ({ ...prev, position_id: value }));
              }}
            />
          </div>
          {/* WORKSTATION */}
          <div>
            <Label>Workstation</Label>
            <SearchableDropdown
              items={workstations}
              value={selectedWorkstation}
              onChange={(value) => {
                setSelectedWorkstation(value);
                setFormData((prev) => ({ ...prev, workstation: value }));
              }}
            />
          </div>
          {/* STATUS */}
          <div>
            <Label>Status</Label>
            <Input
              className="border rounded p-2 w-full"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            />
          </div>
          {/* SALARY */}
          <div>
            <Label>Salary</Label>
            <Input
              className="border rounded p-2 w-full"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
            />
          </div>
          {/* DATES */}
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              className="border rounded p-2 w-full"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              className="border rounded p-2 w-full"
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
            />
          </div>
          {/* FILE UPLOAD */}
          <div>
            <Label>File Upload</Label>
            <Input
              type="file"
              className="w-full"
              onChange={(e) =>
                setFormData({ ...formData, file: e.target.files[0] })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditContract}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


      <MantineReactTable table={table} />
    </>
  );
};

export default ContractTable;
