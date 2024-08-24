// Start when all the content is loaded
phishnet.debug = true;
phishnet.mail_to_debug = -1;
if (phishnet.debug) console.log('injection.js loaded');

// on mails loaded
// waitForElement(phishnet.emails_loaded_query, updateScores);

// on dom change
// var next_mutation_time = 0;
waitForElement(phishnet.mutation_observer_query,function(query, element){
    var observer = new MutationObserver(function(mutations) {
        // if (Date.now() < next_mutation_time) return;
        // next_mutation_time = Date.now() + 1000;

        if (phishnet.debug) { console.log('mutations: ', mutations); }

        if (document.querySelector(phishnet.mail_open_query)) {
            if (phishnet.debug) console.log('mail open');

            // Get all the mail data
            const mail = phishnet.fetch_mail_data();
            
            // Get the mail score
            phishnet.view_mail_rules.forEach(function(rule) {
                mail.score *= rule(mail.email, mail.name, mail.title, mail.bodyElement, mail.bodyText, mail.verified);
            });

            // Show notification with the score
            phishnet.display_mail_notification(mail);

            if (phishnet.debug) console.log('mail score displayed: ', mail.score);

            return;
        }

        updateScores();
    });
    observer.observe(element, { childList: true, subtree: true });
});

// on mail open


function waitForElement(query, callBack){
    window.setTimeout(function(){
        var element = document.querySelector(query);
        if(element){
            callBack(query, element);
        }else{
            waitForElement(query, callBack);
        }
    },500)
}

function updateScores() {
    var mails = phishnet.fetch_mails();

    phishnet.all_mail_score_functions.forEach(function(score_function) {
        score_function(mails);
    });

    mails.forEach(function(mail) {
        phishnet.single_mail_score_functions.forEach(function(score_function) {
            mail.score *= score_function(mail.subjectName, mail.fromName, mail.fromEmail, mail.bodyName, mail.dateName, mail.attachment);
        });

        phishnet.display_score(mail);
    });

    if (phishnet.debug) console.log('mails: ', mails);

    if (phishnet.debug && phishnet.mail_to_debug < mails.length && phishnet.mail_to_debug >= 0) {
        /* Print the x the mail scores */
        const debug_mail = mails[phishnet.mail_to_debug];
        console.log('debug_mail: ', debug_mail);
        phishnet.single_mail_score_functions.forEach(function(score_function) {
            scorrr = score_function(debug_mail.subjectName, debug_mail.fromName, debug_mail.fromEmail, debug_mail.bodyName, debug_mail.dateName, debug_mail.attachment);
            console.log('score_function: ', scorrr);
        });
    }
}