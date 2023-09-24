import { Router } from 'express';
import {
  getAllRepoCommits,
  getAllCollaborators,
  calculateBusFactor
} from '../controllers/gitHub.controller';
import { calculateRampUp } from '../controllers/RampUp';

const router = Router();
// console.log('router:', router);

router.get('/busfactor', calculateBusFactor);
router.get('/rampup', calculateRampUp);

export default router;
