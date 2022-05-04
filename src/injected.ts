import type { Vue } from "./types";
import CheatEngine from "./cheatEngine";

const app = Array.from(document.querySelectorAll("*")).find(
  // @ts-expect-error
  (e) => e.__vue__
) as HTMLDivElement & {
  __vue__: Vue;
};

const vue = app.__vue__ as Vue;

const cheatEngine = new CheatEngine(vue);

// @ts-expect-error
window.breakTheCodeCheatEngine = cheatEngine;

// Notify the user of the game modification
cheatEngine.startBlackScreen("Your game has been modified by the CodeBreaker browser extension. Please let the CodeBreaker team know if you experience any issues because of this. Thanks!");

// Fixes oversights by the dev team
cheatEngine.addDrive4ToMainUi();

// Adds new content
cheatEngine.enableFlowers();
cheatEngine.enableBonusFolder();
