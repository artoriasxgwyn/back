import jwt from 'jsonwebtoken';
import users from '../models/users.js';
import roles from "../models/roles.js"

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"
        },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token")
                } else {
                    resolve(token)
                }
            })
    })
}


const validar = async (req, res, next) => {
    try {
        const token = req.header("x-token");
        const uid = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        let user = await users.findById(uid.uid);
        let role = await roles.findById(user.globalRole);
        req.uid = uid;

        if (!token) {
            return res.status(401).json({
                msg: "No hay token en la peticion"
            })
        };
        if (!role.isActive) {
            return res.send("el rol no esta activo");
        }
        if (!user.isActive) {
            return res.status(403).send("No esta activo el usuario")
        };
        if (!user) {
            return res.status(401).json({
                msg: "usuario no existe"
            })
        };
        next();
    } catch (error) {
        res.status(401).json({
            msg: "token no valido"
        })
    }
}

export { validar, generarJWT }