import express from "express";
import { getJobDataFromText } from "../controllers/userController.js";
const router = express.Router();

router.post("/job-data-reponse", getJobDataFromText);
export default router;
