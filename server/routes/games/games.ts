import { Router } from 'express';
import { model, Model } from 'mongoose';
import { IGames } from '../../models';

const router = Router();
const Games: Model<IGames> = model('Games');

router.get('/', async (req, res) => {
    const games = await Games.find({});
    res.json(games);
});

export default router;