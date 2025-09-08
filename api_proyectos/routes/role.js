import role from "../controllers/role.js";
import express from "express";
import { validar } from "../middlewares/JWT.js";
import { onlyAdmin } from "../middlewares/securityByRol.js";

const router = express()

router.get("/", validar, role.getRole);
router.post("/", validar, onlyAdmin, role.addRole);
router.put("/", validar, onlyAdmin, role.updateRole);
router.delete("/", validar, onlyAdmin, role.deleteRole);

export default router;