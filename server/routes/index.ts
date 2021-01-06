import { Router } from 'express';
import authRouter from './authRouter';
import groups from './groups/groups';
import players from './players/players';
import crawler from './crawler/crawler';

const routes = Router()

routes.use(authRouter)
routes.use('/groups', groups);
routes.use('/players', players);
routes.use('/crawler', crawler);

export default routes