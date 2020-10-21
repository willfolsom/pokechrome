export function getCurrentTab(callback: any) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },
    (tabs) => {
        callback(tabs[0]);
    });
}
