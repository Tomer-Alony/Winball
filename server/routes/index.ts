import { Router } from 'express';
import authRouter from './authRouter';
import groups from './groups/groups';
import players from './players/players';

const routes = Router()

routes.use(authRouter)
routes.use('/groups', groups);
routes.use('/players', players);

export default routes