import express from "express"
import mongoose from "mongoose"
import "dotenv/config"

const app = express()

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