import express from "express"
import sales from "../controllers/sales.js"

const Router = express.Router()

Router.get("/", () => {
res.json("oña")
console.log("holamimaol")
})
Router.post("/", () => {

})
Router.put("/", () => {

})
Router.delete("/", () => {

})
export {Router};