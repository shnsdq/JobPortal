import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import axios from 'axios'

const shortListingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const applications = applicants?.applications || []

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true

            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status }
            )

            if (res?.data?.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error)

            const errorMessage =
                error?.response?.data?.message ||
                "Something went wrong changing status"

            toast.error(errorMessage)
        }
    }

    const ActionButton = ({ id }) => (
        <Popover>
            <PopoverTrigger asChild>
                <button className="p-1 rounded hover:bg-gray-100">
                    <MoreHorizontal className="cursor-pointer" />
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-32 bg-gray-300">
                {shortListingStatus.map((status) => (
                    <div
                        onClick={() => statusHandler(status, id)}
                        key={status}
                        className="flex w-fit items-center my-2 cursor-pointer"
                    >
                        <span>{status}</span>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    )

    return (
        <div className="w-full">

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block w-full rounded-md border">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {applications.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No Applicants
                                </TableCell>
                            </TableRow>
                        ) : (
                            applications.map((item) => (
                                <TableRow key={item._id}>

                                    <TableCell>
                                        {item?.applicant?.fullname || "NA"}
                                    </TableCell>

                                    <TableCell className="break-all">
                                        {item?.applicant?.email || "NA"}
                                    </TableCell>

                                    <TableCell>
                                        {item?.applicant?.phoneNumber || "NA"}
                                    </TableCell>

                                    <TableCell>
                                        {item?.applicant?.profile?.resume ? (
                                            <a
                                                className="text-blue-600 hover:underline"
                                                href={item.applicant.profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile
                                                    ?.resumeOriginalName || "View Resume"}
                                            </a>
                                        ) : (
                                            <span>NA</span>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {item?.applicant?.createdAt
                                            ? item.applicant.createdAt.split("T")[0]
                                            : "NA"}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <ActionButton id={item?._id} />
                                    </TableCell>

                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>


            {/* ================= MOBILE CARDS ================= */}
            <div className="md:hidden space-y-4">

                {applications.length === 0 ? (
                    <div className="border rounded-md py-8 text-center text-muted-foreground">
                        No Applicants
                    </div>
                ) : (
                    applications.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-md p-4 shadow-sm bg-white"
                        >

                            {/* Header */}
                            <div className="flex justify-between items-start gap-3 mb-4">

                                <div className="min-w-0">
                                    <h3 className="font-semibold text-base break-words">
                                        {item?.applicant?.fullname || "NA"}
                                    </h3>

                                    <p className="text-sm text-gray-500 break-all">
                                        {item?.applicant?.email || "NA"}
                                    </p>
                                </div>

                                <ActionButton id={item?._id} />

                            </div>


                            {/* Applicant Details */}
                            <div className="space-y-3 text-sm">

                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-gray-600">
                                        Contact
                                    </span>

                                    <span className="break-words">
                                        {item?.applicant?.phoneNumber || "NA"}
                                    </span>
                                </div>


                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-gray-600">
                                        Resume
                                    </span>

                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 hover:underline break-all"
                                            href={item.applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile
                                                ?.resumeOriginalName || "View Resume"}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </div>


                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-gray-600">
                                        Date
                                    </span>

                                    <span>
                                        {item?.applicant?.createdAt
                                            ? item.applicant.createdAt.split("T")[0]
                                            : "NA"}
                                    </span>
                                </div>

                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    )
}

export default ApplicantsTable