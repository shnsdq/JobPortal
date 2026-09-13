// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Button } from './ui/button'
// import { Badge } from './ui/badge'
// import { Label } from './ui/label'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialogue from './UpdateProfileDialogue'
// import { useSelector } from 'react-redux'
// import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
// import { useNavigate } from 'react-router-dom'
// import profilePic from '../assets/profile.jpg'

// //const skills = ["HTML","Css","Javascript"]
// const isResume = true;

// const Profile = () => {
//   useGetAppliedJobs();
//   const [open, setOpen] = useState(false)
//   const { user } = useSelector(store => store.auth)
//   const navigate = useNavigate();

//   // protect route
//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className='max-w-4xl mx-4 sm:mx-auto mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-8'>
//         <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
//           <div className='flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 w-full sm:w-auto'>
//             <Avatar className="h-20 w-20 sm:h-24 sm:w-24" >
//               <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : profilePic} alt="profile" />
//             </Avatar>
//             <div>
//               <h1 className='font-medium text-xl sm:text-2xl text-gray-800'>{user?.fullname} </h1>
//               <p className='text-gray-600 mt-1 text-sm sm:text-base'>{user?.profile?.bio}</p>
//             </div>
//           </div>
//           <Button onClick={() => setOpen(true)} className="w-full sm:w-auto cursor-pointer" variant="outline" ><Pen className='w-4 h-4 mr-2' /> Edit Profile</Button>
//         </div>
//         <div className='my-6 space-y-3'>
//           <div className='flex items-center gap-3 text-gray-600 break-all text-sm sm:text-base'>
//             <Mail className='w-5 h-5 flex-shrink-0'/>
//             <span>{user?.email}</span>
//           </div>
//           <div className='flex items-center gap-3 my-2'>
//             <Contact />
//             <span>{user?.phoneNumber}</span>
//           </div>
//         </div>
//         <div className='my-5'>
//           <h1>Skills</h1>
//           <div className='flex items-center gap-1'>
//             {
//               user?.profile?.skills.length != 0 
//               ? user?.profile?.skills.map((item, index) =>
//                  <Badge key={index}>{item}</Badge>) 
//                : <span>NA</span>
//             }
//           </div>
//         </div>
//         <div className='grid w-full max-w-sm items-center gap-1.5'>
//           <Label className='text-md font-bold'>Resume</Label>
//           {
//             isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> 
//             : <span>NA</span>
//           }
//         </div>
//       </div>

//       <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//         <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
//         <AppliedJobTable />
//       </div>

//       <UpdateProfileDialogue open={open} setOpen={setOpen} />
//     </div>
//   )
// }

// export default Profile

import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialogue from './UpdateProfileDialogue'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import { useNavigate } from 'react-router-dom'
import profilePic from '../assets/profile.jpg'

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false)
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className='min-h-screen bg-gray-50 pb-10'>
      <Navbar />
      
      {/* Profile Container */}
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-8 mx-4 sm:mx-auto'>
        
        {/* Header Section: Stack on mobile, row on small screens up */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div className='flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 w-full sm:w-auto'>
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24" >
              <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : profilePic} alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl sm:text-2xl text-gray-800'>{user?.fullname}</h1>
              <p className='text-gray-600 mt-1 text-sm sm:text-base'>{user?.profile?.bio || "No bio added yet."}</p>
            </div>
          </div>
          {/* Edit button: Full width on mobile, auto on desktop */}
          <Button onClick={() => setOpen(true)} className="w-full sm:w-auto cursor-pointer" variant="outline">
            <Pen className='w-4 h-4 mr-2' /> Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className='my-6 space-y-3'>
          <div className='flex items-center gap-3 text-gray-600 break-all text-sm sm:text-base'>
            <Mail className='w-5 h-5 flex-shrink-0' />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 text-gray-600 text-sm sm:text-base'>
            <Contact className='w-5 h-5 flex-shrink-0' />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className='my-6'>
          <h2 className='font-semibold text-gray-700 mb-2'>Skills</h2>
          <div className='flex flex-wrap items-center gap-2'>
            {
              user?.profile?.skills && user?.profile?.skills.length !== 0 
              ? user?.profile?.skills.map((item, index) =>
                 <Badge key={index} className="text-xs px-2.5 py-0.5">{item}</Badge>) 
               : <span className='text-gray-400 text-sm'>NA</span>
            }
          </div>
        </div>

        {/* Resume Section */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-sm font-bold text-gray-700'>Resume</Label>
          {
            isResume ? (
              <a 
                target='_blank' 
                rel="noreferrer"
                href={user?.profile?.resume} 
                className='text-blue-500 hover:underline cursor-pointer text-sm sm:text-base truncate block max-w-xs sm:max-w-md'
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : <span className='text-gray-400 text-sm'>NA</span>
          }
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className='max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-0 mx-4 sm:mx-auto'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        {/* Responsive wrapper for the table component */}
        <div className='overflow-x-auto w-full'>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
