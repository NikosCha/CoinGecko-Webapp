import { Request, Response, Router } from 'express';

import marketRoute from './routes/markets.routes';

const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
  res.send({ check: 'server started ok' })
);

router.use(
  ['/coins',],
  marketRoute
);

export default router;
