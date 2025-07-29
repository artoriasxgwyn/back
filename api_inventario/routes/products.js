import express from "express"
import product from "../controllers/products.js"
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
export default Router