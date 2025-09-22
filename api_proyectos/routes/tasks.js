import express from "express";
import { validar } from "../middlewares/JWT.js";
import functionTasks from "../controllers/tasks.js";

const router = express.Router();

// GET /api/projects/:projectId/tasks - Listar tareas del proyecto
router.get("/projects/:projectId/tasks", validar, functionTasks.getProjectTasks);

// POST /api/projects/:projectId/tasks - Crear tarea
router.post("/projects/:projectId/tasks", validar, functionTasks.createTask);

// GET /api/tasks/:id - Obtener tarea específica
router.get("/tasks/:id", validar, functionTasks.getTask);

// PUT /api/tasks/:id - Actualizar tarea
router.put("/tasks/:id", validar, functionTasks.updateTask);

// DELETE /api/tasks/:id - Eliminar tarea
router.delete("/tasks/:id", validar, functionTasks.deleteTask);

// PUT /api/tasks/:id/status - Cambiar estado de tarea
router.put("/tasks/:id/status", validar, functionTasks.updateTaskStatus);

// PUT /api/tasks/:id/assign - Asignar tarea a usuario
router.put("/tasks/:id/assign", validar, functionTasks.assignTask);

// GET /api/tasks/my-tasks - Tareas asignadas al usuario
router.get("/tasks/my-tasks", validar, functionTasks.getMyTasks);

export default router;