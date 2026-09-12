import React, { useEffect, useState } from 'react'
import { RadioGroup } from './ui/radio-group'
import { Label } from './ui/label'
import { RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import dropdown_icon from '../assets/dropdown_icon.png'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai", "Kolkata"]
  },
  {
    filterType: "Job Role",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science", "Data Analyst", "Business Analyst"]
  },

]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [showfilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <p onClick={() => setShowFilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filter Jobs
        <img className={`h-4 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={dropdown_icon} alt="" />
      </p>
     
      <div className={`border border-gray-300 px-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`} >
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {
            filterData.map((data, index) => (
              <div key={index}>
                <h1 className='font-medium text-lg'>{data.filterType}</h1>
                {
                  data.array.map((item, idx) => {
                    const itemId = `id${index}-${idx}`
                    return (
                      <div key={itemId} className='flex items-center space-x-2 my-2'>
                        <RadioGroupItem value={item} id={itemId} />
                        <Label htmlFor={itemId}>{item} </Label>
                      </div>
                    )
                  })
                }
              </div>
            ))
          }
        </RadioGroup>
        </div>
      </div>
      )
}

      export default FilterCard