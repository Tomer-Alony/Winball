import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const Games = mongoose.model('Games');

router.get('/', async (req, res) => {
    const games = await Games.find({}); 
    res.json(games);
});

export default router;