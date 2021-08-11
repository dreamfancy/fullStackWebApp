const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const testAsync = require('../services/testService');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });        
        res.send(surveys); 
    });

    app.get('/api/surveys/:surveyId/thanks/yes', (req, res) => {
        res.send('Thanks for voting. Appreciating your love!');
    });
    app.get('/api/surveys/:surveyId/thanks/no', (req, res) => {
        res.send('Thanks for voting. We will improve our service!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log("webhook connected");
        const p = new Path('/api/surveys/:surveyId/thanks/:choice'); 
        
        // const events = _.map(req.body, event => {
        //     if(event.url) {
        //         const match = p.test(new URL(event.url).pathname); //match will be null if any of the variables cannot be extracted 
        //         if (match) {
        //             return { ...match, email: event.email };
        //         } 
        //     }
        // });
        // const compactEvents = _.compact(events);
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        const events = _.chain(req.body)
            .map( event => {
                if(event.url) {
                    const match = p.test(new URL(event.url).pathname); //match will be null if any of the variables cannot be extracted 
                    console.log(match);
                    if (match) {
                        console.log ({ ...match, email: event.email });
                        return { ...match, email: event.email };
                    } 
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(event => {
                Survey.updateOne({
                    _id: event.surveyId,
                    recipients: {
                        $elemMatch: { email: event.email, responded: false }
                    }
                }, {
                    $inc: {[event.choice]: 1},
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        console.log(events);
        res.send("received");
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
        console.log("Survey Created ", survey);
        try {
            mailer(survey, surveyTemplate(survey));
            //console.log("log outside 1");
            //await testAsync();
            await survey.save();
            //console.log("log outside 2");
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);             
        } catch(error) {
            res.send(error);
        }
    }); 
};