import Router from "express"
import { deleteResponse, getHistorial, getCategoriasId , putCategoriasId, postExpert2 ,deleteHistorial} from "../controllers/expert2.js"

const router = Router()

router.get("/", getHistorial )

router.get("/:id",getCategoriasId)

router.post("/",postExpert2)

router.put("/:id",putCategoriasId)

router.delete("/",deleteHistorial)

router.delete("/:id",deleteResponse)

export default router