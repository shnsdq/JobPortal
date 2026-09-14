import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        if (!companies || companies.length === 0) {
            setFilterCompany([]);
            return;
        }
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        /* overflow-x-auto and min-w-full wrapper to allow horizontal scrolling if needed */
        <div className="w-full overflow-x-auto rounded-md border">
            <Table className="min-w-[600px] md:min-w-full">
                <TableHeader>
                    <TableRow>
                        {/* Hidden on small screens, shown from medium screens up */}
                        <TableHead className="w-20 hidden sm:table-cell">Logo</TableHead>
                        <TableHead>Name</TableHead>
                        {/* Hidden on mobile, shown from medium screens up */}
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className='text-right w-[100px]'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length === 0 ? (
                        <TableRow>
                            {/* dynamic colSpan to match active columns */}
                            <TableCell colSpan={4} className='text-center py-8 text-muted-foreground'>
                                No Companies registered
                            </TableCell>
                        </TableRow>
                    ) : filterCompany.map((company) => (
                        <TableRow key={company._id}>
                            {/*  Logo hidden on mobile */}
                            <TableCell className="hidden sm:table-cell">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={company?.logo} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                                {/* Mobile optimization: show sub-info under the name on small screens */}
                                <div>
                                    <span>{company?.name}</span>
                                    <div className="text-xs text-muted-foreground md:hidden mt-1">
                                        Created: {company?.createdAt?.split("T")[0]}
                                    </div>
                                </div>
                            </TableCell>
                            {/* Date column hidden on mobile */}
                            <TableCell className="hidden md:table-cell">
                                {company?.createdAt?.split("T")[0]}
                            </TableCell>
                            <TableCell className='text-right cursor-pointer'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="p-2 hover:bg-muted rounded-full transition-colors inline-flex items-center justify-center">
                                            <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-28 p-2" align="end">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className='flex items-center gap-2 w-full p-2 hover:bg-muted rounded-md cursor-pointer transition-colors text-sm'
                                        >
                                            <Edit2 className='w-4 h-4' />
                                            <span>Edit</span>
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
    )
}

export default CompaniesTable
