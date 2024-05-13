let { sendMessage } = require('../../dist/scripts/ia.js');

let language = navigator.language || navigator.userLanguage

let prompts = {
    translate:`Translate everything i say to ${language}:\n`,
    summarize:`Summarize everything i say into topics and translate to ${language}:\n`
}

createMenuItem('translate')
createMenuItem('summarize')
/**
 * @Called at the start of the pageEvent
 * @Do Configure and create a context menu item to execute the action
 * @param {String} action the action to be executed [Has to be created in prompts]
 */
function createMenuItem(action) {
    action = `${action}`.toLowerCase()
    if (action in prompts) {
        var item = {
            'id': action,
            'title': `${action}`[0].toUpperCase() + `${action}`.slice(1),
            'contexts':['selection']
        }
        chrome.contextMenus.create(item)
    }
}

/**
 * @Called When a message is received of the IA
 * @Do Send the message to be alerted in the context.js
 * @param {String} message 
 */
function sendAlert(message) {
    chrome.tabs.query({active:true, currentWindow: true},function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,message)
    });
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    let text = clickData.selectionText

    if (clickData.menuItemId in prompts) {
        let prompt = (prompts[clickData.menuItemId]+text)
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