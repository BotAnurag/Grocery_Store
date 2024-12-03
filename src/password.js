import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { User } from "./models/user.model.js";

import { ApiResponse } from "./utils/Apiresponse.js";

import dotenv from "dotenv";
import { name } from "ejs";

dotenv.config();

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID, // Client ID from your .env file
      clientSecret: process.env.CLIENT_SECRET, // Client Secret from your .env file
      callbackURL: "http://localhost:8000/api/v1/users/google/callback", // Your callback URL
      passReqToCallback: true, // Allows the request object to be passed into the callback
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // Here, you typically find or create a user in the database
      try {
        console.log("Email Information:", profile.emails[0].value);
        console.log("name", profile.displayName);

        const userinfo = {
          email: profile.emails[0].value,
          name: profile.displayName,
        };
        req.info = userinfo;
        // For now, we'll just return the profile as is
        done(null, profile);
      } catch (err) {
        done(err, false); // In case of error
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});
export default passport;
