import { Router } from 'express';
import authRouter from './authRouter'

const routes = Router()


routes.get('/', (req, res) => {
    res.send("hi");
})

routes.use(authRouter)

export default routes