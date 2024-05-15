let { sendMessage } = require('../../dist/scripts/ia.js');

let content = {
    textarea:document.querySelector("textarea#text"),
    submit  :document.querySelector("input#submit")
}

/**
 * @Called When the submit button is pressed
 * @Do get the text, send to gemini ai, and activate the alert
 */
content.submit.addEventListener("click",sendText)
function sendText() {
    let prompt = content.textarea.value
    console.log(prompt)
    sendMessage(prompt)
    .then(response => {
        console.log(response);
        sendAlert(response)
    })
    .catch(error => {
        console.error(error);
        sendAlert(error)
    });
}

/**
 * @Called When a message i sent by the gemini ai
 * @Do send the message to the content.js to be alerted
 * @param {String} message 
 */
function sendAlert(message) {
    chrome.tabs.query({active:true, currentWindow: true},function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,message)
    });
}

/**
 * @Called When the user change the textarea
 * @Do Change the height based on its rows and the width based on
 * the length of the largest string
 */
content.textarea.addEventListener("input",checkTextAreaSize)
function checkTextAreaSize() {
    let text = content.textarea.value
    content.textarea.rows = text.split('\n').length+1

    let m = 0
    for (i of text.split('\n')) {
        m = Math.max(i.length,m)
    }
    content.textarea.style.width = `${m/1.5}em`

}