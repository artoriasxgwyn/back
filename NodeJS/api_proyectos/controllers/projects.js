// controllers/projects.js
import modelProjects from "../models/projects.js";
import checkProjectPermissions from "../helpers/checkPermissions.js";

const functionProjects = {
    getProjects: async (req, res) => {
        try {
            let { uid } = req.uid;

            // Usar helper para verificar si es admin
            const permissions = await checkProjectPermissions(uid, null, false);

            let query = { isActive: true };
            if (!permissions.isAdmin) {
                query.$or = [
                    { owner: uid },
                    { "members.user": uid }
                ];
            }

            let projects = await modelProjects.find(query);
            res.json(projects);
        }
        catch (e) {
            res.status(500).send("Error: " + e);
        }
    },

    createProject: async (req, res) => {
        try {
            let { uid } = req.uid;
            let { name, description, categorie, status, priority,
                starDate, endDate, estimatedHours, budget } = req.body;

            const project = new modelProjects({
                name,
                description,
                categorie,
                owner: uid,
                status,
                priority,
                starDate: starDate || null,
                endDate: endDate || null,
                estimatedHours,
                actualHours: 0,
                budget,
                isActive: true,
                updatedAt: new Date()
            });

            await project.save();
            res.send(project);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    getProject: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;

            // Verificar acceso al proyecto (solo lectura, no requiere ser owner)
            const permissions = await checkProjectPermissions(uid, id, false);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            let project = await modelProjects.findById(id);
            res.send(project);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    updateProject: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let { name, description, categorie, status, priority,
                endDate, estimatedHours, actualHours, budget, tags } = req.body;

            // Verificar permisos - requiere ser owner o admin
            const permissions = await checkProjectPermissions(uid, id, true);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            let updatedAt = new Date();
            const updatedProject = await modelProjects.findByIdAndUpdate(
                id,
                {
                    name, description, categorie, status, priority,
                    endDate, estimatedHours, actualHours, budget, tags, updatedAt
                },
                { new: true }
            );

            res.send(updatedProject);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    deleteProject: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;

            // Verificar permisos - requiere ser owner o admin
            const permissions = await checkProjectPermissions(uid, id, true);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            let isActive = false;
            let updatedAt = new Date();
            const deletedProject = await modelProjects.findByIdAndUpdate(
                id,
                { isActive, updatedAt },
                { new: true }
            );

            res.send(deletedProject);
        } catch (e) {
            res.status(500).send("Error: " + e.message);
        }
    },

    addMember: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let { userId, roleId } = req.body;

            // Verificar permisos - requiere ser owner o admin
            const permissions = await checkProjectPermissions(uid, id, true);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            const project = await modelProjects.findById(id);
            let newMember = {
                user: userId,
                role: roleId,
                joinedAt: new Date()
            };

            project.members.push(newMember);
            project.updatedAt = new Date();

            await project.save();
            res.status(200).send(project);

        } catch (error) {
            res.status(500).send("Error al agregar miembro: " + error.message);
        }
    },

    removeMember: async (req, res) => {
        try {
            let { id, userId } = req.params;
            let { uid } = req.uid;

            // Verificar permisos - requiere ser owner o admin
            const permissions = await checkProjectPermissions(uid, id, true);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            let updatedAt = new Date();
            const updatedProject = await modelProjects.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        members: { user: userId }
                    },
                    updatedAt
                },
                { new: true }
            );

            res.send(updatedProject);
        } catch (error) {
            res.status(500).send("Error: " + error);
        }
    },

    updateStatus: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let { status } = req.body;

            // Verificar permisos - solo requiere acceso al proyecto (no ser owner)
            const permissions = await checkProjectPermissions(uid, id, false);

            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            let updatedAt = new Date();
            const updatedProject = await modelProjects.findByIdAndUpdate(
                id,
                { status, updatedAt },
                { new: true }
            );

            res.send(updatedProject);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    }
}

export default functionProjects;