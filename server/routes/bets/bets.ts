import { Router } from 'express';
import { model, Model } from 'mongoose';
import {IBet, IGames, IGroup, IUser} from '../../models';

const router = Router();
const Groups: Model<IGroup> = model('Groups');
const Bets: Model<IBet> = model('Bets');
const Games: Model<IGames> = model('Games');

router.get('/', async (req, res) => {
    const bets = await Bets.find({});
    res.json(bets);
});

router.get('/:groupId', async (req, res) => {
    const groupBets = await Groups.findOne({
        _id: req.params.groupId
    }) as IGroup;

    const bets = groupBets?.userBets;
    const gamesIds = bets?.map(b => b.gameId);

    const gamesData = await Games.find({ _id: { $in : gamesIds }}).exec();
    const games = (gamesData)?.reduce((obj, cur) => {
        return {
            ...obj,
            [cur._id]: {
                ...(cur as any)._doc
            }
        }
    }, {})

    res.json({ bets, games });
});

export default router;