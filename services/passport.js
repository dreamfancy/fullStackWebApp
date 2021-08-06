const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');  
const mongoose = require('mongoose');
const User = mongoose.model('users'); //pull the modal class from mongoose
 
passport.serializeUser((user, done) => {
    done(null, user.id); //Here the user means the user in User collection and id is the db id for records.
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({ //generic register
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true //GoogleStratey will trust all the proxies so http redirect will also be ok.
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if(existingUser) {
        return done(null, existingUser);     
    }
    const user = await new User({googleId: profile.id}).save()
    done(null, user); 
})); 