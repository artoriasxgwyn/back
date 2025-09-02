import jwt from 'jsonwebtoken';
import users from '../models/users.js';

const generarJWT = (userData) => {
    return new Promise((resolve, reject) => {
        const payload = { userData };
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
        const { userData } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        let usuario = await users.findById(userData);
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