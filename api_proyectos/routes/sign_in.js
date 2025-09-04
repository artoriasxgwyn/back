import Users from "../models/users.js"
import bcrypt from "bcryptjs";
import { generarJWT } from "../middlewares/JWT.js"

async function sign_in(req, res) {
    const { firstName, password } = req.body
    const user = await Users.findOne({ firstName })
    try {
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            res.send("contaseña incorrecta").status(400);
        }
        generarJWT(user._id)
            .then((x) => {
                 res.header('x-token', x).send("si existe el usuario");
            })
    }
    catch (e) {
        console.log(e)
    }
}

export default sign_in