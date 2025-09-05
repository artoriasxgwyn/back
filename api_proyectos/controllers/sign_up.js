import Users from "../models/users.js"
import { generarJWT } from "../middlewares/JWT.js"
import bcrypt from "bcryptjs"

async function sign_up(req, res) {
    try {
        let { firstName, lastName, email, password, avatar, phone, globalRole, isActive, isEmailVerified, lastLogin, createdAt, updateAt } = req.body
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt)
        const user = new Users({ firstName, lastName, email, password, avatar, phone, globalRole, isActive, isEmailVerified, lastLogin, createdAt, updateAt });
        console.log(UserName)
        await user.save()
        generarJWT(user)
            .then((x) => {
                console.log(x)
                res.send(x)
            })

    } catch (error) {
        res.send("error").status(400)
        console.log(error)
    }

}
async function getUsers(req, res) {
    try {
        const users = await Users.find();
        console.log(users)
        res.json({ users });

    } catch (error) {
        res.send("error").status(400)
        console.log(error)
    }

}
export { sign_up, getUsers } 