import jwt from 'jsonwebtoken';
import users from '../models/users.js';

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
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }
    try {
        const uid = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        let usuario = await users.findById(uid.uid);
        req.uid = uid;
        console.log(usuario)
        if(!usuario.isActive){
        res.status(403).send("No esta activo")
        };
        if (!usuario) {
            return res.status(401).json({
                msg: "usuario no existe"
            })
        }
        next();
    } catch (error) {
        res.status(401).json({
            msg: "token no valido"
        })
    }
}

export { validar, generarJWT }