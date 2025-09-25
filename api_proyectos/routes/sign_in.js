import express from "express";
import { body, validationResult } from "express-validator";
import  sign_in  from "../controllers/sign_in.js";


const router = express.Router();
function look(req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).send("hola?");
    }
    next()
}
const validations = [
  body("firstName").notEmpty(),
  body("password").notEmpty()
];
router.post("/",validations,look,sign_in);

export default router;
