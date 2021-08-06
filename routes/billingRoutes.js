const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        if(!req.user) {
            return res.status(401).send({ error: 'You must log in !' }); //Unauthorized. Here return is ok just to end the execution
        }
        const clientReqBody = req.body;
        const charge = await stripe.charges.create({
            amount: 500, //This is not getting from front end, but a confirming
            currency: 'usd',
            source: clientReqBody.id,
            description: "Server side final charge 5 dollar"
        });
        req.user.credits += 5;
        const user = await req.user.save(); //the return is to update the userModal
        res.send(user);  
    });
};

