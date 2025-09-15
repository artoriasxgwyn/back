import role from "../controllers/roles.js";
import express from "express";
import { validar } from "../middlewares/JWT.js";
import { onlyAdmin } from "../middlewares/securityByRol.js";

const router = express()

router.get("/", validar, role.getRole);
router.post("/", validar, onlyAdmin, role.addRole);
router.put("/:id", validar, onlyAdmin, role.updateRole);
router.delete("/:id", validar, onlyAdmin, role.deleteRole);
router.put("/:id/role", validar, onlyAdmin, role.changeRole);

export default router;