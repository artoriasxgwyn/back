import express from "express";
import functionsUsers from "../controllers/users.js";
import { validar } from "../middlewares/JWT.js";
import { onlyAdmin } from "../middlewares/securityByRol.js";

const router = express();

router.get("/", validar, onlyAdmin, functionsUsers.getUsers);
router.get("/profile", validar, functionsUsers.actualUser);
router.post("/profile", validar, functionsUsers.updateUser);
router.delete("/", validar);

export default router;