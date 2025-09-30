import express from "express"
import { getAllJobs, getJobById, getJobByRecuriter, jobPost } from "../controllers/job.controller.js";
import { verifyJwt } from "../middleware/auth.js";

const router = express.Router();

router.post('/postjob',verifyJwt,jobPost);
router.get('/all',verifyJwt,getAllJobs);
router.get('/:id',verifyJwt,getJobById);
router.get('/getrecruiterjob',verifyJwt,getJobByRecuriter);

export default router;
