import express from "express"
import clients from "../controllers/clients.js"
import {validar} from "../middlewares/JWT.js"

const Router = express()

Router.get("/:id",validar,clients.getClient)

Router.get("/",clients.getAllClients)

Router.post("/",clients.createClient)

Router.put("/:id", clients.ModifyClient)

Router.delete("/:id", clients.deleteClient)

export default Router ;