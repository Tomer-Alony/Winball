import passport from 'passport'
import mongoose from 'mongoose';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/dev.js');

const User = mongoose.model('Users');

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
    async (_accessToken: any, _refreshToken: any, profile: any, done: (arg0: null, arg1: any) => void) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await new User({ googleId: profile.id, displayName: profile.displayName, picture: profile.photos[0].value}).save();
      console.log('Added new user: ' + profile.displayName);
      done(null, newUser);
    }
  )
);