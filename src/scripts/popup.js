let { sendMessage } = require('../../dist/scripts/ia.js');

let content = {
    textarea:document.querySelector("textarea#text"),
    submit  :document.querySelector("input#submit")
}

content.submit.addEventListener("click",sendText)
function sendText() {
    let prompt = content.textarea.value
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