require ('dotenv').config();

const express = require ('express');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const mongodb = require('./data/database');
const cors = require ('cors');
const passport = require ('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

app.use(session ({
    secret: "secret",
    resave: false,
    saveUninitialized: true
})),

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({origin: '*'}))

app.use("/", require("./routes/index.js"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));


passport.serializeUser((user, done) => {
    done(null, user);  
});


passport.deserializeUser((user, done) => {    
    done(null, user); 
});


app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? 
        `Logged in as ${req.session.user.displayName}` : "Logged out");
});


app.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/api-docs'}), 
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

mongodb.initDb((error) => {
    if (error) {
        console.log(error);
    } else {
        app.listen(port, () => {
            console.log(`Database is connected, and server is running on port ${port}`);
        });
    }
});
