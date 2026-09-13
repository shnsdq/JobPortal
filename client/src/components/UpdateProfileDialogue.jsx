// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUser } from '../redux/authSlice'
// import axios from 'axios'
// import { USER_API_END_POINT } from '../utils/constant'
// import { toast } from 'sonner'


// const UpdateProfileDialogue = ({ open, setOpen }) => {
//     const [loading, setLoading] = useState(false);
//     const { user } = useSelector(store => store.auth);

//     const [input, setInput] = useState({
//         fullname: user?.fullname,
//         email: user?.email,
//         phoneNumber: user?.phoneNumber,
//         bio: user?.profile?.bio,
//         skills: user?.profile?.skills?.map(skill => skill),
//         file: user?.profile?.resume
//     });

//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value })
//     }

//     const fileChangeHandler = (e) => {
//         setInput({ ...input, file: e.target.files?.[0] });
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("fullname", input.fullname)
//         formData.append("email", input.email)
//         formData.append("phoneNumber", input.phoneNumber)
//         formData.append("bio", input.bio)
//         formData.append("skills", input.skills)
//         if (input.file) {
//             formData.append("file", input.file)
//         }

//         try {
//             setLoading(true)
//             const res = await axios.post(`${USER_API_END_POINT}/updateProfile`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 dispatch(setUser(res.data.user))
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.response.data.message)
//         }finally{
//                   setLoading(false);
//                  }
//         setOpen(false)
//     };

//     return (
//         <div>
//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent className="sm:max-w-[425px] bg-gray-200 text-gray-900" onIntereactOutside={() => setOpen(false)} >
//                     <DialogHeader>
//                         <DialogTitle>Update Profile</DialogTitle>
//                         <DialogDescription>Update your profile information</DialogDescription>
//                     </DialogHeader>
//                     <form onSubmit={submitHandler}>
//                         <div className='grid gap-4 py-4'>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="name" className="text-right">FullName</Label>
//                                 <Input
//                                     id="name"
//                                     name="fullname"
//                                     type="text"
//                                     value={input.fullname}
//                                     onChange={changeEventHandler}
//                                     className='col-span-3 '
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="email" className="text-right">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     value={input.email}
//                                     onChange={changeEventHandler}
//                                     className='col-span-3'
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="number" className="text-right">Phone Number</Label>
//                                 <Input
//                                     id="number"
//                                     name="phoneNumber"
//                                     value={input.phoneNumber}
//                                     onChange={changeEventHandler}
//                                     className='col-span-3'
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="bio" className="text-right">Bio</Label>
//                                 <Input
//                                     id="bio"
//                                     name="bio"
//                                     value={input.bio}
//                                     onChange={changeEventHandler}
//                                     className='col-span-3'
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="skills" className="text-right">Skills</Label>
//                                 <Input
//                                     id="skills"
//                                     name="skills"
//                                     value={input.skills}
//                                     onChange={changeEventHandler}
//                                     className='col-span-3'
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="file" className="text-right">Resume</Label>
//                                 <Input
//                                     id="file"
//                                     name="file"
//                                     type="file"
//                                     accept="application/pdf"
//                                     onChange={fileChangeHandler}
//                                     className='col-span-3'
//                                 />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             {
//                                 loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </Button> 
//                                 : <Button type="submit" className="cursor-pointer bg-gray-300 w-full my-4">Update</Button>
//                             }
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

// export default UpdateProfileDialogue

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'

const UpdateProfileDialogue = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || [],
        file: user?.profile?.resume || ""
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/updateProfile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message);
                setOpen(false); // Close dialog on success
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            
            <DialogContent 
                className="w-[95vw] sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-white text-gray-900 rounded-xl p-6" 
                onInteractOutside={() => setOpen(false)} 
            >
                <DialogHeader className="text-left">
                    <DialogTitle className="text-xl font-bold">Update Profile</DialogTitle>
                    <DialogDescription className="text-gray-500 text-sm">
                        Update your profile information.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-4 py-4">
                    
                    {/* Full Name */}
                    <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4'>
                        <Label htmlFor="name" className="sm:text-right text-gray-700 font-medium">FullName</Label>
                        <Input
                            id="name"
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className='w-full sm:col-span-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-gray-900'
                        />
                    </div>

                    {/* Email */}
                    <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4'>
                        <Label htmlFor="email" className="sm:text-right text-gray-700 font-medium">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className='w-full sm:col-span-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-gray-900'
                        />
                    </div>

                    {/* Phone Number */}
                    <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4'>
                        <Label htmlFor="number" className="sm:text-right text-gray-700 font-medium">Phone Number</Label>
                        <Input
                            id="number"
                            name="phoneNumber"
                            type="text"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className='w-full sm:col-span-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-gray-900'
                        />
                    </div>

                    {/* Bio */}
                    <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4'>
                        <Label htmlFor="bio" className="sm:text-right text-gray-700 font-medium">Bio</Label>
                        <Input
                            id="bio"
                            name="bio"
                            type="text"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className='w-full sm:col-span-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-gray-900'
                        />
                    </div>

                    {/* Skills */}
                    <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4'>
                        <Label htmlFor="skills" className="sm:text-right text-gray-700 font-medium">Skills</Label>
                        <Input
                            id="skills"
                            name="skills"
                            type="text"
                            placeholder="HTML, CSS, JavaScript"
                            value={input.skills}
                            onChange={changeEventHandler}
                            className='w-full sm:col-span-3 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-gray-900'
                        />
                    </div>

                    {/* Resume File */}
                    <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4'>
                        <Label htmlFor="file" className="sm:text-right text-gray-700 font-medium">Resume</Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                            className='w-full sm:col-span-3 bg-gray-50 border-gray-200 file:bg-gray-900 file:text-white file:rounded-md file:border-0 file:text-xs file:font-medium hover:file:bg-gray-800 cursor-pointer'
                        />
                    </div>

                    <DialogFooter className="pt-2">
                        {loading ? (
                            <Button disabled className="w-full bg-gray-900 text-white flex items-center justify-center"> 
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                            </Button> 
                        ) : (
                            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium cursor-pointer transition-colors">
                                Update Profile
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialogue
