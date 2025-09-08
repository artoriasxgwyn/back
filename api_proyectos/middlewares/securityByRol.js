import users from "../models/users.js"
import roles from "../models/roles.js"
let roleOnlyRecurse = ["admin", "projectManager", "developer"];
let roleOnlyProject = ["admin", "projectManager"];

const onlyAdmin = async function (req, res, next) {
    try {
        let { uid } = req.body;
        console.log(uid)
        let user = await users.findById(uid);
        let role = await roles.findById(user.globalRole);
        if (role.name === "Admin") {
            next()
        };
    } catch (error) {
        res.send("No es admin")
    };
};

const onlyProject = function (req, res, next) {
    try {
        let { uid } = req.body;
        let user = users.findById(uid);
        let role = user.globalRole;
        let validation = roleOnlyProject.includes(role);
        if (!validation) {
            res.status(403).send("no tienes acceso a esta ruta")
        };
        if (role.name === "Admin") {
            next()
        };
        
        next()
    } catch (e) {
        res.send(e)
    }
};
const onlyRecurse = function (req, res, next) {
    try {
        let { uid } = req.body;
        let user = users.findById(uid);
        let role = user.globalRole;
        let validation = roleOnlyRecurse.includes(role)
        if (!validation) {
            res.status(403).send("no tienes acceso a esta ruta")
        };
    } catch (error) {

    }
};

export { onlyAdmin, onlyProject, onlyRecurse }