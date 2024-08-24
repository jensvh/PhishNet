if (phishnet.debug) console.log('all_mail_rules.js loaded');

phishnet.all_mail_score_functions = [];

/*
phishnet.all_mail_score_functions.push(function example_func(mails) {
    return;
});
*/

phishnet.all_mail_score_functions.push(function domain_frequency_score(mails) {
    // Count the frequency of each domain
    var domain_frequency = {};
    mails.forEach(function(mail) {
        var domain = mail.fromEmail.split('@')[1];
        domain = domain.split('.').slice(-2).join('.');
        if (domain in domain_frequency) {
            domain_frequency[domain] += 1;
        } else {
            domain_frequency[domain] = 1;
        }
    });

    // Calculate the score for each mail
    mails.forEach(function(mail) {
        var domain = mail.fromEmail.split('@')[1];
        domain = domain.split('.').slice(-2).join('.');
        mail.score *= domain in domain_frequency ? 1 : 0.8;
    });
});