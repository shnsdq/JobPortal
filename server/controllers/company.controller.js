import {Company} from '../models/company.model.js';
import cloudinary from '../utils/cloudinary.js';

export const registerCompany = async (req,res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            res.status(400).json({ message: "Feild is required", success: false })
        }

        const company = await Company.findOne({name: companyName});

        if(company){
            res.status(400).json({ message: "You can't add same company", success: false })
        }

        const userId = req.userId;

        const newCompany = await Company.create({
            name:companyName,
            userId:userId
        })

        res.status(201).json({ message: "Company registered", success: true })

    } catch (error) {
         console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const updateCompany = async (req,res) => {
    try {
        const {name,description,website,location} = req.body;
        const companyId = req.params.id;

        const logo = req.file.logo[0];
         const cloudResponse = await cloudinary.uploader.upload(logo.path)
        const logo_url = cloudResponse.secure_url;

        const company = await Company.findByIdAndUpdate(companyId,{
            name,
            description,
            website,
            location,
            logo:logo_url
        },{new:true})

     if(!company){
         res.status(400).json({ message: "Company not found", success: false })
     }

      res.status(201).json({ message: "Company details added successfully",company, success: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

//loggedIn as Recruiter
export const getCompany = async (req,res) => {
    try {
        const userId = req.userId;

        const companies = await Company.find({userId});
        if(!companies){
            res.status(400).json({ message: "Company not found", success: false })
        }

         res.status(201).json({ companies, success: true })


    } catch (error) {
         console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);
        if(!company){
            res.status(400).json({ message: "Company not found", success: false })
        }

         res.status(201).json({ company, success: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}