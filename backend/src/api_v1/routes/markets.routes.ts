import { Router } from 'express';
import { MarketController } from '../controllers/markets.controller';


const router = Router();

router.get("/markets", MarketController.getMarkets);
router.get("/:id", MarketController.getCoin);

export default router;
