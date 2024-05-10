

var contextMenuItem = {
    "id": "quickTranslator",
    "title": `Quick Translator`,
    "contexts": ["selection"]
}
chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create(contextMenuItem);
});

chrome.contextMenus.onClicked.addListener(function (clickData) {
    let language = navigator.language || navigator.userLanguage
    let text = clickData.selectionText

    let prompt = `Translate everything i say to ${language}:\n ${text}`
})