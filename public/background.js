chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, function(tab){
        chrome.runtime.sendMessage({salutations: tab.url});
    });
});
