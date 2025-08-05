import Users from "../models/sign_up.js"
import { generarJWT } from "../middlewares/JWT.js"

async function sign_up(req, res) {
    try {
        //  let { user, password } = req.body
        let user = "johann"
        let password = "johann"
        const BD = new Users({ user, password });
        console.log(Users)
        await BD.save()
        generarJWT(password)
            .then((x) => {
                console.log(x)
                res.send(x)
            })

    } catch (error) {
        res.send("error").status(400)
        console.log(error)
    }

}
export default sign_up