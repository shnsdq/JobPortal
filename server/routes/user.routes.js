import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.js"
import { verifyJwt } from "../middleware/auth.js";

const router = express.Router();

router.post('/register', upload.single("file"), register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/updateProfile', verifyJwt,upload.single("file"), updateProfile);


export default router;
