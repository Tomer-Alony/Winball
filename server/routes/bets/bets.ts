import { Router } from 'express';
import { model, Model } from 'mongoose';
import {IBets, IGroup} from '../../models';

const router = Router();
const Groups: Model<IGroup> = model('Groups');
const Bets: Model<IBets> = model('Bets');

router.get('/', async (req, res) => {
    const bets = await Bets.find({});
    res.json(bets);
});

router.get('/:groupId', async (req, res) => {
    const groupBets = await Groups.findOne({
        _id: req.params.groupId
    }) as IGroup;

    res.json(groupBets.userBets);
});

export default router;