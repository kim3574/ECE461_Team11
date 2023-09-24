import { Router } from 'express';
import { calculateBusFactor } from '../controllers/gitHub.controller';

const router = Router();
// console.log('router:', router);

router.get('/busfactor', calculateBusFactor);

export default router;
