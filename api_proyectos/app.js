import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import sign_up from "./routes/sign_up.js"
import sign_in from "./routes/sign_in.js"
import role from "./routes/role.js"
import user from "./routes/users.js"

const app = express()
app.use(express.json());
app.use("/api/iniciarSesion",sign_in);
app.use("/api/registrarse",sign_up);
app.use("/api/roles",role);
app.use("/api/users",user);
app.listen(process.env.PORT, () => {
    try {
        console.log(`Ay Dios ${process.env.PORT}`);
        mongoose.connect('mongodb://127.0.0.1/SwaggerBoy')
            .then(() => {
                console.log("hola dios me voy  morir")
            })
    } catch (error) {
        console.log(error)
    }
});