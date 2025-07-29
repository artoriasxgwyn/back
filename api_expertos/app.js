import express from "express";
import mongoose from "mongoose";
import expert1 from "./routes/expert1.js"
import expert2 from "./routes/expert2.js"
import cors from "cors";



import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/expert1",expert1)
app.use("/api/expert2",expert2)
app.use(express.static("public"))

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);

try{
 mongoose
    .connect("mongodb://127.0.0.1:27017/adso076")
    .then(() => console.log("BD Connected!"));
}catch(e){
  console.log(e)
} 
});