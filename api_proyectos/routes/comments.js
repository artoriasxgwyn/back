import express from "express";
import { validar } from "../middlewares/JWT.js";
import functionComments from "../controllers/comments.js";

const router = express.Router();

// GET /api/projects/:id/comments - Comentarios del proyecto
router.get("/projects/:id/comments", validar, functionComments.getComments);

// POST /api/projects/:id/comments - Comentar en proyecto
router.post("/projects/:id/comments", validar, functionComments.createComment);

// PUT /api/comments/:id - Editar comentario
router.put("/comments/:id", validar, functionComments.updateComment);

// DELETE /api/comments/:id - Eliminar comentario
router.delete("/comments/:id", validar, functionComments.deleteComment);

export default router;