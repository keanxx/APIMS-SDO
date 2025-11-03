import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const AddressForm = ({ onAddressChange }) => {
  const [regions, setRegions] = useState([])
  const [provinces, setProvinces] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [barangays, setBarangays] = useState([])

  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedMunicipality, setSelectedMunicipality] = useState("")
  const [selectedBarangay, setSelectedBarangay] = useState("")

  const [subdivision, setSubdivision] = useState("")
  const [street, setStreet] = useState("")
  const [houseNo, setHouseNo] = useState("")

  // Fetch data
  useEffect(() => {
    fetch("https://psgc.cloud/api/regions").then(res => res.json()).then(setRegions)
  }, [])

  useEffect(() => {
    if (selectedRegion)
      fetch(`https://psgc.cloud/api/regions/${selectedRegion}/provinces`).then(res => res.json()).then(setProvinces)
  }, [selectedRegion])

  useEffect(() => {
    if (selectedProvince)
      fetch(`https://psgc.cloud/api/provinces/${selectedProvince}/cities-municipalities`).then(res => res.json()).then(setMunicipalities)
  }, [selectedProvince])

  useEffect(() => {
    if (selectedMunicipality)
      fetch(`https://psgc.cloud/api/cities-municipalities/${selectedMunicipality}/barangays`).then(res => res.json()).then(setBarangays)
  }, [selectedMunicipality])

  // Send flat data to parent whenever values change
  useEffect(() => {
    onAddressChange?.({
      house_no: houseNo,
      baranggay: selectedBarangay,
      street,
      municipality: selectedMunicipality,
      subdivision,
      province: selectedProvince,
    })
  }, [houseNo, street, subdivision, selectedBarangay, selectedMunicipality, selectedProvince])

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Region</Label>
          <Select onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select region" /></SelectTrigger>
            <SelectContent>
              {regions.map(r => (
                <SelectItem key={r.code} value={r.name}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Province</Label>
          <Select disabled={!provinces.length} onValueChange={setSelectedProvince}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select province" /></SelectTrigger>
            <SelectContent>
              {provinces.map(p => (
                <SelectItem key={p.code} value={p.name}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Municipality / City</Label>
          <Select disabled={!municipalities.length} onValueChange={setSelectedMunicipality}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select municipality" /></SelectTrigger>
            <SelectContent>
              {municipalities.map(m => (
                <SelectItem key={m.code} value={m.name}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Barangay</Label>
          <Select disabled={!barangays.length} onValueChange={setSelectedBarangay}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select barangay" /></SelectTrigger>
            <SelectContent>
              {barangays.map(b => (
                <SelectItem key={b.code} value={b.name}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label>Subdivision</Label>
          <Input value={subdivision} onChange={(e) => setSubdivision(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label>Street</Label>
          <Input value={street} onChange={(e) => setStreet(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label>House No.</Label>
          <Input value={houseNo} onChange={(e) => setHouseNo(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default AddressForm
