import express from "express";
import { login, register, logout, adminLogin, consultationPayment, getEntreprenures, getConsultants, getConsultations } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/adminlogin", adminLogin);
router.post("/consultationPayment", consultationPayment);
router.get("/getEntreprenures", getEntreprenures);
router.get("/getConsultants", getConsultants);
router.get("/getConsultations", getConsultations);

export default router