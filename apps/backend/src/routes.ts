import { Router } from "express";
import CardController from "./controllers/cardController";
import { validateCreditCardMiddleware } from "./middlewares/validateCardMiddleware";

const router = Router();

router.get("/cards", CardController.index);
router.delete("/cards/:id", CardController.delete);
router.post("/cards", validateCreditCardMiddleware, CardController.create);

export default router;
