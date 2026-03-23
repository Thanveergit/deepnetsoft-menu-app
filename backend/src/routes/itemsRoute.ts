import { Router } from "express";
import { getItemsByMenu,createItems, deleteItem } from "../controller/itemController";

const router = Router();

router.get('/', getItemsByMenu);
router.post('/', createItems);
router.delete('/:id',deleteItem)

export default router;