import express from "express"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { verifyJwt } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post('/register',verifyJwt,registerCompany);
router.put('/update/:id',verifyJwt,upload.single('file'),updateCompany);
router.get('/getcompany',verifyJwt,getCompany);
router.get('/getcompany/:id',verifyJwt,getCompanyById);

export default router;