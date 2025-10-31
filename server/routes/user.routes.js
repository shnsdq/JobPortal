import express from "express";
import { changePassword, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.js"
import { verifyJwt } from "../middleware/auth.js";

const router = express.Router();

router.post('/register', upload.single("file"), register);
router.post('/login', login);
router.get('/logout', logout);
router.patch('/updateProfile', verifyJwt,upload.fields([{ name: "resume", maxCount: 1 }, { name: "image", maxCount: 1 }]), updateProfile);
router.post('/changePassword',verifyJwt,changePassword);

export default router;
