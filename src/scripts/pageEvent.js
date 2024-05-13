let { sendMessage } = require('../../dist/scripts/ia.js');

let language = navigator.language || navigator.userLanguage

let prompts = {
    translate:`Translate everything i say to ${language}:\n`,
    summarize:`Summarize everything i say into topics and translate to ${language}:\n`
}


var contextMenuItem_translate = {
    "id": "translate",
    "title": `Translate to ${language}`,
    "contexts": ["selection"]
}
var contextMenuItem_summarize = {
    "id": "summarize",
    "title": `Summarize to ${language} `,
    "contexts": ["selection"]
}

//chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create(contextMenuItem_translate);
    chrome.contextMenus.create(contextMenuItem_summarize);
//});

function sendAlert(message) {
    chrome.tabs.query({active:true, currentWindow: true},function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,message)
    });
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    
    console.log(clickData)

    let text = clickData.selectionText

    if (clickData.menuItemId in prompts) {
        let prompt = (prompts[clickData.menuItemId]+text)
        console.log(prompts[clickData.menuItemId])
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
})