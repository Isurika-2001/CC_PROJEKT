import express from "express";
import {
  getStartupRequests,
  getEntreprenureRequests,
  getConsultantRequests,
  getDistributorRequests,
  approveRequests,
  declineRequests,
  getEntreprenures,
  getConsultants,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/getStartupRequests", getStartupRequests);
router.put("/approveRequests/:username", approveRequests);
router.put("/declineRequests/:username", declineRequests);

router.get("/getEntreprenureRequests", getEntreprenureRequests);
router.put(
  "/approveRequests/:username",
  approveRequests
);
router.put(
  "/declineRequests/:username",
  declineRequests
);

router.get("/getConsultantRequests", getConsultantRequests);
router.put("/approveRequests/:username", approveRequests);
router.put("/declineRequests/:username", declineRequests);

router.get("/getDistributorRequests", getDistributorRequests);
router.put("/approveRequests/:username", approveRequests);
router.put("/declineRequests/:username", declineRequests);

router.get("/getEntreprenures", getEntreprenures);

router.get("/getConsultants", getConsultants);

export default router;
