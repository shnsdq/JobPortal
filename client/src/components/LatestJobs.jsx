import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
    const {allJobs} = useSelector(store=> store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text -[#6A38C2]'>Latest & Top </span>Job Openings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 items-stretch'>
                {
                    allJobs.length === 0 
                    ? <span>No Job available</span> 
                    : allJobs?.slice(0,6).map((job) => 
                    <LatestJobCards key={job._id} job={job} className="h-full" />)
                }
            </div>

        </div>
    )
}

export default LatestJobs