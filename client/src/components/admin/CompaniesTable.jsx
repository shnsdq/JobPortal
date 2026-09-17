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

        <div className="w-full">

            {/* DESKTOP TABLE */}
            <div className="hidden sm:block rounded-md border border-gray-200">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Logo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filterCompany.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center"
                                >
                                    No Companies registered
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterCompany.map((company) => (
                                <TableRow key={company._id}>

                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company?.logo} />
                                        </Avatar>
                                    </TableCell>

                                    <TableCell>
                                        {company?.name}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(company?.createdAt).toLocaleDateString("en-GB")}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                                                <MoreHorizontal />
                                            </PopoverTrigger>

                                            <PopoverContent className="w-32 p-2 bg-white">
                                                <div
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/companies/${company._id}`
                                                        )
                                                    }
                                                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 cursor-pointer text-gray-700"
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


            {/* MOBILE CARDS */}
            <div className="sm:hidden space-y-3">

                {filterCompany.length === 0 ? (
                    <div className="text-center py-6 text-sm">
                        No Companies registered
                    </div>
                ) : (
                    filterCompany.map((company) => (

                        <div
                            key={company._id}
                            className="border rounded-md p-3 flex items-center justify-between"
                        >

                            <div className="flex items-center gap-3 min-w-0">

                                <Avatar className="h-10 w-10 shrink-0">
                                    <AvatarImage src={company?.logo} />
                                </Avatar>

                                <div className="min-w-0">
                                    <p className="font-medium text-sm break-words">
                                        {company?.name}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Date: {new Date(company?.createdAt).toLocaleDateString("en-GB")}
                                    </p>
                                </div>

                            </div>

                            <Popover>
                                <PopoverTrigger className="p-1 rounded-md hover:bg-gray-100 shrink-0">
                                    <MoreHorizontal className="w-5 h-5" />
                                </PopoverTrigger>

                                <PopoverContent className="w-32 p-2 bg-white">
                                    <div
                                        onClick={() =>
                                            navigate(
                                                `/admin/companies/${company._id}`
                                            )
                                        }
                                        className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 cursor-pointer text-gray-700"

                                    >
                                        <Edit2 className="w-4 h-4" />
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        </div>

                    ))
                )}

            </div>

        </div>
    )
}

export default CompaniesTable