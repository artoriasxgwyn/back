import {sign_up,getUsers} from "../controllers/sign_up.js"
import express from "express"

const router= express()

router.get("/",sign_up)
router.get("/users",getUsers)

export default router
