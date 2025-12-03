import { useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from "mantine-react-table";

import { Modal, Flex, Button, Text } from "@mantine/core";
import axios from "axios";

import AddAppointmentModal from "./AddAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileOpened, setFileOpened] = useState(false);
  const [addOpened, setAddOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_URL}/appointment/paginated`);
      const dataWithFullName = res.data.results.map((a) => ({
        ...a,
        name: `${a.f_name} ${a.m_name || ""} ${a.l_name}`.trim(),
      }));
      setAppointments(dataWithFullName || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async () => {
    if (!appointmentToDelete) return;
    try {
      await axios.delete(`${API_URL}/appointment/${appointmentToDelete.id}`);
      setDeleteOpened(false);
      setAppointmentToDelete(null);
      fetchAppointments();
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "employer_id", header: "ID" },
      { accessorKey: "name", header: "Full Name" },
      { accessorKey: "workstation_name", header: "Workstation" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "item_id", header: "Item No" },
      { accessorKey: "nature", header: "Nature" },
      { accessorKey: "start_date", header: "Start Date" },
      { accessorKey: "end_date", header: "End Date" },
      {
        id: "file",
        header: "File",
        Cell: ({ row }) => (
          <Button
            size="xs"
            variant="light"
            disabled={!row.original.signed_url}
            onClick={() => {
              setFileUrl(row.original.signed_url);
              setFileOpened(true);
            }}
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
              onClick={() => {
                setSelectedAppointment(row.original);
                setEditOpened(true);
              }}
            >
              Edit
            </Button>
            <Button
              size="xs"
              variant="light"
              color="red"
              onClick={() => {
                setAppointmentToDelete(row.original);
                setDeleteOpened(true);
              }}
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
      {/* FILE VIEWER */}
      <Modal
        opened={fileOpened}
        onClose={() => setFileOpened(false)}
        size="90%"
        title="Appointment File"
        centered
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

      {/* ADD APPOINTMENT MODAL */}
      <AddAppointmentModal
        opened={addOpened}
        onClose={() => setAddOpened(false)}
        onAdded={fetchAppointments}
      />

      {/* EDIT APPOINTMENT MODAL */}
      <EditAppointmentModal
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        appointment={selectedAppointment}
        onUpdated={fetchAppointments}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        opened={deleteOpened}
        onClose={() => setDeleteOpened(false)}
        title="Confirm Delete"
        centered
      >
        <Text>Are you sure you want to delete this appointment?</Text>
        <Flex mt="md" gap="sm" justify="flex-end">
          <Button variant="light" onClick={() => setDeleteOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteAppointment}>
            Delete
          </Button>
        </Flex>
      </Modal>

      <MantineReactTable table={table} />
    </>
  );
};

export default AppointmentTable;
