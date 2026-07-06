import express from "express"
import { getAllJobs, getJobById, getJobByRecuriter, jobPost } from "../controllers/job.controller.js";
import { verifyJwt } from "../middleware/auth.js";

const router = express.Router();

router.post('/post',verifyJwt,jobPost);
router.get('/get',verifyJwt,getAllJobs);
router.get('/getadminjobs',verifyJwt,getJobByRecuriter);
router.get('/get/:id',verifyJwt,getJobById);

export default router;
