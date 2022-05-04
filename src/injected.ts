import type { Vue } from "./types";
import CheatEngine from "./cheatEngine";

function findVue(i: number = 0) {
  return new Promise<Vue>((resolve, reject) => {
    if (i > 60) reject("Failed to find root vue");
    const app = Array.from(document.querySelectorAll("*")).find(
      // @ts-expect-error
      (e) => e.__vue__
    ) as HTMLDivElement & {
      __vue__: Vue;
    } | undefined;
    if (app) {
      resolve(app.__vue__);
    } else {
      setTimeout(async () => { resolve(await findVue(i + 1)) }, 1000);
    }
  });
}

findVue().then((vue) => {
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
});
