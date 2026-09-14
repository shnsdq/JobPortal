import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };

            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });

        setFilterJobs(filteredJobs);

    }, [allAdminJobs, searchJobByText])

    return (
        /* The container handles horizontal overflow on mobile screens */
        <div className="w-full overflow-x-auto rounded-md border border-gray-200">
            {/* Setting a min-width prevents columns from collapsing tightly on mobile */}
            <div className="min-w-[600px] w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Company Name</TableHead>
                            <TableHead className="w-[40%]">Role</TableHead>
                            <TableHead className="w-[20%]">Date</TableHead>
                            <TableHead className='text-right w-[10%]'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filterJobs.length === 0 
                                ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className='text-center py-8 text-gray-500'>
                                            No applied jobs
                                        </TableCell>
                                    </TableRow>
                                )
                                : filterJobs?.map((job) => (
                                    
                                    <TableRow key={job._id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium truncate max-w-[150px]">
                                            {job?.company?.name}
                                        </TableCell>
                                        <TableCell className="truncate max-w-[200px]">
                                            {job?.title}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            {job?.createdAt.split("T")[0]}
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <Popover>
                                                <PopoverTrigger className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                                                    <MoreHorizontal className='cursor-pointer mx-auto sm:mr-0' />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-36 p-2 bg-white border border-gray-200 shadow-md">
                                                    <div 
                                                        onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                        className='flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 cursor-pointer text-gray-700'
                                                    >
                                                        <Edit2 className='w-4 h-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                    <div 
                                                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                        className='flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 cursor-pointer mt-0.5 text-gray-700'
                                                    >
                                                        <Eye className='w-4 h-4' />
                                                        <span>Applicants</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminJobsTable
