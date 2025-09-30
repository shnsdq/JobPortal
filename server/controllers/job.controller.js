import {Job} from "../models/job.model.js"

export const jobPost = async (req,res) => {
    try {
        const {title, description,requirements, salary,location,jobType,experienceLevel,position,companyId } = req.body;
        if(!title || !description ||!requirements || !salary ||!location ||!jobType || !experienceLevel ||!position || !companyId ){
            res.status(400).json({ message: "Feild is required", success: false })
        }

        const userId = req.userId;

     const job = await Job.create({
        title,
        description,
        requirements:requirements.split(','),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel,
        position,
        company:companyId,
        createdBy:userId
     })

      return res.status(201).json({
         message: "Job created successfully", 
         job,
         success: true,
         })     

    } catch (error) {
        console.log(error)
       return res.status(400).json({
         message: "Job creation failed", 
         success: false,
         })     
    }
}

export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or:[
                {title:{ $regex: keyword, $options: "i"}},
                {description:{ $regex: keyword, $options: "i"}},
            ]
        }

        const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt:-1});
        if(!jobs)
        return res.status(400).json({ message: " No Job found ", success: false })     

        return res.status(201).json({ jobs, success: true })     

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:error.message, success: false })     

    }
}

export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate('company applications')

        if(!job){
             return res.status(404).json({ message: " No Job found ", success: false })
        }

         return res.status(201).json({ job, success: true })

    } catch (error) {
         console.log(error)
        return res.status(500).json({ message:error.message, success: false })
    }
}

//loggedIn as recruiter -> get job created by himself
export const getJobByRecuriter = async (req,res) => {
    try {
        const userId = req.userId;

        const jobs = await Job.findById({createdBy : userId}).populate('company').sort({createdAt:-1})

        if(!jobs)
        return res.status(400).json({ message: " No Job created ", success: false })     

        return res.status(201).json({ jobs, success: true })     

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:error.message, success: false })
    }
}