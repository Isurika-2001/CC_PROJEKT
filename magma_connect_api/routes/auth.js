import express from "express";
import { login, checkConnectEntr, connectEntr, register, logout, switchRequest, updateProfile, getStartupDetails, getDistributorDetails, getEntreprenureDetails, getConsultantDetails, adminLogin, consultationPayment, getEntreprenures, getConsultants, getConsultations } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/adminlogin", adminLogin);
router.post("/consultationPayment", consultationPayment);
router.get("/getEntreprenures", getEntreprenures);
router.get("/getConsultants", getConsultants);
router.get("/getConsultations", getConsultations);
router.get("/getStartupDetails/:username", getStartupDetails);
router.get("/getEntreprenureDetails/:username", getEntreprenureDetails);
router.get("/getConsultantDetails/:username", getConsultantDetails);
router.get("/getDistributorDetails/:username", getDistributorDetails);
router.post("/switchRequest/:username", switchRequest);
router.post("/updateProfile/:username", updateProfile);
router.post("/connectEntr/:username/:currentUsername", connectEntr);
router.post("/checkConnectEntr/:username/:currentUsername", checkConnectEntr);

export default router