import { Router } from 'express';
import { model, Model, Types } from 'mongoose';
import { IUser } from '../../models/User';
import { IGroup } from '../../models/Group';
import { IGroupUser } from '../../models/GroupUser';

const router = Router();
const Group: Model<IGroup> = model('Groups');
const Users: Model<IUser> = model('Users');
const GroupUser: Model<IGroupUser> = model('GroupUser');

const parsePlayerScore = (playerId) => {
    return {
        playerId: Types.ObjectId(playerId),
        bullseye: 0,
        points: 0,
        side: 0,
        games: 0
    }
}

router.get('/all', async (req, res) => {
    if (!req.user) {
        Group.find({
        }).exec(async (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(500).send('an error occured while trying to query users');
            }
            else {
                res.json(result);
            }
        });

    } else {
        // @ts-ignore
        const loggedUser = await Users.find({ googleId: req.user.googleId });
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
                const resp = result.map((group) => {
                    return Object.assign(group.toJSON(),
                        {
                            'isManager': group.get('manager_id') ===
                                loggedUser[0]._id.toString()
                        });
                });
                res.json(resp);
            }
        });
    }
});

router.put('/add', async (req, res) => {
    var { newGroup } = req.body

    newGroup.players = newGroup.players.map((player) => {
        return parsePlayerScore(player);
    });

    newGroup.leaguesIds = newGroup.leaguesIds.map((league) => {
        return Types.ObjectId(league)
    })

    const newGroupResponse = await Group.create(newGroup)
    await newGroupResponse.save()
    if (newGroupResponse) {
        res.json(newGroupResponse);
    } else {
        res.send('500').send('an error occured while tryign to add a new group');
    }
})

router.put('/', async (req, res) => {
    var { updatedGroup } = req.body;

    const result: IGroup = await Group.findOne({ _id: updatedGroup._id });

    if (!result) {
        res.status(500).send('an error occured while trying to update a group');
    } else {
        try {

            result.players = updatedGroup.players.map(player => {
                player.playerId = Types.ObjectId(player.playerId);
                return player;
            });
            result.name = updatedGroup.name;
            result.description = updatedGroup.description;

            await result.save();

            res.json(result);
        } catch (ex) {
            console.log(ex.message);
            res.status(500).send('an error occured while trying to update group');
        }

    }
});

export default router;