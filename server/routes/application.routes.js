import express from 'express'
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';
import { verifyJwt } from '../middleware/auth.js';

const router = express.Router();

router.post('/apply/:id',verifyJwt,applyJob);
router.get('/get',verifyJwt,getAppliedJobs);
router.get('/:id/applicants',verifyJwt,getApplicants);
router.post('/status/:id/update',verifyJwt,updateStatus);

export default router;