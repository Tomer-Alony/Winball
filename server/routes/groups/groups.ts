import { Router } from 'express';
import mongoose from 'mongoose';
import { IGroup } from '../../models/Group';

const router = Router();
const Group = mongoose.model('Groups');
const Users = mongoose.model('Users');
const GroupUser = mongoose.model('GroupUser');

router.get('/all', async (req, res) => {
    // @ts-ignore
    const loggedUser = await Users.find({googleId: req.user.googleId})
    Group.find({
        'players':
        {
            $elemMatch:
                { playerId: loggedUser[0]._id }
        }
    }).exec(async (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send('an error occured while trying to query users');
        }
        else {
            res.json(result);
        }
    });
});

router.put('/add', async (req, res) => {
    var { newGroup } = req.body

    newGroup.players = newGroup.players.map((player) => {
        return {
            playerId: mongoose.Types.ObjectId(player),
            bullseye: 0,
            points: 0,
            side: 0,
            games: 0
        }
    });

    newGroup.leaguesIds = newGroup.leaguesIds.map((league) => {
        return mongoose.Types.ObjectId(league)
    })

    const newGroupResponse = await Group.create(newGroup)
    await newGroupResponse.save()
    if (newGroupResponse) {
        res.json(newGroupResponse);
    } else {
        res.send('500').send('an error occured while tryign to add a new group');
    }
})

export default router;