import express from "express";
import { validar } from "../middlewares/JWT.js";
import functionProjects from "../controllers/projects.js";
import { onlyProject } from "../middlewares/securityByRol.js";

const router = express.Router();

router.get("/", validar, onlyProject, functionProjects.getProjects);
router.post("/", validar, onlyProject, functionProjects.createProject);
router.get("/:id", validar, onlyProject, functionProjects.getProject);
router.put("/:id", validar, onlyProject, functionProjects.updateProject);
router.delete("/:id", validar, onlyProject, functionProjects.deleteProject);
router.post("/:id/members", validar, onlyProject, functionProjects.addMember); // ← Add member
router.delete("/:id/members/:userId", onlyProject, validar, functionProjects.removeMember);
router.put("/:id/status", validar, onlyProject, functionProjects.updateStatus);

export default router;