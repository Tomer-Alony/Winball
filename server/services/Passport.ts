import passport from 'passport'
import mongoose from 'mongoose';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/dev.js');

const User = mongoose.model('users');

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user: any) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (_accessToken: any, _refreshToken: any, profile: { id: any; }, done: (arg0: null, arg1: any) => void) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await new User({ googleId: profile.id }).save();
      done(null, newUser);
    }
  )
);