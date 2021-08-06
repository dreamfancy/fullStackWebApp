const sendGrid = require('sendgrid');
const helper = sendGrid.mail; // We can also only import mail here by saying require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer extends helper.Mail {   
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendGrid(keys.sendGridKey);
        this.from_email = new helper.Email('chaoyangfan@gmail.com'); 
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body); 
        this.addClickTracking();
        this.addRecipient();
    }

    formatAddresses(recipients) {
        //return recipients.reduce((finalString, cur) => (finalString + cur.email.trim()), "");
        return recipients.map(({ email }) => {
            return new helper.Email(email); //Just for formating the email 
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true); 

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipient() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            mothod: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON() //this toJSON is also defined by Mail base class
        });
        
        try {
            const response = await this.sgApi.API(request);
            //console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
} 

module.exports = Mailer;