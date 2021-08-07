const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    const invalidEmails = emails.split(',')
        .map(email => email.trim())
        .filter(email => {
            return re.test(email) === false //based on return true of false, it will decide if to leave this email
        });

    if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    } 
    
    return;
} 