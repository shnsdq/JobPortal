import {Application} from '../models/application.model.js'
import {Job} from '../models/job.model.js'

//student applying for job
export const applyJob = async (req,res) => {
    try {
        const userId = req.userId;
        const jobId = req.params.id;

        if(!jobId){
            res.status(400).json({ message: "JobId required" })
        }

        //check if the user has already applied for the job
        const existingApplication = await Application.findOne({job:jobId, applicant: userId})
        if(existingApplication){
            res.status(400).json({ message: "You have already applied for this job" })
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
             res.status(400).json({ message: "No job found" })
        }

        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            appplicant:userId
        });

        job.applications.push(newApplication._id);
        await job.save();

     return res.status(200).json({ success: true, message: "Job Applied successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

//student seeing the jobs he applied
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.userId;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });

        if(!application){
            return res.status(400).json({ success: true, message: "No Application" })
        }

        return res.status(200).json({ application,success: true });

    } catch (error) {
         console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

//Recruiter getting how many applicants for the particular job
export const getApplicants = async (req,res) => {
    try {
        const {id:jobId} = req.params;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        });

        if(!job){
             res.status(400).json({ message: "No job found" })
        }

          return res.status(200).json({ job,success: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

//Recruiter updating the status
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status){
             res.status(400).json({ message: "Status is required" })
        }

        //find the application by applicationId
        const application = await Application.findById({_id:applicationId});
         if(!application){
             res.status(404).json({ message: "Application not found" })
        }

     //Update status
     application.status = status.toLowerCase();
     await application.save();

      return res.status(200).json({ success: true, message: "Status updated successfully" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
};