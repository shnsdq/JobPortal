import React from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'

const shortListingStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                     </TableHeader>
                    <TableBody>

                        <tr>
                            <TableCell>{FullName}</TableCell>
                            <TableCell>{Email}</TableCell>
                            <TableCell>{Contact}</TableCell>
                            <TableCell>{Resume}</TableCell>
                            <TableCell>{Date}</TableCell>
                            <TableCell className='text-right cursor-pointer'>
                                 <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id / applicants}`)} className='flex items-center gap-2 w-fit cursor-pointer mt-2'>
                                            <Eye className='w-4' />
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                {
                                    shortListingStatus.map((status, index) => {
                                        return (
                                            <div key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                <span>{status} </span>
                                            </div>
                                        )
                                    })
                                }
                               
                            </TableCell>
                        </tr>
                        ))
                    }
                    </TableBody>
               
            </Table>
        </div>
    )
}

export default ApplicantsTable