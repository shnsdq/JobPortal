import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

//const companyArray = [];

const locations = [
    { label: "Delhi NCR", value: "Delhi NCR" },
    { label: "Banglore", value: "Banglore" },
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Pune", value: "Pune" },
    { label: "Mumbai", value: "Mumbai" },
]

const title = [
    { label: "Frontend Developer", value: "Frontend Developer" },
    { label: "Backend Developer", value: "Backend Developer" },
    { label: "FullStack Developer", value: "FullStack Developer" },
]

const salary = [
    { label: "3-4", value: "3-4" },
    { label: "4-10", value: "4-10" },
    { label: "10-15", value: "10-15" },
]


const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id })
    }

      const selectFieldHandler = (fieldName, value) => {
        setInput({ ...input, [fieldName]: value });
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md '>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Select onValueChange={(value) => selectFieldHandler("title", value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Title" />
                                </SelectTrigger>
                                <SelectContent className='bg-gray-200'>
                                    <SelectGroup className="cursor-pointer">
                                        {title.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        
                        </div>
                       
                         <div>
                            <Select onValueChange={(value) => selectFieldHandler("salary", value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Salary" />
                                </SelectTrigger>
                                <SelectContent className='bg-gray-200 cursor-pointer'>
                                    <SelectGroup>
                                        {salary.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select onValueChange={(value) => selectFieldHandler("location", value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent className='bg-gray-200 cursor-pointer'>
                                    <SelectGroup>
                                        {locations.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div>
                            <Label>JobType</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                placeholder="Full Time"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                         <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No. of Position</Label>
                            <Input
                                type="Number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                         {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Company" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-gray-200 cursor-pointer'>
                                        <SelectGroup>
                                            {
                                                companies.map((company, index) => {
                                                    return (
                                                        <SelectItem key={index} value={company?.name?.toLowerCase()}>{company?.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                        
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </Button>
                            : <Button type="submit" className="bg-black text-white cursor-pointer w-full my-4 ">Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xl text-red-600 font-bold text-center my-3'> *Please register a company first,before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob