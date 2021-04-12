import express, {Application} from 'express'
import './models'
import routes from './routes'
import passport from 'passport'
import './services/Passport'
import Connect from './db/mongoose'
import authRouter from './routes/authRouter'
import io from './services/Socket'
import { scoresSchedule } from './services/ScoresUpdater';

const cookieSession = require('cookie-session')
const keys = require('./config/dev');

const app: Application = express();

var cors = require('cors')

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
  
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());
app.use(cors());

const db = keys.mongoURI;
Connect({ db })

app.use('/api', routes);
app.use('/auth', authRouter);

const port = process.env.PORT || 8000
const server = app.listen(port, () => {
    console.log(`Server is listening at ${port}`)
})

scoresSchedule()
io(server);