import browser from "webextension-polyfill";

window.onload = () => {
  window.setTimeout(() => {
    if (!document) throw new Error("No document");
    const container = document.head || document.documentElement;
    if (!container) throw new Error("No container element");
    const scriptEl = document.createElement("script") as HTMLScriptElement;
    scriptEl.src = browser.runtime.getURL("js/injected.js");
    container.appendChild(scriptEl);
    console.log("Loaded CodeBreaker mod!");
  }, 30000);
};
