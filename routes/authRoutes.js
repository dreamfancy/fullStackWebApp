const passport = require('passport');

module.exports = app => {
    // app.get('/', (req, res) => {
    //     res.send({ hi: 'there' });
    // });
    app.get('/auth/google', passport.authenticate('google', { //here google means google strategy
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    ); //here passport can see the query string code in URL so it knows what is the next step: turn the code to an user profile

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
    //Based on cookie, passport middleware will attach the user modal object for every req coming in
};
