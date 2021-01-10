import { Router } from 'express';
import authRouter from './authRouter';
import groups from './groups/groups';
import players from './players/players';
import crawler from './crawler/crawler';
import games from './games/games';
import teams from './teams/teams';
import leagues from './leagues/leagues';

const routes = Router()

routes.use(authRouter)
routes.use('/groups', groups);
routes.use('/players', players);
routes.use('/games', games);
routes.use('/teams', teams);
routes.use('/crawler', crawler);
routes.use('/leagues', leagues);

export default routes