import { Router } from 'express';
import { model, Model } from 'mongoose';
import { ILeague } from '../../models/League';

const router = Router();
const League: Model<ILeague> = model('Leagues');

router.get('/', async (req, res) => {
    const groups = await League.find({});
    res.json(groups);
});

export default router;