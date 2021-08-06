const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const testAsync = require('../services/testService');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks/yes', (req, res) => {
        res.send('Thanks for voting. Appreciating your love!');
    });
    app.get('/api/surveys/thanks/no', (req, res) => {
        res.send('Thanks for voting. We will improve our service!');
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;           
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        console.log(survey);
        try {
            mailer(survey, surveyTemplate(survey));
            //console.log("log outside 1");
            //await testAsync();
            await survey.save();
            //console.log("log outside 2");
            req.user.credits -=1;
            const user = await req.user.save();
            res.send(user);             
        } catch(error) {
            res.send(error);
        }
    }); 
};