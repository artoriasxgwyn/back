import express from "express";
import { validar } from "../middlewares/JWT.js";
import functionProjects from "../controllers/projects.js";

const router = express.Router();

router.get("/", validar, functionProjects.getProjects);
router.post("/", validar, functionProjects.createProject);
router.get("/:id", validar, functionProjects.getProject);
router.put("/:id", validar, functionProjects.updateProject);
router.delete("/:id", validar, functionProjects.deleteProject);
router.post("/:id/members", validar, functionProjects.addMember);
router.delete("/:id/members/:userId", validar, functionProjects.removeMember);
router.put("/:id/status", validar, functionProjects.updateStatus);

export default router;