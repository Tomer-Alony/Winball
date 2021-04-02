import { Router } from 'express';
import { model, Model } from 'mongoose';
import {IBet, IGames, IGroup, IUser} from '../../models';

const router = Router();
const Groups: Model<IGroup> = model('Groups');
const Bet: Model<IBet> = model('Bet');
const Games: Model<IGames> = model('Games');

router.get('/', async (req, res) => {
    const bets = await Bet.find({});
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

router.post('/addBet', async (req, res) => {
    const doc = new Bet({gameId: req.body.bet.gameId, 
                          playerId: req.body.bet.playerId,
                          bet: req.body.bet.bet,
                          playerName: req.body.playerName})
    doc.save();
});

export default router;