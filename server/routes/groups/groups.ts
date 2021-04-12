import { Router } from 'express';
import { MapReduceOptions, model, Model, Types } from 'mongoose';
import { IUser } from '../../models/User';
import { IGroup } from '../../models/Group';
import { Group } from '../../client/src/modles/Group';
import GroupUser, { IGroupUser } from '../../models/GroupUser';
import { EventEmitter } from 'events';
import { emit } from 'process';

const router = Router();
const Group: Model<IGroup> = model('Groups');
const Users: Model<IUser> = model('Users');

const parsePlayerScore = (playerId) => {
    return {
        playerId: Types.ObjectId(playerId),
        bullseye: 0,
        points: 0,
        side: 0,
        games: 0
    }
}

// // Map Reduce Part - Not working on CLOUD CLUSTER MONGODB
// router.get('/getTotalPointsPerUser', async (req, res) => {
//     var options: MapReduceOptions<IGroupUser, string, number> = {
//         map: function() {
//             emit(this.playerId, this.score)
//         },
//         reduce: function (_keyPlayerId, valuesScores) {
//             // Returns some of points per player
//             return valuesScores.map(player => player.score).reduce((a, b) => a + b, 0);
//         }
//     };

//     GroupUser.mapReduce<String, number>(
//         options, (err, results) => {
//             if (err) 
//                 console.log(err);
//             return results;
//         }
//     );
// });

// Group By Part
router.get('/groupsCountPerManager', async (req, res) => {
    Group.aggregate(
        [
            {
                $group: {
                    _id: "$manager_id",
                    groupsCount: {
                        $sum: 1
                    }
                }
            }
        ],
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    )
});

router.get('/all', async (req, res) => {

    // console.warn(`name: ${req.query.name}, desc: ${req.query.desc}, isCommander: ${req.query.commander}, `)
    const conditions = { } as any;
    if (req.query.name) {
        conditions.name = { '$regex': req.query.name, "$options": "ig" };
    }
    if (req.query.desc) {
        conditions.description = { '$regex': req.query.desc, "$options": "ig" };
    }
    // console.warn(conditions)

    if (!req.user) {
        Group.find(...conditions).exec(async (err, result) => {
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
        await Group.find({
            ...conditions,
            'players':
            {
                $elemMatch:
                    { playerId: loggedUser[0]._id }
            }
        }).exec(async (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(500).send('an error occured while trying to query users');
            } else {
                console.log(req.query.commander)
                const manager = req.query.commander && req.query.commander === "true";
                const resp = result.map((group) => {
                    return Object.assign(group.toJSON(),
                        {
                            'isManager': group.get('manager_id') ===
                                loggedUser[0]._id.toString()
                        });
                }).filter(g => req.query.commander !== undefined ?
                    (g.isManager && manager) ||
                    (!g.isManager && !manager)
                    : true);
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