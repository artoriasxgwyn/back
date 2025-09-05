import expres from "express";
import {sign_up,getUsers} from "../controllers/sign_up.js"
const router = expres()

router.get("/",(req,res)=>{
    res.send("hola desde sign up")
});
router.post("/",sign_up)

export default router;