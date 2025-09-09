import Users from "../models/users.js"
import bcrypt from "bcryptjs";
import { generarJWT } from "../middlewares/JWT.js"

/*
{
    "firstName":"johann",
    "lastName":"Silva",
    "email":"johannsilvamendez@gmail.com",
    "password":"ryomen445",
    "avatar":"xdxexo",
    "phone":"3213635730",
    "global": "68bc9567b90574defd8b5581",
    "isActive":"true",
    "isEmailVerified":true,
    "globalRole":"68bc9567b90574defd8b5581"
}
*/
async function sign_in(req, res) {
    try {
        const { firstName, password } = req.body
        const user = await Users.findOne({ firstName })
        console.log(user)
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            res.send("contaseña incorrecta").status(400);
        }
        generarJWT(user._id)
            .then((x) => {
                res.header('x-token', x).send(`si exite el usuario: ${x}`);
            })
    }
    catch (e) {
        console.log(e)
    }
}

export default sign_in