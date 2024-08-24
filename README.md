# PhishNet

## Overview
**PhishNet** is a Firefox extension designed to enhance your Gmail security by assigning a safety score to each email in your inbox. It helps users identify potentially malicious or phishing emails by analyzing the content and providing real-time notifications about suspicious elements.

## How It Works
PhishNet analyzes several key aspects of each email to determine its safety:
- **Sender's Email**: Examines the sender's email address to check for suspicious or unfamiliar domains.
- **Sender's Name**: Compares the sender's name with the email address to detect discrepancies.
- **Subject Line**: Analyzes the subject line for common phishing keywords or patterns.
- **Attachments**: Scans attachments for potentially harmful files or unusual file types.
- **Email Body**: Reviews the content of the email body, including links and text, to identify phishing tactics.

PhishNet applies a series of rules to each of these elements, with each rule contributing to an overall score. The individual rule scores are multiplied together to produce a final score between 0 (dangerous) and 1 (safe).

## Features
- **Safety Scoring**: Each email is given a score based on the analysis of the sender's email, sender's name, subject, attachments, and email body.
- **Real-Time Analysis**: The extension examines emails as you browse your inbox and displays the score directly within the Gmail interface.
- **Suspicious Content Alerts**: Receive notifications when an email exhibits signs of phishing, such as mismatched URLs or suspicious sender information.
- **Detailed Explanations**: Understand why an email was flagged with detailed breakdowns of potential threats.

## Installation
1. Clone or download this repository to your local machine.
    ```bash
    git clone https://github.com/jensvh/phishnet.git
    ```
2. Open Firefox and navigate to `about:debugging`.
3. Click on **This Firefox** and then on **Load Temporary Add-on**.
4. Select the `manifest.json` file from the downloaded repository.
5. The extension should now be active in your browser.

## Usage
1. **Score Display**: As you open your Gmail, you will notice a score displayed next to each email in your inbox.
2. **Email Analysis**: When you open an email, the extension will display a score and provide additional information if any suspicious content is detected.
3. **Notifications**: You will receive a notification if the email contains potential phishing elements, explaining the reasoning behind the score.

## Future Enhancements
- **Cross-Browser Support**: Expand support to Chrome.
- **Whitelist/Blacklist Feature**: Add the ability to whitelist and blacklist specific emails.
- **Creation of a UI**: Develop a more robust user interface that allows users to interact with the extension more easily. This could include dashboards, detailed analysis views, and custom settings pages.
- **Support for Outlook**: Expand PhishNet to support Outlook, allowing users of this popular email client to benefit from phishing detection.