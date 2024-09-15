import { Router } from "express";
import { JobController } from "../controllers/job.controller";
import { asyncHandler } from "../utils";

const router = Router()

router.get("/jobs", asyncHandler(JobController.getAll))
router.get("/jobs/:id", asyncHandler(JobController.getOne))
router.post("/jobs", asyncHandler(JobController.add))
router.patch("/jobs/:id", asyncHandler(JobController.update))
router.delete("/jobs/:id", asyncHandler(JobController.delete))

export default router