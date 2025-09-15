import Users from "../models/users.js"
import { generarJWT } from "../middlewares/JWT.js"
import bcrypt from "bcryptjs"
/*
{
    "firstName":"johann",
    "lastName":"Silva",
    "email":"johannsilvamendez@gmail.com",
    "password":"ryomen445",
    "avatar":"xdxexo",
    "phone":"3213635730",
    "isActive":true,
    "isEmailVerified":true,
    "globalRole":"68bc9567b90574defd8b5581"
}
*/
async function sign_up(req, res) {
    try {
        let { firstName, lastName, email, password, avatar, phone, globalRole, isActive, isEmailVerified } = req.body
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt)
        const user = new Users({ firstName, lastName, email, password, avatar, phone, globalRole, isActive, isEmailVerified });
        await user.save()
        generarJWT(user._id)
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