import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const League = mongoose.model('Leagues');

router.get('/', async (req, res) => {
    const groups = await League.find({}); 
    res.json(groups);
});

export default router;