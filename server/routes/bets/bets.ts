import { Router } from 'express';
import { model, Model, Types } from 'mongoose';
import {IBet, IGames, IGroup, IUser} from '../../models';

const router = Router();
const Groups: Model<IGroup> = model('Groups');
const Bet: Model<IBet> = model('Bet');
const Games: Model<IGames> = model('Games');
const perPage = 5;

router.get('/', async (req, res) => {
    const bets = await Bet.find({});
    res.json(bets);
});

router.get('/:groupId/:page', async (req, res) => {
    const groupBets = await Groups.findOne({
        _id: req.params.groupId
    }) as IGroup;

    const page: number = parseInt(req.params.page) || 0;

    const bets = groupBets?.userBets?.slice(page * perPage, (page + 1) * perPage);
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

router.get('/userBets/:userId', async (req, res) => {
    var userBets: IBet[] = [];
    const groups = await Groups.find({});
    const userGroups: IGroup[] = groups.filter((group: IGroup) => 
        group.players.findIndex(player => 
            player.playerId.toString() == req.params.userId) != -1)
    userGroups.map((userGroup: IGroup) => {
        userGroup.userBets.map((bet: IBet) => {
            if (bet.playerId == req.params.userId) {
                userBets.push(bet);
            }
        })
    })

    res.json({userBets});
});

export default router;