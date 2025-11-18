import Users from "../models/users.js"
import bcrypt from "bcryptjs";
import { generarJWT } from "../middlewares/JWT.js"

/*
{
 "firstName":"elian",
  "password":"ryomen445"
}
*/
async function sign_in(req, res) {
    try {
        const { firstName, password } = req.body
        const user = await Users.findOne({ firstName })
        if (user === null) {
            res.send("usuario no exite").status(400);
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            res.send("contaseña incorrecta").status(400);
        }
        generarJWT(user._id)
            .then((x) => {
                res.send(`si exite el usuario: ${x}`);
            })
    }
    catch (e) {
        console.log(e)
        res.json(e)
    }
}

export default sign_in;