import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchableDropdown } from "@/components/SearchableDropdown";

const API_URL = import.meta.env.VITE_API_URL;

const ItemsTable = () => {
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Position dropdown
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");

  const [formData, setFormData] = useState({
    item_id: "",
    availability: true,
    times_tamp: "",
    subtitute: false,
    remarks: "",
    position_id: "",
  });

  // Fetch ALL positions (for dropdown)
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

  // Fetch item list
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/ItemTable/all`);
      setItems(response.data.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Open dialog → also load positions
  const openAddDialog = () => {
    fetchPositions();
    setOpenDialog(true);
  };

  // Handle text changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Add Item
  const handleAddItem = async () => {
    try {
      await axios.post(`${API_URL}/ItemTable`, {
        ...formData,
        position_id: selectedPosition, // dropdown
        availability: formData.availability === "true",
        subtitute: formData.subtitute === "true",
      });

      fetchItems();
      setOpenDialog(false);

      // Reset form
      setSelectedPosition("");
      setFormData({
        item_id: "",
        availability: true,
        times_tamp: "",
        subtitute: false,
        remarks: "",
        position_id: "",
      });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="flex flex-wrap">
      <Card className="px-5 w-full">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Items List</CardTitle>
          <Button onClick={openAddDialog}>Add Item</Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Item / Plantilla</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Date Released</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.position?.position}</TableCell>
                    <TableCell>{item.item_id}</TableCell>

                    <TableCell
                      className={
                        item.availability
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {item.availability ? "Available" : "Unavailable"}
                    </TableCell>

                    <TableCell>{item.times_tamp}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                    No items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD ITEM DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            {/* POSITION DROPDOWN HERE */}
            <div>
              <Label>Position</Label>
              <SearchableDropdown
                items={positions}
                value={selectedPosition}
                onChange={setSelectedPosition}
                placeholder="Select a Position"
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
                onChange={handleInputChange}
                value={formData.availability}
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
                onChange={handleInputChange}
                value={formData.subtitute}
                className="border p-2 w-full rounded"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
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
            <Button onClick={handleAddItem}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemsTable;
