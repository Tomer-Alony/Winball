import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const Group = mongoose.model('Groups');
const GroupUser = mongoose.model('GroupUser');

router.get('/all', async (req, res) => {
    const groups = await Group.find({}); 
    res.json(groups);
});

export default router;