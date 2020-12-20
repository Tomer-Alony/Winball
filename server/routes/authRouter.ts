import passport from 'passport'
import { Router } from 'express';

const authRouter = Router()

authRouter.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

authRouter.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

authRouter.get('/current_user', (req, res) => {
    res.send(req.user);
});

export default authRouter;