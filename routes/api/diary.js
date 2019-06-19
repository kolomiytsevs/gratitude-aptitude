const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../../models/user')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const secret = 'harrypotter'

module.exports = function(app, passport) {

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }))



    app.use(passport.initialize())
    app.use(passport.session())
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }))

    // Serialize users once logged in   
    passport.serializeUser(function(user, done) {
        // Check if the user has an active account
        if (user.active) {
            // Check if user's social media account has an error
            if (user.error) {
                token = 'unconfirmed/error' // Set url to different error page
            } else {
                token = jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h' }) // If account active, give user token
            }
        } else {
            token = 'inactive/error' // If account not active, provide invalid token foruse in redirecting later
        }
        done(null, user.id); // Return user object
    })

    // Deserialize Users once logged out    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user); // Complete deserializeUser and return done
        })
    })

    // Google Strategy  
    passport.use(new GoogleStrategy({
        clientID: '852222686887-ld3cnfu1g76lpi0bgrmpbr37css6c3o0.apps.googleusercontent.com', // Replace with your Google Developer App client ID
        clientSecret: 'j-k8frTBw-6u-De6vPqk3uSI', // Replace with your Google Developer App client ID
        callbackURL: "http://www.herokutestapp3z24.com/auth/google/callback" // Replace with your Google Developer App callback URL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ email: profile.emails[0].value }).select('username active password email').exec(function(err, user) {
                if (err) done(err);

                if (user && user !== null) {
                    done(null, user);
                } else {
                    done(err);
                }
                });
        }
    ));

    // Google Routes    
    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/  auth/plus.login', 'profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/  googleerror' }), function(req, res) {
        res.redirect('/google/' + token); // Redirect user with newly assigned token
    });

}