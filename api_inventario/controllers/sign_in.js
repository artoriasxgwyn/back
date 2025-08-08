import Users from "../models/users.js"
import bcrypt from "bcryptjs";
import { generarJWT } from "../middlewares/JWT.js"

async function sign_in(req, res) {
    const { UserName, Password } = req.body
    const user = await Users.findOne({ UserName })
    try {
        const validPassword = bcrypt.compareSync(Password, user.Password);
        if (!validPassword) {
            res.send("no exite el usuario")
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