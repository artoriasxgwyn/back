import express from "express";
import { validar } from "../middlewares/JWT.js";
import { onlyAdmin } from "../middlewares/securityByRol.js";
import functionStates from "../controllers/states.js";

const router = express.Router();

router.get("/projects", validar, functionStates.getStatesProjects);
router.get("/tasks", validar, functionStates.getStatesTask);
router.post("/", validar, onlyAdmin, functionStates.createState);
router.put("/:id", validar, onlyAdmin, functionStates.updateState);

export default router;