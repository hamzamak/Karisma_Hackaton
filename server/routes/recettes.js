import express from "express";

import { createRecette, deleteRecetteById , getRecetteByUserId ,updateRecette} from "../controllers/recettes.js";
import auth from "../middleware/auth.js";

const router = express.Router();
 
router.get('/fatch_all',auth, getRecetteByUserId)

router.delete('/delete/:id',auth, deleteRecetteById );

router.put('/update',auth, updateRecette );

router.post('/add',auth, createRecette );

export default router 