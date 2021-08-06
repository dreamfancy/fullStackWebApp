const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys') ;
const { json } = require('body-parser');
const { reset } = require('nodemon');
require("./models/User");
require("./models/Survey");
require("./services/passport"); //Just make sure it is running
  
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,    
});

const app = express(); 

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    //Express will serve up production assets, including main.js, main.css
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));

    //Express will serve up index.html if it does not recognize any routes above, including express route and static react routes
    app.get('*', (req, res) => {
        console.log(path.resolve(__dirname,'client', 'build', 'index.html'));
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);     