import React, { StrictMode, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../redux/store'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import axios from 'axios'


function Signup() {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error)
      const errMsg = error.response?.data?.message || "Server Connection failed";
      toast.error(errMsg)

    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])


  return (
    <div>
      <Navbar />
      <div>
        <form onSubmit={SubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-8 gap-2 text-gray-800'>
          <div className='inline-flex items-center gap-2 mb-2 mt-8'>
            <p className='prata-regular text-3xl'>Sign Up </p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
          </div>
            
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="FullName"
              className='w-full px-3 py-2 border border-gray-800'
              />
                       
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Email"
               className='w-full px-3 py-2 border border-gray-800'
            />
           
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Phone No."
               className='w-full px-3 py-2 border border-gray-800'
            />
          
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
               className='w-full px-3 py-2 border border-gray-800'
            />
          
          <div className='flex flex-col sm:flex-row my-1'>
            <Label>Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              
             className='w-full px-3 py-2 border border-gray-800'
            />
          </div>

          <div className='flex items-center justify-between gap-4'>
            <RadioGroup className='flex items-center gap-2 my-1'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

          </div>

          {
            loading 
            ? <Button className="w-full my-1"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> 
            : <Button type="submit" className="bg-black text-white rounded-md cursor-pointer w-full my-1">Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup