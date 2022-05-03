import type { _Vue } from "./types";
import CheatEngine from "./cheatEngine";

const app = Array.from(document.querySelectorAll("*")).find(
  // @ts-expect-error
  (e) => e.__vue__
) as HTMLDivElement & {
  __vue__: _Vue;
};

const Vue = app.__vue__ as _Vue;

const cheatEngine = new CheatEngine(Vue);

// @ts-expect-error
window.breakTheCodeCheatEngine = cheatEngine;

// Notify the user of the game modification
cheatEngine.clippyQueue("Your game has been modified by the CodeBreaker browser extension.");
cheatEngine.clippyQueue("Please let the CodeBreaker team know if you experience any issues.");

// Fixes oversights by the dev team
cheatEngine.addDrive4ToMainUi();

// Adds new content
cheatEngine.enableFlowers();
cheatEngine.enableBonusFolder();
cheatEngine.addWebPage("www.codebreaker.tech", "https://lab.lepture.com/github-cards/cards/default.html?user=AaronDewes&identity=ghcard-AaronDewes-3&repo=codebreaker&client_id=a11a1bda412d928fb39a&client_secret=92b7cf30bc42c49d589a10372c3f9ff3bb310037");
