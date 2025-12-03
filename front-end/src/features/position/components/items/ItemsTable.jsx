import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  MantineReactTable,
  useMantineReactTable,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from "mantine-react-table";

import { Box, Button, Flex, Modal, Text } from "@mantine/core";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableDropdown } from "@/components/SearchableDropdown";

const API_URL = import.meta.env.VITE_API_URL;

const ItemsTable = () => {
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  // Position dropdown
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");

  const [formData, setFormData] = useState({
    item_id: "",
    availability: true,
    times_tamp: "",
    subtitute: true,
    remarks: null,
    position_id: "",
  });

  // Fetch positions
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

  // Fetch items
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/ItemTable/all`);
      setItems(response.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddDialog = () => {
    fetchPositions();
    setOpenDialog(true);
  };

   const openEditDialog = (item) => {
    fetchPositions();

    setEditingId(item.id);

    setSelectedPosition(item.position?.id || "");

    setFormData({
      item_id: item.item_id,
      availability: item.availability,
      times_tamp: item.times_tamp || "",
      subtitute: item.subtitute,
      remarks: item.remarks,
      position_id: item.position?.id || "",
    });

    setOpenDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {
    try {
      await axios.post(`${API_URL}/ItemTable`, {
        ...formData,
        position_id: selectedPosition,
        availability: formData.availability,
        subtitute: formData.subtitute,
      });

      fetchItems();
      setOpenDialog(false);

      setSelectedPosition("");
      setFormData({
        item_id: "",
        availability: true,
        times_tamp: "",
        subtitute: false,
        remarks: null,
        position_id: "",
      });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
const handleUpdateItem = async () => {
    try {
      await axios.put(`${API_URL}/ItemTable/${editingId}`, {
        ...formData,
        position_id: selectedPosition,
      });

      fetchItems();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };


     const handleDelete = async (employeeId) => {
      if (!confirm("Are you sure you want to delete this Item/Plantilla?")) return;
    
      try {
        await axios.delete(`${API_URL}/ItemTable/${employeeId}`);
        fetchItems(); // refresh table after deletion
      } catch (error) {
        console.error("Delete error:", error);
      }
    };
  // -----------------------
  // 📌 MANTINE TABLE CONFIG
  // -----------------------

  const columns = useMemo(
    () => [
      {
        accessorKey: "position.position",
        header: "Position",
        Cell: ({ cell }) => cell.getValue() || "—",
      },
      {
        accessorKey: "item_id",
        header: "Item / Plantilla",
      },
      {
        accessorKey: "availability",
        header: "Availability",
        Cell: ({ cell }) =>
          cell.getValue() ? (
            <span style={{ color: "green", fontWeight: "600" }}>Available</span>
          ) : (
            <span style={{ color: "red", fontWeight: "600" }}>Unavailable</span>
          ),
      },
      {
        accessorKey: "position.tranche.salary_grade",
        header: "Salary Grade",
        Cell: ({ cell }) => cell.getValue() || "—",
      },
      {
        accessorKey: "times_tamp",
        header: "Date Released",
      },
            {
        header: "Actions",
        Cell: ({ row }) => (
        <div>
          <Button size="xs" onClick={() => openEditDialog(row.original)}>
            Edit
          </Button>

          <Button size="xs" onClick={() => handleDelete(row.original.id)}>
            Delete
          </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: items,
    enableColumnFilters: true,
    enableSorting: true,
    enableGlobalFilter: true,
    enablePagination: true,
    initialState: {
      showGlobalFilter: true,
      pagination: { pageSize: 10 },
    },

    renderTopToolbar: ({ table }) => (
      <Flex
        p="md"
        justify="space-between"
        align="center"
        style={{ width: "100%" }}
      >
        <Flex gap="md" align="center">
          <MRT_GlobalFilterTextInput table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Flex>

        <Button onClick={openAddDialog}>Add Item</Button>
      </Flex>
    ),
  });

  return (
    <>
      <Card className="px-5 w-full">
        <CardHeader>
          <CardTitle>Items List</CardTitle>
        </CardHeader>

        <CardContent>
          <MantineReactTable table={table} />
        </CardContent>
      </Card>

      {/* ----------------------- */}
      {/* 📌 ADD ITEM DIALOG */}
      {/* ----------------------- */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Item" : "Add Item"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Position</Label>
              <SearchableDropdown
                items={positions}
                value={selectedPosition}
                onChange={setSelectedPosition}
              />
            </div>

            <div>
              <Label>Item ID</Label>
              <Input
                name="item_id"
                value={formData.item_id}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Availability</Label>
              <select
                name="availability"
                value={formData.availability ? "true" : "false"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: e.target.value === "true",
                  }))
                }
                className="border p-2 w-full rounded"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>

            <div>
              <Label>Substitute</Label>
              <select
                name="subtitute"
                value={formData.subtitute ? "true" : "false"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subtitute: e.target.value === "true",
                  }))
                }
                className="border p-2 w-full rounded"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <Label>Remarks</Label>
              <Input
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Date Released</Label>
              <Input
                type="date"
                name="times_tamp"
                value={formData.times_tamp}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>

            {editingId ? (
              <Button onClick={handleUpdateItem}>Update</Button>
            ) : (
              <Button onClick={handleAddItem}>Save</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ItemsTable;
