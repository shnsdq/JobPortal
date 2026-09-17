import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)

    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {

            if (!searchJobByText) {
                return true
            }

            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            )
        })

        setFilterJobs(filteredJobs)

    }, [allAdminJobs, searchJobByText])

    return (
        <div className="w-full">

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden sm:block w-full rounded-md border border-gray-200 overflow-hidden">
                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">
                                Company Name
                            </TableHead>

                            <TableHead className="w-[40%]">
                                Role
                            </TableHead>

                            <TableHead className="w-[20%]">
                                Date
                            </TableHead>

                            <TableHead className="w-[10%] text-right">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>

                        {filterJobs.length === 0 ? (

                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No jobs found
                                </TableCell>
                            </TableRow>

                        ) : (

                            filterJobs.map((job) => (

                                <TableRow key={job._id}>

                                    <TableCell className="font-medium">
                                        {job?.company?.name}
                                    </TableCell>

                                    <TableCell>
                                        {job?.title}
                                    </TableCell>

                                    <TableCell>
                                        {job?.createdAt?.split("T")[0]}
                                    </TableCell>

                                    <TableCell className="text-right">

                                        <Popover>

                                            <PopoverTrigger className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                                                <MoreHorizontal className="cursor-pointer" />
                                            </PopoverTrigger>

                                            <PopoverContent className="w-32 p-2 bg-white">

                                                <div
                                                    onClick={() =>
                                                        navigate(`/admin/jobs/${job._id}/applicants`)
                                                    }
                                                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 cursor-pointer text-gray-700"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>Applicants</span>
                                                </div>

                                            </PopoverContent>

                                        </Popover>

                                    </TableCell>

                                </TableRow>

                            ))
                        )}

                    </TableBody>

                </Table>
            </div>


            {/* ================= MOBILE CARDS ================= */}
            <div className="sm:hidden space-y-3">

                {filterJobs.length === 0 ? (

                    <div className="border rounded-md p-6 text-center text-gray-500">
                        No jobs found
                    </div>

                ) : (

                    filterJobs.map((job) => (

                        <div
                            key={job._id}
                            className="border rounded-lg p-4 bg-white shadow-sm"
                        >

                            {/* Company */}
                            <div className="flex justify-between items-start gap-3">

                                <div className="min-w-0 flex-1">

                                    <p className="text-xs text-gray-500 mb-1">
                                        Company
                                    </p>

                                    <p className="font-semibold text-gray-800 break-words">
                                        {job?.company?.name}
                                    </p>

                                </div>


                                {/* Action */}
                                <Popover>

                                    <PopoverTrigger className="p-1.5 rounded-md hover:bg-gray-100 flex-shrink-0">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </PopoverTrigger>

                                    <PopoverContent className="w-32 p-2 bg-white">

                                        <div
                                            onClick={() =>
                                                navigate(`/admin/jobs/${job._id}/applicants`)
                                            }
                                            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 cursor-pointer text-gray-700"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Applicants</span>
                                        </div>

                                    </PopoverContent>

                                </Popover>

                            </div>


                            {/* Role */}
                            <div className="mt-4">

                                <p className="text-xs text-gray-500 mb-1">
                                    Role
                                </p>

                                <p className="text-sm font-medium text-gray-800 break-words">
                                    {job?.title}
                                </p>

                            </div>


                            {/* Date */}
                            <div className="mt-3">

                                <p className="text-xs text-gray-500 mb-1">
                                    Date
                                </p>

                                <p className="text-sm text-gray-700">
                                    {job?.createdAt?.split("T")[0]}
                                </p>

                            </div>

                        </div>

                    ))
                )}

            </div>

        </div>
    )
}

export default AdminJobsTable

