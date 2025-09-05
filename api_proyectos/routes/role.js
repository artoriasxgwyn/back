import role from "../controllers/role.js";
import express from "express";

const router = express()

router.get("/",role.getRole);
router.post("/",role.addRole);
router.put("/",role.updateRole);
router.delete("/",role.deleteRole);

export default router;