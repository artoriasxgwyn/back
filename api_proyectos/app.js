import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import sign_up from "./routes/sign_up.js"
import sign_in from "./routes/sign_in.js"
import role from "./routes/roles.js"
import user from "./routes/users.js"
import states from './routes/states.js'
import categories from "./routes/categories.js"
import projects from "./routes/projects.js"
const app = express()
app.use(express.json());
app.use("/api/iniciarSesion", sign_in);
app.use("/api/registrarse", sign_up);
app.use("/api/roles", role);
app.use("/api/users", user);
app.use("/api/states", states);
app.use("/api/categories",categories);
app.use("/api/projects",projects);
app.listen(process.env.PORT, () => {
    try {
        console.log(`Ay Dios ${process.env.PORT}`);
        mongoose.connect(`mongodb+srv://userExperts:${process.env.CLAVEMONGO}@boss.61jcsip.mongodb.net/?retryWrites=true&w=majority&appName=BOSS`)
            .then(() => {
                console.log("perdon mami")
            })
    } catch (error) {
        console.log(error)
    }
});
