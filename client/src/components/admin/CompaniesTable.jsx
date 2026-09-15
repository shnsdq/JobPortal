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
        <div className="w-full overflow-x-auto rounded-md border border-gray-200">
        <div className="min-w-[600px] w-full">
            <Table>
                
                <TableHeader>
                    <TableRow>
                        <TableHead  className="w-[10%]">Logo</TableHead>
                        <TableHead  className="w-[30%]">Name</TableHead>
                        <TableHead  className="w-[10%]">Date</TableHead>
                        <TableHead className='text-right w-[10%]'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length === 0
                        ? (
                            <TableRow>
                                <TableCell colSpan={4} className='text-center'>No Companies registered</TableCell>
                            </TableRow>
                        )
                        : filterCompany.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company?.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company?.name}</TableCell>
                                <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal className="cursor-pointer" /></PopoverTrigger>
                                        <PopoverContent className="w-28 bg-gray-300">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
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
        </div>
    )
}

export default CompaniesTable