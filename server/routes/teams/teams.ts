import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const Teams = mongoose.model('Teams');

router.get('/', async (req, res) => {
    const teams = await Teams.find({}); 
    res.json(teams);
});

export default router;