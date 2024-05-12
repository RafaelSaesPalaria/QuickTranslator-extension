let { sendMessage } = require('../../dist/scripts/ia.js');

let content = {
    textarea:document.querySelector("textarea#text"),
    submit  :document.querySelector("input#submit")
}

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

function sendAlert(message) {
    chrome.tabs.query({active:true, currentWindow: true},function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,message)
    });
}

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