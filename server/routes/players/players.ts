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