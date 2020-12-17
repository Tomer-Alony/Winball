import { Router } from 'express';
import authRouter from './authRouter'

const routes = Router()

routes.use(authRouter)

export default routes