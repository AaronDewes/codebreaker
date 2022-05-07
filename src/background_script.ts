import browser from "webextension-polyfill";

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        let shouldCancel = false;
        const initiator = details.initiator || details.documentUrl;
        if(initiator?.includes("breakthecode.tech")) {
            shouldCancel = details.url.includes("analytics") || details.url.includes("facebook") || details.url.includes("piwik");
        }
        return { cancel: shouldCancel };
    },
    {
        urls: [
            "<all_urls>",
        ]
    },
    ["blocking"]
)
