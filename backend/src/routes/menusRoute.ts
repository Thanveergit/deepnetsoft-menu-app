import { Router } from "express";
import { getAllMenus,createMenu, deletMenus } from "../controller/menuController";

const router = Router()

router.get('/',getAllMenus);
router.post('/',createMenu);
router.delete('/:id',deletMenus)

export default router;