import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job)

  // Safe fallback if data is fetching or undefined
  const jobsList = allAppliedJobs || [];

  if (jobsList.length === 0) {
    return (
      <div className='text-center py-10 border border-dashed rounded-xl text-gray-500 bg-white'>
        No applied jobs found.
      </div>
    );
  }

  return (
    <div className='w-full'>
      
      {/* For small screen */}
      <div className='block sm:hidden space-y-4'>
        {jobsList.map((appliedJob) => (
          <div 
            key={appliedJob._id} 
            className='bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2'
          >
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='font-semibold text-gray-800 text-base'>{appliedJob?.job?.title}</h3>
                <p className='text-sm text-gray-500'>{appliedJob?.job?.company?.name}</p>
              </div>
              <Badge 
                className={`text-xs px-2.5 py-0.5 text-white ${
                  appliedJob?.status === "rejected" ? 'bg-red-500 hover:bg-red-500' : 
                  appliedJob?.status === 'pending' ? 'bg-gray-500 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-500'
                }`}
              >
                {appliedJob?.status?.toUpperCase()}
              </Badge>
            </div>
            <div className='flex justify-between items-center border-t pt-2 mt-1 text-xs text-gray-400'>
              <span>Applied on:</span>
              <span className='font-medium text-gray-600'>{appliedJob?.createdAt?.split("T")[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className='hidden sm:block overflow-x-auto w-full border border-gray-200 rounded-xl bg-white shadow-sm'>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className='text-right'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsList.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="whitespace-nowrap">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="font-medium text-gray-900">{appliedJob?.job?.title}</TableCell>
                <TableCell className="text-gray-600">{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className='text-right'>
                  <Badge 
                    className={`text-xs px-2.5 py-0.5 text-white ${
                      appliedJob?.status === "rejected" ? 'bg-red-500 hover:bg-red-500' : 
                      appliedJob?.status === 'pending' ? 'bg-gray-500 hover:bg-gray-500 text-white' : 'bg-green-500 hover:bg-green-500'
                    }`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}

export default AppliedJobTable
