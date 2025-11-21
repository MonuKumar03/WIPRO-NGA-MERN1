// in this file we will create a server using express framework along with routes and passport based authentication
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // for local username-password authentication

const app = express(); // create an express application
const PORT = 3000;      // port number where server will listen
app.use(bodyParser.urlencoded({ extended: false })); // to parse form data

// configure session middleware
app.use(session({
    secret: 'your_secret_key',  // secret key for signing the session ID cookie
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize()); // initialize passport middleware
app.use(passport.session()); // configure passport to use sessions
// Dummy user data for demonstration in the form of an array of user objects
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];
// configure passport local strategy
passport.use(new LocalStrategy(
    function(username, password, done) {    
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            return done(null, user);    
        } else {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
    }
));

// serialize user into the sessions  as it is required for persistent login sessions we will use passport.serializeUser for this
//serilaize user to decide which key is to be kept in the session store and hence it helps in identifying the user in future requests
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
// deserialize user from the sessions as it is required for persistent login sessions we will use passport.deserializeUser for this
passport.deserializeUser(function(id, done) {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// route for home page
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/login">Login</a>');
});
// route for login page
app.get('/login', (req, res) => {
    res.send(`  a<h1>Login Page</h1>
        <form method="post" action="/login">
            <div>   
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    `);
});

    // route for handling login POST request
app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);
// route for logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
}); 

// protecting Routes Middleware function to check if user is authenticated optinal 
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Above code can be implemented susing below steps :
// 1. Set up an Express server.
// 2. Configure body-parser to parse form data.
// 3. Set up express-session for session management.    
// 4. Configure Passport.js with a local strategy for username-password authentication.
// 5. Create routes for login, logout, and a protected home page.
// 6. Use middleware to protect routes that require authentication.
// 7. Start the server and listen on a specified port.
