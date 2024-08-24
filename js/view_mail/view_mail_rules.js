phishnet.view_mail_rules = [];

/*
phishnet.view_mail_rules.push(function example_func(email, name, title, bodyElement, bodyText, verified) {
    return 1;
});
*/

phishnet.view_mail_rules.push(function wrong_unsubscribe_button(email, name, title, bodyElement, bodyText, verified) {
    // Get all the url elements in the body
    var urlElements = bodyElement.querySelectorAll('a');
    // Check if any of these urls contain the word 'unsubscribe' or a translation of it
    const unsubscribe_words = ['unsubscribe', 'afmelden', 'uitschrijven', 'meld je hier af']

    for (let i = 0; i < urlElements.length; i++) {
        for (let j = 0; j < unsubscribe_words.length; j++) {
            if (urlElements[i].innerText.toLowerCase().includes(unsubscribe_words[j])) {
                // Check if the url's domain is the same as the sender's domain
                const senderDomain = email.split('@')[1].split('.').slice(-2).join('.');
                const urlDomain = urlElements[i].href.split('/')[2].split('.').slice(-2).join('.');
                if (senderDomain !== urlDomain) {
                    console.log('unsubscribe button is incorrect', senderDomain, urlDomain);
                    return 0;
                } else {
                    console.log('unsubscribe button is correct', senderDomain, urlDomain);
                }
            }
        }
    }
    return 1;
});

/*
    
    // Get all urls in the body
    mail.urlElements = [];
    var urls = bodyElement.querySelectorAll('a');
    urls.forEach(function(url) {
        mail.urlElements.push(url);
    });

    // Get an indication of how many html is used in the body, by looking at the image count that have a unique style
    mail.imageCount = bodyElement.querySelectorAll('img[style]').length;

*/