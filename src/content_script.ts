import browser from "webextension-polyfill";

window.onload = () => {
  if (!document) throw new Error("No document");
  const container = document.head || document.documentElement;
  if (!container) throw new Error("No container element");
  const scriptEl = document.createElement("script") as HTMLScriptElement;
  scriptEl.src = browser.runtime.getURL("js/injected.js");
  container.appendChild(scriptEl);
  const scriptEl2 = document.createElement("script") as HTMLScriptElement;
  scriptEl2.src = browser.runtime.getURL("hackedFlowers.js");
  container.appendChild(scriptEl2);
};
