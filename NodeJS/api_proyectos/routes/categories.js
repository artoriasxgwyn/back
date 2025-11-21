import express from "express";
import { validar } from "../middlewares/JWT.js";
import { onlyAdmin } from "../middlewares/securityByRol.js";
import functionCategories from "../controllers/categories.js";

const router = express.Router();

router.get("/", validar, functionCategories.getCategories);
router.post("/", validar, onlyAdmin, functionCategories.createCategorie);
router.put("/:id", validar, onlyAdmin, functionCategories.updateCategorie);
router.delete("/:id", validar, onlyAdmin, functionCategories.deleteCategorie);

export default router;