import dotenv from 'dotenv';
dotenv.config();



// config/passport.js or auth/passport.js
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import {User} from '../models/user.model.js';


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ githubId: profile.id });

    if (!user) {
      // If not, create a new user
      user = await User.create({
        username: profile.username,
        email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
        githubId: profile.id
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user ID into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user by ID from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
