import express from "express"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { verifyJwt } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post('/register',verifyJwt,registerCompany);
router.get('/get',verifyJwt,getCompany);
router.get('/get/:id',verifyJwt,getCompanyById);
router.put('/update/:id',verifyJwt,upload.single("file"),updateCompany);

export default router;