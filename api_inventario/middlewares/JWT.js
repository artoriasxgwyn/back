import jwt from 'jsonwebtoken';

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"//4h
        }, (err, token) => {

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
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        let usuario = await Holder.findByid(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: "usuario no existe"
            })
        }
        if (usuario.estado == 0) {
            return res.status(401).json({
                msg: "usuario inactivo"
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