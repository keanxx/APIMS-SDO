import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import React, { useEffect, useState } from "react"

const ServiceRecord = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL

  // Fetch API data
  const fetchWorkstations = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/workstation/all`)
      setData(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkstations()
  }, [])

  return (
    <div className="p-6">
      {loading && <p>Loading...</p>}

      {!loading && data.length === 0 && <p>No data found.</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((station) => (
          <Card key={station.workstation_id} className="hover:shadow-md transition">
            <CardContent>
              <p className="font-semibold">{station.workstation_name}</p>
              <p className="text-sm text-gray-600">{station.workstation_type}</p>
              <p className="text-sm text-gray-600">{station.functional_division_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ServiceRecord
