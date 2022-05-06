import browser from "webextension-polyfill";

window.onload = () => {
  if (!document) throw new Error("No document");
  const container = document.head || document.documentElement;
  if (!container) throw new Error("No container element");
  const scriptEl = document.createElement("script");
  scriptEl.src = browser.runtime.getURL("js/injected.js");
  container.appendChild(scriptEl);
  const scriptEl2 = document.createElement("script");
  scriptEl2.src = browser.runtime.getURL("hackedFlowers.js");
  container.appendChild(scriptEl2);
  const inputEl = document.createElement("input");
  inputEl.value = browser.runtime.getURL("xp.css");
  inputEl.type = "hidden";
  inputEl.id = "break-the-code-xp-css";
  container.appendChild(inputEl);
};
