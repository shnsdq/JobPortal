import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    if(!user) {
        navigate("/login");
        return;
    }

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) //ensuring state is in sync with fetched data
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob();

  }, [jobId, dispatch, user, navigate])


  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true); //update the local state     
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updateSingleJob)); //helps us in real time update 

        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>

      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6'>
        <div>
          <h1 className='font-bold text-lg sm:text-xl text-gray-600'>{singleJob?.company?.name}</h1>
          <h2 className='font-bold text-2xl sm:text-3xl mt-1 text-gray-900'>{singleJob?.title}</h2>

          <div className='flex flex-wrap items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold bg-blue-50' variant="ghost">Openings: {singleJob?.position} </Badge>
            <Badge className='text-[#F83002] font-bold bg-red-50' variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className='text-[#7209b7] font-bold bg-purple-50' variant="ghost">₹ {singleJob?.salary}Lakh</Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`w-full md:w-auto px-6 py-3 rounded-lg text-center font-medium shadow-sm transition-all ${isApplied ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#7209b7] text-white hover:bg-[#5f32ad]'
            }`}
        >
          {isApplied ? 'Already Applied' : "Apply Now"}
        </Button>
      </div>

      <h3 className='border-b-2 border-b-gray-200 font-semibold text-lg py-4 text-gray-800'>
        Job Description
      </h3>

      {/* Detail Fields grid/stack */}
      <div className='max-w-5xl my-6 space-y-1'>
        <div className='flex flex-col sm:flex-row sm:items-baseline border-b border-gray-50 pb-2'>
          <span className='font-bold text-gray-700'>Role:</span>
          <span className='sm:pl-1 font-normal text-gray-600'>{singleJob?.title}</span>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-baseline border-b border-gray-50 pb-2'>
          <span className='font-bold text-gray-700'>Location:</span>
          <span className='sm:pl-1 font-normal text-gray-600'>{singleJob?.location}</span>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-baseline border-b border-gray-50 pb-2'>
          <span className='font-bold text-gray-700'>Experience:</span>
          <span className='sm:pl-1 font-normal text-gray-600'>{singleJob?.experienceLevel} Year(s)</span>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-baseline border-b border-gray-50 pb-2'>
          <span className='font-bold text-gray-700 mb-2 sm:mb-0'>Requirements:</span>
          <div className='sm:pl-1 flex flex-wrap gap-1.5'>
            {singleJob?.requirements?.map((item, index) => (
              <Badge key={index} className="bg-gray-200 text-gray-800 border-none m-2">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-baseline border-b border-gray-50 pb-2'>
          <span className='font-bold text-gray-700'>Salary:</span>
          <span className='sm:pl-1 font-normal text-gray-600'>₹ {singleJob?.salary}Lakh</span>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-baseline border-b border-gray-50 pb-2'>
          <span className='font-bold text-gray-700'>Applicants:</span>
          <span className='sm:pl-1 font-normal text-gray-600'>{singleJob?.applications?.length}</span>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-baseline pb-2'>
          <span className='font-bold text-gray-700'>Posted: </span>
          <span className='sm:pl-1 font-normal text-gray-600'>{singleJob?.createdAt?.split("T")[0]}</span>
        </div>
        <div className='flex flex-col sm:items-baseline border-b border-gray-50 pb-2'>
          <span className='font-bold text-gray-700'>Description:</span>
          <span className='sm:pl-1 font-normal text-gray-600 leading-relaxed'>{singleJob?.description}</span>
        </div>
      </div>
    </div>
  )
}

export default JobDescription

