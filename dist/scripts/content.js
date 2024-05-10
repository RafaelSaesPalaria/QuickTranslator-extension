console.log('hi')
chrome.runtime.onMessage.addListener(function name(message) {
    window.alert(message)
})