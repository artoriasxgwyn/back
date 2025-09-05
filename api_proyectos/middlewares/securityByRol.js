import users from "../models/users.js"
let roleOnlyRecurse = ["admin", "projectManager", "developer",];
let roleOnlyProject = ["admin", "projectManager"];

const onlyGlobal = function (req, res, next) {
    try {
        let { uid } = req.body;
        let user = users.findById(uid);
        let role = user.globalRole === "admin";
        if (role) {
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
    } catch (e) {

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

export { onlyGlobal, onlyProject, onlyRecurse }