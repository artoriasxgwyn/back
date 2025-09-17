import modelProjects from "../models/projects.js";

const functionProjects = {
    getProjects: async (req, res) => {
        try {
            let { uid } = req.uid;
            
            // Buscar proyectos donde el usuario es owner o miembro
            let projects = await modelProjects.find({
                $or: [
                    { owner: uid },
                    { "members.user": uid }
                ],
                isActive: true
            });
            
            res.json(projects).send("ahí están tus proyectos");
        }
        catch (e) {
            res.send(e);
        }
    },
    
    createProject: async (req, res) => {
        try {
            let { uid } = req.uid;
            let { name, description, categorie, status, priority, 
                  starDate, endDate, estimatedHours, budget, tags } = req.body;
            
            const project = new modelProjects({ 
                name, 
                description, 
                categorie, 
                owner: uid,
                status,
                priority,
                starDate,
                endDate,
                estimatedHours,
                actualHours: 0,
                budget,
                tags,
                isActive: true,
                members: [{
                    user: uid,
                    role: null,
                    joinedAt: new Date()
                }],
                updatedAt: new Date()
            });
            
            await project.save();
            res.send(project);
        } catch (error) {
            res.send(error);
        };
    },
    
    getProject: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            
            // Buscar proyecto y verificar que el usuario tenga acceso
            let project = await modelProjects.findOne({
                _id: id,
                $or: [
                    { owner: uid },
                    { "members.user": uid }
                ],
                isActive: true
            });
            
            if (!project) {
                return res.status(404).send("Proyecto no encontrado o no tienes acceso");
            }
            
            res.send(project);
        } catch (error) {
            res.send(error);
        }
    },
    
    updateProject: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let { name, description, categorie, status, priority, 
                  endDate, estimatedHours, actualHours, budget, tags } = req.body;
            
            let updatedAt = new Date();
            
            // Verificar que el usuario es el owner antes de actualizar
            let project = await modelProjects.findOne({
                _id: id,
                owner: uid,
                isActive: true
            });
            
            if (!project) {
                return res.status(403).send("Solo el owner puede actualizar el proyecto");
            }
            
            const updatedProject = await modelProjects.findByIdAndUpdate(
                id,
                { 
                    name, 
                    description, 
                    categorie, 
                    status, 
                    priority, 
                    endDate, 
                    estimatedHours, 
                    actualHours, 
                    budget, 
                    tags,
                    updatedAt 
                },
                { new: true }
            );
            
            res.send(updatedProject);
        } catch (error) {
            res.send(error);
        }
    },
    
    deleteProject: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let isActive = false;
            let updatedAt = new Date();
            
            // Verificar que el usuario es el owner antes de eliminar
            let project = await modelProjects.findOne({
                _id: id,
                owner: uid
            });
            
            if (!project) {
                return res.status(403).send("Solo el owner puede eliminar el proyecto");
            }
            
            const deletedProject = await modelProjects.findByIdAndUpdate(
                id,
                { isActive, updatedAt },
                { new: true }
            );
            
            res.send(deletedProject);
        } catch (e) {
            res.send(e);
        }
    },
    
    addMember: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let { userId, roleId } = req.body;
            let updatedAt = new Date();
            
            // Verificar que el usuario es el owner antes de agregar miembros
            let project = await modelProjects.findOne({
                _id: id,
                owner: uid,
                isActive: true
            });
            
            if (!project) {
                return res.status(403).send("Solo el owner puede agregar miembros");
            }
            
            // Agregar el nuevo miembro
            const updatedProject = await modelProjects.findByIdAndUpdate(
                id,
                {
                    $push: {
                        members: {
                            user: userId,
                            role: roleId,
                            joinedAt: new Date()
                        }
                    },
                    updatedAt
                },
                { new: true }
            );
            
            res.send(updatedProject);
        } catch (error) {
            res.send(error);
        }
    },
    
    removeMember: async (req, res) => {
        try {
            let { id, userId } = req.params;
            let { uid } = req.uid;
            let updatedAt = new Date();
            
            // Verificar que el usuario es el owner antes de remover miembros
            let project = await modelProjects.findOne({
                _id: id,
                owner: uid,
                isActive: true
            });
            
            if (!project) {
                return res.status(403).send("Solo el owner puede remover miembros");
            }
            
            // Remover el miembro
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
            res.send(error);
        }
    },
    
    updateStatus: async (req, res) => {
        try {
            let { id } = req.params;
            let { uid } = req.uid;
            let { status } = req.body;
            let updatedAt = new Date();
            
            // Verificar que el usuario es miembro del proyecto
            let project = await modelProjects.findOne({
                _id: id,
                $or: [
                    { owner: uid },
                    { "members.user": uid }
                ],
                isActive: true
            });
            
            if (!project) {
                return res.status(403).send("No tienes acceso a este proyecto");
            }
            
            const updatedProject = await modelProjects.findByIdAndUpdate(
                id,
                { status, updatedAt },
                { new: true }
            );
            
            res.send(updatedProject);
        } catch (error) {
            res.send(error);
        }
    }
}

export default functionProjects;