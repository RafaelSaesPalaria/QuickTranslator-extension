let { sendMessage } = require('../../dist/scripts/ia.js');

let language = navigator.language || navigator.userLanguage
var contextMenuItem = {
    "id": "quickTranslator",
    "title": `Quick Translator - ${language}`,
    "contexts": ["selection"]
}
chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create(contextMenuItem);
});

function sendAlert(message) {
    chrome.tabs.query({active:true, currentWindow: true},function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,message)
    });
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    
    let text = clickData.selectionText

    let prompt = `Translate everything i say to ${language}:\n ${text}`
    sendMessage(prompt)
    .then(response => {
        console.log(response);
        sendAlert(response)
    })
    .catch(error => {
        console.error(error);
        sendAlert(error)
    });
})