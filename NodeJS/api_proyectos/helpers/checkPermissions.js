// helpers/checkPermissions.js
import modelUsers from "../models/users.js";
import modelRoles from "../models/roles.js";
import modelProjects from "../models/projects.js";

const checkProjectPermissions = async (uid, projectId, requireOwner = false) => {
    try {
        // 1. Verificar si es admin
        const user = await modelUsers.findById(uid);
        if (!user) return { hasAccess: false, error: "Usuario no encontrado" };
        
        const role = await modelRoles.findById(user.globalRole);
        if (!role) return { hasAccess: false, error: "Rol no encontrado" };
        
        const isAdmin = role.name.toLowerCase() === "admin";
        
        // 2. Si es admin y no requiere ser owner, dar acceso inmediato
        if (isAdmin && !requireOwner) {
            return { hasAccess: true, isAdmin: true };
        }
        
        // 3. ⚠️ VERIFICAR SI projectId ES VÁLIDO O NULL
        if (!projectId ) {
            // Si no hay projectId válido, solo admins tienen acceso
            return { 
                hasAccess: isAdmin, 
                isAdmin, 
                error: isAdmin ? null : "Se requiere un projectId válido" 
            };
        }
        
        // 4. Buscar el proyecto (ahora projectId es válido)
        const project = await modelProjects.findById(projectId);
        if (!project) {
            return { hasAccess: false, error: "Proyecto no encontrado" };
        }
        
        const isOwner = project.owner.toString() === uid;
        const isMember = project.members.some(m => m.user.toString() === uid);
        
        // 5. Lógica de permisos
        if (isAdmin) {
            return { hasAccess: true, isAdmin: true, isOwner, isMember };
        }
        
        if (requireOwner && !isOwner) {
            return { hasAccess: false, error: "Solo el owner puede realizar esta acción" };
        }
        
        if (!isOwner && !isMember) {
            return { hasAccess: false, error: "No tienes acceso a este proyecto" };
        }
        
        return { hasAccess: true, isAdmin: false, isOwner, isMember };
        
    } catch (error) {
        console.error("Error en checkProjectPermissions:", error);
        return { hasAccess: false, error: "Error al verificar permisos" };
    }
};

export default checkProjectPermissions;