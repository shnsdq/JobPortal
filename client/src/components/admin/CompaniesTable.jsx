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

        <div className="w-full rounded-md border border-gray-200">
            <Table className="w-full table-fixed">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[18%] px-2 sm:px-4">
                            Logo
                        </TableHead>

                        <TableHead className="w-[37%] px-2 sm:px-4">
                            Name
                        </TableHead>

                        <TableHead className="w-[30%] px-2 sm:px-4">
                            Date
                        </TableHead>

                        <TableHead className="w-[15%] px-2 sm:px-4 text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center py-4"
                            >
                                No Companies registered
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company._id}>

                                {/* Logo */}
                                <TableCell className="px-2 sm:px-4">
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                        <AvatarImage src={company?.logo} />
                                    </Avatar>
                                </TableCell>

                                {/* Name */}
                                <TableCell className="px-2 sm:px-4 text-xs sm:text-sm break-words">
                                    {company?.name}
                                </TableCell>

                                {/* Date */}
                                <TableCell className="px-2 sm:px-4 text-xs sm:text-sm break-words">
                                    {company?.createdAt?.split("T")[0]}
                                </TableCell>

                                {/* Action */}
                                <TableCell className="px-2 sm:px-4 text-right">
                                    <Popover>
                                        <PopoverTrigger className="p-1">
                                            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-32 p-2">
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/companies/${company._id}`
                                                    )
                                                }
                                                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
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
    )
}

export default CompaniesTable