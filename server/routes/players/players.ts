import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const Users = mongoose.model('Users');

router.post('/', async (req, res) => {
    const { playersIds } = req.body;
    const playersObjectIds = playersIds.map(playerId => {
        return mongoose.Types.ObjectId(playerId);
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

export default router;