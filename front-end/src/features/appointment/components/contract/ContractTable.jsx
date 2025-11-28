import { useEffect, useMemo, useState } from "react";
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

const ContractTable = () => {
  const [contracts, setContracts] = useState([]);
  const [opened, setOpened] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [addOpened, setAddOpened] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    position_id: "",
    workstation: "",
    status: "",
    salary: "",
    start_date: "",
    end_date: "",
    file: null,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await axios.get(`${API_URL}/contracts/`);
        setContracts(res.data.data || []);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, []);

  const handleViewFile = (url) => {
    setFileUrl(url);
    setOpened(true);
  };

  const handleAddContract = async () => {
    try {
      const fd = new FormData();
      fd.append("employee_id", formData.employee_id);
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
        position_id: "",
        workstation: "",
        status: "",
        salary: "",
        start_date: "",
        end_date: "",
        file: null,
      });

      fetchContracts();
    } catch (err) {
      console.log("Error adding contract:", err);
    }
  };
  // --- MRT COLUMN DEFINITIONS ---
  const columns = useMemo(
    () => [
      {
        accessorKey: "position",
        header: "Position",
        enableColumnFilter: true,
        filterVariant: "text",
      },
      {
        accessorKey: "workstation",
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
        id: "file",
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
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: contracts,

    enableColumnFilters: true,
    enableSorting: true,
    enableGlobalFilter: true,
    initialState: {
      showGlobalFilter: true,
      pagination: { pageSize: 10 },
    },

    renderTopToolbar: ({ table }) => (
      <Flex p="md" justify="space-between">
        <Flex gap="xs">
          <MRT_GlobalFilterTextInput table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Flex>
        <Button color="green" onClick={() => setAddOpened(true)}>
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

      <Modal
              opened={addOpened}
              onClose={() => setAddOpened(false)}
              title="Add Contract"
              centered
            >
              <Flex direction="column" gap="sm">
                  <TextInput
                  label="Employee ID"
                  value={formData.employee_id}
                  onChange={(e) =>
                    setFormData({ ...formData, employee_id: e.target.value })
                  }
                />
                 <TextInput
                  label="Position"
                  value={formData.position_id}
                  onChange={(e) =>
                    setFormData({ ...formData, position_id: e.target.value })
                  }
                />
                <TextInput
                  label="Workstation"
                  value={formData.workstation}
                  onChange={(e) =>
                    setFormData({ ...formData, workstation: e.target.value })
                  }
                />
                <TextInput
                  label="Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                />
                <TextInput
                  label="Salary"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
               
                <TextInput
                  label="Start Date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData({ ...formData, start_date: e.target.value })
                  }
                />
                <TextInput
                  label="End Date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) =>
                    setFormData({ ...formData, end_date: e.target.value })
                  }
                />
                <input
            type="file"
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
          />
      
      
                <Button color="green" onClick={handleAddContract}>
                  Submit
                </Button>
              </Flex>
            </Modal>

      <MantineReactTable table={table} />
    </>
  );
};

export default ContractTable;
