import users from "../models/users.js"
import roles from "../models/roles.js"

const roleOnlyRecurse = ["admin", "projectManager", "developer"];
const roleOnlyProject = ["admin", "projectManager"];

const onlyAdmin = async function (req, res, next) {
    try {
        let { uid } = req.uid;
        let user = await users.findById(uid);
        let role = await roles.findById(user.globalRole);
        
        if (role.name.toLowerCase() === "admin") {
            next();
        } else {
            res.status(403).send("No tienes permisos de administrador");
        }
    } catch (error) {
        res.status(500).send("Error al verificar permisos: " + error);
    }
};

const onlyProject = async function (req, res, next) {
    try {
        let { uid } = req.uid;
        let user = await users.findById(uid);
        let role = await roles.findById(user.globalRole);
        let roleName = role.name.toLowerCase();
        
        if (roleName === "admin" || roleOnlyProject.includes(roleName)) {
            next();
        } else {
            res.status(403).send("No tienes acceso a esta ruta");
        }
    } catch (e) {
        res.status(500).send("Error: " + e);
    }
};

const onlyRecurse = async function (req, res, next) {
    try {
        let { uid } = req.uid;
        let user = await users.findById(uid);
        let role = await roles.findById(user.globalRole);
        let roleName = role.name.toLowerCase();
        
        if (roleName === "admin" || roleOnlyRecurse.includes(roleName)) {
            next();
        } else {
            res.status(403).send("No tienes acceso a esta ruta");
        }
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
};

export { onlyAdmin, onlyProject, onlyRecurse }