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

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [opened, setOpened] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
const [addOpened, setAddOpened] = useState(false);

  // FORM STATE
  const [formData, setFormData] = useState({
    workstation: "",
    status: "",
    item_no: "",
    nature: "",
    start_date: "",
    end_date: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API_URL}/appointment/`);
        setAppointments(res.data.data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleViewFile = (url) => {
    setFileUrl(url);
    setOpened(true);
  };

   const handleAddAppointment = async () => {
    try {
      await axios.post(`${API_URL}/appointment/upload_and_create`, formData);
      setAddOpened(false);
      setFormData({
        employee_id: "",
        workstation: "",
        status: "",
        item_no: "",
        nature: "",
        start_date: "",
        end_date: "",
        file: null,
      });
      fetchAppointments();
    } catch (err) {
      console.log("Error adding appointment:", err);
    }
  };
  
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
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
        accessorKey: "item_no",
        header: "Item No",
        filterVariant: "range",
      },
      {
        accessorKey: "nature",
        header: "Nature",
        filterVariant: "text",
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
    data: appointments,
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
          + Add Appointment
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
        title="Appointment File Viewer"
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
        title="Add Appointment"
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
            label="Item No"
            value={formData.item_no}
            onChange={(e) =>
              setFormData({ ...formData, item_no: e.target.value })
            }
          />
          <TextInput
            label="Nature"
            value={formData.nature}
            onChange={(e) =>
              setFormData({ ...formData, nature: e.target.value })
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
          <TextInput
            label="File"
            type="file"
            value={formData.file}
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.value })
            }
          />


          <Button color="green" onClick={handleAddAppointment}>
            Submit
          </Button>
        </Flex>
      </Modal>

      <MantineReactTable table={table} />
    </>
  );
};

export default AppointmentTable;
