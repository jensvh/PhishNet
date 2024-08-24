// File containing the Gmail bindings
// Create a prefix to avoid conflicts with other scripts, so all parameters are used as follows: phishnet.<parameters>
var phishnet = {}

phishnet.emails_loaded_query = "div.UI tbody";
phishnet.mutation_observer_query = "div.AO";
phishnet.mail_open_query = "div[jsaction][role=main]";

phishnet.fetch_mails = function() {
    var mailArray = [];
    var rootElements = document.querySelectorAll('div.UI tbody');
    if (rootElements.length === 0) return mailArray;

    rootElements.forEach(function(rootElement) {
        var mailElements = rootElement.querySelectorAll('tr');
        if (mailElements.length === 0) return;
        
        mailElements.forEach(function(mailElement) {
            var element_to_display = mailElement.querySelector('div.yW');
            if (element_to_display.querySelector('span.scorerrrrrrrrr')) {
                if (phishnet.debug) console.log('score already displayed.');
                return;
            }

            var fromElement = mailElement.querySelector('td span[email][name]');
            if (!fromElement) {
                if (phishnet.debug) console.warn('fromElement not found for mailElement: ', mailElement);
                return
            }

            var fromName = fromElement.getAttribute('name');
            var fromEmail = fromElement.getAttribute('email');

            var subjectElement = mailElement.querySelector('td span[data-thread-id][data-legacy-thread-id][data-legacy-last-message-id]');
            if (!subjectElement) {
                if (phishnet.debug) console.warn('subjectElement not found for mailElement: ', mailElement);
                return
            }
            var subjectName = subjectElement.innerText;

            var bodyElement = subjectElement.parentElement;
            if (!bodyElement) {
                if (phishnet.debug) console.warn('bodyElement not found for mailElement: ', mailElement);
                return
            }
            var bodyName = bodyElement.lastChild.textContent.replace(/^, /, '').trim();
            var dateName = bodyElement.children[bodyElement.children.length - 1].innerText;

            var fileElement = mailElement.querySelector('td div[title][jsaction][jsname]');
            if (fileElement) {
                var fileName = fileElement.getAttribute('title');
                if (phishnet.debug) console.log('fileName: ', fileName);
            }
            var fileName = fileElement ? fileElement.getAttribute('title').toLowerCase() : null;

            var mail = {
                fromName: fromName.toLowerCase(),
                fromEmail: fromEmail.toLowerCase(),
                subjectName: subjectName.toLowerCase(),
                bodyName: bodyName.toLowerCase(),
                dateName: dateName.toLowerCase(),
                attachment: fileName,
                element: mailElement,
                score: 1.0
            };

            mailArray.push(mail);
        });
    });

    return mailArray;
};

phishnet.display_score = function(mail) {
    var mailElement = mail.element;
    var element_to_display = mailElement.querySelector('div.yW');

    if (element_to_display.querySelector('span.scorerrrrrrrrr')) {
        return;
    }

    element_to_display.style.justifyContent = 'flex-end';
    const children = element_to_display.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.marginRight = 'auto';
    }

    var scoreElement = document.createElement('span');
    scoreElement.className = 'scorerrrrrrrrr';
    scoreElement.innerText = mail.score.toFixed(2);
    scoreElement.style.color = mail.score > 0.8 ? 'green' : mail.score > 0.6 ? 'orange' : 'red';
    element_to_display.appendChild(scoreElement);
};

phishnet.fetch_mail_data = function() {
    var mail = {};

    var mailElement = document.querySelector(phishnet.mail_open_query);
    if (!mailElement) { if (phishnet.debug) console.warn('mailElement not found'); return mail; }

    var fromElement = mailElement.querySelector('span[email][name]');
    mail.email = fromElement.getAttribute('email');
    mail.name = fromElement.getAttribute('name');

    mail.verified = !!mailElement.querySelector('span[role=img]');

    var titleElement = mailElement.querySelector('h2[jsname]');
    mail.title = titleElement.innerText;

    var bodyElement = mailElement.querySelector('div.a3s.aiL');
    mail.bodyElement = bodyElement;
    mail.bodyText = bodyElement.innerText.replace(/\n|\t/g, '');

    mail.score = 1.0;

    return mail;
};

phishnet.display_mail_notification = function(mail) {
    var bodyElement = mail.bodyElement;
    if (bodyElement.querySelector('div.scorerrrrrrrrr')) return;

    var scoreElement = document.createElement('div');
    scoreElement.className = 'scorerrrrrrrrr';
    scoreElement.style.textAlign = 'center';
    scoreElement.style.marginBottom = '10px';
    scoreElement.style.padding = '5px';
    scoreElement.style.borderRadius = '10px';
    scoreElement.style.backgroundColor = '#FFA500';
    scoreElement.style.color = 'black';
    // Change font to something thicker
    scoreElement.style.fontWeight = 'bold';
    scoreElement.style.fontSize = '16px';
    scoreElement.innerText = 'Score: ' + mail.score.toFixed(2);
    bodyElement.insertBefore(scoreElement, bodyElement.firstChild);

    
};