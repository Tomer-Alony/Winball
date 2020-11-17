import express, {Application} from 'express'
import routes from './routes'
import passport from 'passport'
import './models'
import './services/Passport'

import Connect from './db/mongoose'

const cookieSession = require('cookie-session')
const keys = require('./config/dev');

const app: Application = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
  
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());

const db = keys.mongoURI;
Connect({ db })

app.use(routes);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is listening at ${port}`)
})