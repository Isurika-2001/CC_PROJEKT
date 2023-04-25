import express from "express";
import {
  getStartupRequests,
  getEntreprenureRequests,
  getSwitchRequests,
  getConsultantRequests,
  getDistributorRequests,
  approveRequests,
  declineRequests,
  approveSwitchRequests,
  declineSwitchRequests,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/getStartupRequests", getStartupRequests);
router.put("/approveRequests/:username/:reg_no", approveRequests);
router.put("/declineRequests/:username", declineRequests);
router.put("/declineSwitchRequests/:username", declineSwitchRequests);

router.get("/getEntreprenureRequests", getEntreprenureRequests);
router.get("/getSwitchRequests", getSwitchRequests);
router.put("/approveRequests/:username", approveRequests);

router.get("/getConsultantRequests", getConsultantRequests);
router.put(
  "/approveSwitchRequests/:username/:category/:business_name/:address/:reg_no",
  approveSwitchRequests
);

router.get("/getDistributorRequests", getDistributorRequests);

export default router;
