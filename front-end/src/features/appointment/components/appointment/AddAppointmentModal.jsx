// AddAppointmentModal.jsx
import { Modal, Flex, TextInput, Button, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AddAppointmentModal = ({ opened, onClose, onAdded }) => {
const [workstations, setWorkstations] = useState([]);
const [workstationTypes, setWorkstationTypes] = useState([]);
const [selectedType, setSelectedType] = useState("");
const [filteredWorkstations, setFilteredWorkstations] = useState([]);
const [items, setItems] = useState([]);
const [selectedItems, setSelectedItems] = useState([]);

  const [formData, setFormData] = useState({
    employee_id: "",
    workstation_id: "",
    status: "",
    item_no: "",
    nature: "",
    start_date: "",
    end_date: "",
    file: null,
  });


  useEffect(() => {
  const fetchWorkstations = async () => {
    try {
      const res = await axios.get(`${API_URL}/workstation/all`);
      const data = res.data.data || [];
      setWorkstations(data);

      // Extract unique types for the first select
      const types = [...new Set(data.map(ws => ws.workstation_type))];
      setWorkstationTypes(types.map(type => ({ value: type, label: type })));
    } catch (error) {
      console.error("Error fetching workstations:", error);
    }
  };
  fetchWorkstations();
}, []);

// Filter workstations by selected type
useEffect(() => {
  if (selectedType) {
    const filtered = workstations
      .filter(ws => ws.workstation_type === selectedType)
      .map(ws => ({
        value: ws.workstation_id,
        label: ws.workstation_name,
        ...ws,
      }));
    setFilteredWorkstations(filtered);
  } else {
    setFilteredWorkstations([]);
  }
}, [selectedType, workstations]);


  // Find the selected workstation object
const selectedWs = workstations.find(
  (ws) => ws.value === formData.workstation_id
);
const workstationType = selectedWs?.type || "";


  // Fetch items
  

useEffect(() => {
  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/ItemTable/all`);

      console.log("API DATA:", data); // debug

      const formatted = data.map((item) => ({
        value: item.id,
        label: item.item_id,
      }));

      setItems(formatted);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  fetchItems();
}, []);

  const handleEmployeeIdBlur = async () => {
    if (!formData.employee_id) return;

    try {
      const res = await axios.get(
        `${API_URL}/employee/names?employer_id=${formData.employee_id}`
      );

      if (res.data && res.data.length > 0) {
        const e = res.data[0];
        const fullName = `${e.f_name} ${e.m_name || ""} ${e.l_name}`.trim();
        setFormData((prev) => ({ ...prev, employee_name: fullName }));
      } else {
        setFormData((prev) => ({ ...prev, employee_name: "Not Found" }));
      }
    } catch (error) {
      console.error("Name lookup error:", error);
      setFormData((prev) => ({ ...prev, employee_name: "Error" }));
    }
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value ?? "");
      });

      await axios.post(`${API_URL}/appointment/upload_and_create`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onClose();
      onAdded();
    } catch (err) {
      console.error("Error adding appointment:", err);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Appointment" centered>
      <Flex direction="column" gap="sm">
        
        {/* EMPLOYEE ID */}
        <TextInput
          label="Employee ID"
          value={formData.employee_id}
          onChange={(e) =>
            setFormData({ ...formData, employee_id: e.target.value })
          }
          onBlur={handleEmployeeIdBlur}
        />

        <TextInput label="Employee Name" value={formData.employee_name} disabled />

        {/* Workstation Type Select */}
<Select
  label="Workstation Type"
  placeholder="Select workstation type"
  data={workstationTypes}
  value={selectedType}
  onChange={(value) => {
    setSelectedType(value);
    setFormData({ ...formData, workstation_type: value, workstation_id: "" });
  }}
/>

{/* Workstation Name Select */}
<Select
  label="Workstation"
  placeholder="Select workstation"
  data={filteredWorkstations}
  value={formData.workstation_id}
  onChange={(value) => setFormData({ ...formData, workstation_id: value })}
  disabled={!selectedType}
/>

        {/* OFFICE FIELDS */}
{workstationType === "office" && (
  <>
    <TextInput
      label="Workstation"
      value={selectedWs?.workstation_name || ""}
      disabled
    />
    <TextInput
      label="Section"
      value={selectedWs?.section_name || ""}
      disabled
    />
    <TextInput
      label="Department"
      value={selectedWs?.functional_division_name || ""}
      disabled
    />
  </>
)}

        {/* SCHOOL FIELDS */}
{workstationType === "school" && (
  <>
    <TextInput
      label="Division"
      value={selectedWs?.division_name || ""}
      disabled
    />
    <TextInput
      label="District"
      value={selectedWs?.district_name || ""}
      disabled
    />
    <TextInput
      label="School"
      value={selectedWs?.workstation_name || ""}
      disabled
    />
  </>
)}

        {/* OTHER FIELDS */}
        
  <Select
    label="Item No."
    placeholder="Select Item No."
    data={items}
    value={selectedItems}
    onChange={setSelectedItems}
  />
<TextInput
          label="Status"
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
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
          type="date"
          label="Start Date"
          value={formData.start_date}
          onChange={(e) =>
            setFormData({ ...formData, start_date: e.target.value })
          }
        />

        <TextInput
          type="date"
          label="End Date"
          value={formData.end_date}
          onChange={(e) =>
            setFormData({ ...formData, end_date: e.target.value })
          }
        />

        {/* FILE UPLOAD */}
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, file: e.target.files[0] })
          }
        />

        <Button color="green" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Modal>
  );
};

export default AddAppointmentModal;
