import modelTask from "../models/tasks.js";
import modelProjects from "../models/projects.js";
import checkProjectPermissions from "../helpers/checkPermissions.js";

const functionTasks = {
    // GET /api/projects/:projectId/tasks - Listar tareas del proyecto
    getProjectTasks: async (req, res) => {
        try {
            let { projectId } = req.params;
            let { uid } = req.uid;

            // Verificar acceso al proyecto
            const permissions = await checkProjectPermissions(uid, projectId, false);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            let tasks = await modelTask.find({
                project: projectId,
                isActive: true
            }).sort({ createdAt: -1 });

            res.json(tasks);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // POST /api/projects/:projectId/tasks - Crear tarea
    createTask: async (req, res) => {
        try {
            let { projectId } = req.params;
            let { uid } = req.uid;
            let {
                title, description, assignedTo, status, priority,
                estimatedHours, startDate, dueDate, tags
            } = req.body;

            // Verificar acceso al proyecto
            const permissions = await checkProjectPermissions(uid, projectId, false);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            if (!title || title.trim() === "") {
                return res.status(400).send("El título de la tarea es requerido");
            }

            const task = new modelTask({
                title: title.trim(),
                description,
                project: projectId,
                assignedTo,
                createdBy: uid,
                status,
                priority,
                estimatedHours,
                actualHours: 0,
                startDate,
                dueDate,
                tags: tags || [],
                isActive: true,
                createdAt: new Date(),
                updateAt: new Date()
            });

            await task.save();
            res.status(201).send(task);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // GET /api/tasks/:id - Obtener tarea específica
    getTask: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;

            // Buscar la tarea
            const task = await modelTask.findById(id);
            if (!task) {
                return res.status(404).send("Tarea no encontrada");
            }

            // Verificar acceso al proyecto de la tarea
            const permissions = await checkProjectPermissions(uid, task.project, false);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            res.send(task);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // PUT /api/tasks/:id - Actualizar tarea
    updateTask: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let {
                title, description, assignedTo, status, priority,
                estimatedHours, actualHours, startDate, dueDate, tags
            } = req.body;

            // Buscar la tarea
            const task = await modelTask.findById(id);
            if (!task) {
                return res.status(404).send("Tarea no encontrada");
            }

            // Verificar permisos: creador de la tarea O admin/owner del proyecto
            const isCreator = task.createdBy.toString() === uid;

            if (!isCreator) {
                const projectPermissions = await checkProjectPermissions(uid, task.project, true);
                if (!projectPermissions.hasAccess) {
                    return res.status(403).send("No tienes permisos para actualizar esta tarea");
                }
            }

            const updatedTask = await modelTask.findByIdAndUpdate(
                id,
                {
                    title,
                    description,
                    assignedTo,
                    status,
                    priority,
                    estimatedHours,
                    actualHours,
                    startDate,
                    dueDate,
                    tags,
                    updateAt: new Date()
                },
                { new: true }
            );

            res.send(updatedTask);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // DELETE /api/tasks/:id - Eliminar tarea
    deleteTask: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;

            // Buscar la tarea
            const task = await modelTask.findById(id);
            if (!task) {
                return res.status(404).send("Tarea no encontrada");
            }

            // Verificar permisos: admin/owner del proyecto
            const projectPermissions = await checkProjectPermissions(uid, task.project, true);
            if (!projectPermissions.hasAccess) {
                return res.status(403).send("No tienes permisos para eliminar esta tarea");
            }

            const deletedTask = await modelTask.findByIdAndUpdate(
                id,
                {
                    isActive: false,
                    updateAt: new Date()
                },
                { new: true }
            );

            res.send({ message: "Tarea eliminada correctamente", task: deletedTask });
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // PUT /api/tasks/:id/status - Cambiar estado de tarea
    updateTaskStatus: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let { status } = req.body;

            // Buscar la tarea
            const task = await modelTask.findById(id);
            if (!task) {
                return res.status(404).send("Tarea no encontrada");
            }

            // Verificar permisos: asignado a la tarea O admin/owner del proyecto
            const isAssigned = task.assignedTo?.toString() === uid;

            if (!isAssigned) {
                const projectPermissions = await checkProjectPermissions(uid, task.project, true);
                if (!projectPermissions.hasAccess) {
                    return res.status(403).send("No tienes permisos para cambiar el estado de esta tarea");
                }
            }

            let updateData = {
                status,
                updateAt: new Date()
            };

            // Si el nuevo estado es "Completado", establecer completedAt
            if (status === "Completado" && !task.completedAt) {
                updateData.completedAt = new Date();
            }

            // Si se reactiva la tarea, limpiar completedAt
            if (status !== "Completado" && task.completedAt) {
                updateData.completedAt = null;
            }

            const updatedTask = await modelTask.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            res.send(updatedTask);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // PUT /api/tasks/:id/assign - Asignar tarea a usuario
    assignTask: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let { assignedTo } = req.body;

            // Buscar la tarea
            const task = await modelTask.findById(id);
            if (!task) {
                return res.status(404).send("Tarea no encontrada");
            }

            // Verificar permisos: admin/owner del proyecto
            const projectPermissions = await checkProjectPermissions(uid, task.project, true);
            if (!projectPermissions.hasAccess) {
                return res.status(403).send("No tienes permisos para asignar esta tarea");
            }

            const updatedTask = await modelTask.findByIdAndUpdate(
                id,
                {
                    assignedTo,
                    updateAt: new Date()
                },
                { new: true }
            );

            res.send(updatedTask);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // GET /api/tasks/my-tasks - Tareas asignadas al usuario
    getMyTasks: async (req, res) => {
        try {
            let { uid } = req.uid;

            let tasks = await modelTask.find({
                assignedTo: uid,
                isActive: true
            })
                .populate('project', 'name')
                .populate('status', 'name')
                .sort({ dueDate: 1 }); // Ordenar por fecha de vencimiento

            res.json(tasks);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    }
}

export default functionTasks;