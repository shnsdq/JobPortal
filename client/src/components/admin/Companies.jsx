import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
   
    useGetAllCompanies();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setsearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex flex-row items-center sm:justify-between my-5' >
                    <Input
                        className='w-40 sm:w-fit'
                        value={input}
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/create')} className='bg-black text-white cursor-pointer '>New Company</Button>
                </div>

                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies