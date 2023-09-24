import { Router } from 'express';
import {
  getAllRepoCommits,
  getAllCollaborators,
  calculateBusFactor
} from '../controllers/gitHub.controller';

const router = Router();
// console.log('router:', router);

// router.get('/commits', getAllRepoCommits);
router.get('/collaborators', getAllCollaborators);
router.get('/busfactor', calculateBusFactor);

export default router;
