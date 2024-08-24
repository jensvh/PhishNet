if (phishnet.debug) console.log('single_mail_rules.js loaded');

phishnet.single_mail_score_functions = [];

/*
phishnet.single_mail_score_functions.push(function example_func(subject, fromName, fromMail, body, date, attachment) {
    return 1;
});
*/

phishnet.single_mail_score_functions.push(function sender_score(subject, fromName, fromMail, body, date, attachment) {
    const username = fromMail.split('@')[0];
    const domain = fromMail.split('@')[1];
    const subdomains = domain.split('.').slice(0, -1).join(' ');
    const fromNameParts = fromName.split(' ');

    /* If any of the fromName parts is in the username, return 1, otherwise return 0.8 */
    for (let i = 0; i < fromNameParts.length; i++) {
        if (username.includes(fromNameParts[i]) || fromNameParts[i].includes(username) || subdomains.includes(fromNameParts[i])) {
            return 1;
        }
    }
    return 0.95;
});

phishnet.single_mail_score_functions.push(function attachment_score(subject, fromName, fromMail, body, date, attachment) {
    if (attachment) {
        return attachment.endsWith('.pdf') ? 0.8 : 0.6;
    }
    return 1;
});

phishnet.single_mail_score_functions.push(function tld_score(subject, fromName, fromMail, body, date, attachment) {
    const domain = fromMail.split('@')[1];
    const tld = domain.split('.').pop();
    return tld === 'com' || tld === 'org' || tld === 'net' || tld === 'be' ? 1 : 0.95; // TODO: Add regional TLDs that can be changed depending on the user's location
});

phishnet.single_mail_score_functions.push(function domain_score(subject, fromName, fromMail, body, date, attachment) {
    var domain = fromMail.split('@')[1];
    domain = domain.split('.').slice(-2).join('.');
    return domain === 'gmail.com' || domain === 'yahoo.com'
        || domain === 'hotmail.com' || domain === 'outlook.com'
        || domain === 'google.com' || domain === 'microsoft.com'
        || domain === 'spotify.com' || domain === 'apple.com'
        || domain === 'amazon.com' || domain === 'facebook.com'
        || domain === 'twitter.com' || domain === 'linkedin.com'
        || domain === 'instagram.com' || domain === 'snapchat.com'
        ? 1 : 0.97;
});