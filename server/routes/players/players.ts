import { Router } from 'express';
import { model, Model, Types } from 'mongoose';
import { IUser } from '../../models/User';

const router = Router();
const Users: Model<IUser> = model('Users');

router.post('/', async (req, res) => {
    const { playersIds } = req.body;
    const playersObjectIds = playersIds.map(playerId => {
        return Types.ObjectId(playerId);
    });

    Users.find({
        '_id': {
            $in:
                playersObjectIds
        }
    }).exec(async (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.status(200).send(result);
        }
    });
})

router.get('/all', async (req, res) => {
    Users.find({}).exec(async (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send('an error occured while trying to query all users');
        }
        else {
            res.json(result);
        }
    });
})

export default router;