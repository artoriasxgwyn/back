import express from "express";
import { body, validationResult, matchedData } from "express-validator";
import  sign_in  from "../controllers/sign_in.js";


const router = express.Router();
function look(req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    next()
}
const validations = [
  body("firstName").notEmpty().escape(),
  body("password").notEmpty().escape()
];
router.post("/",validations,look,sign_in);

export default router;
