import passport from 'passport'
import { Router } from 'express';

const authRouter = Router()

authRouter.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

authRouter.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

authRouter.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

authRouter.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

export default authRouter;