import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import React from 'react'

const SearchFilter = () => {
  return (
    <div>
        <Card>
            <CardContent>
                <div className='grid grid-cols-2 md:flex gap-5'>
                <div className='flex-1'>
                    <div className='relative'>
                    <Search className='absolute left-3 top-3 h-4 w-4'/>
                    <Input className="pl-10" />
                    </div>
                </div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Department"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Departments</SelectLabel>
                            <SelectItem value="ICT">ICT</SelectItem>
                            <SelectItem value="GOD">GOD</SelectItem>
                            <SelectItem value="SDS">SDS</SelectItem>
                            <SelectItem value="ASDS">ASDS</SelectItem>
                            <SelectItem value="MEDICAL">MEDICAL</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Department"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Departments</SelectLabel>
                            <SelectItem value="ICT">ICT</SelectItem>
                            <SelectItem value="GOD">GOD</SelectItem>
                            <SelectItem value="SDS">SDS</SelectItem>
                            <SelectItem value="ASDS">ASDS</SelectItem>
                            <SelectItem value="MEDICAL">MEDICAL</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Department"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Departments</SelectLabel>
                            <SelectItem value="ICT">ICT</SelectItem>
                            <SelectItem value="GOD">GOD</SelectItem>
                            <SelectItem value="SDS">SDS</SelectItem>
                            <SelectItem value="ASDS">ASDS</SelectItem>
                            <SelectItem value="MEDICAL">MEDICAL</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default SearchFilter