import Router from "express"
import * as myModule from "../controllers/expert2.js";
import { deleteResponse, getHistorial, getCategoriasId , putCategoriasId, postExpert2 ,deleteHistorial} from "../controllers/expert2.js"

const router = Router()

router.get("/", myModule.getHistorial )

router.get("/:id",getCategoriasId)

router.post("/",myModule.postExpert2)

router.put("/:id",putCategoriasId)

router.delete("/",deleteHistorial)

router.delete("/:id",myModule.deleteResponse)

export default router