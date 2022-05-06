import type { UserStats, Vue } from "./types";
import CheatEngine from "./cheatEngine";
import { AxiosResponse } from "axios";

function findVue(i: number = 0) {
  return new Promise<Vue>((resolve, reject) => {
    if (i > 600) reject("Failed to find root vue");
    const app = Array.from(document.querySelectorAll("*")).find(
      // @ts-expect-error
      (e) => e.__vue__
    ) as HTMLDivElement & {
      __vue__: Vue;
    } | undefined;
    if (app) {
      resolve(app.__vue__);
    } else {
      setTimeout(() => {
        findVue(i + 1)
          .then(vue => resolve(vue));
      }, 100);
    }
  });
}

findVue().then((vue) => {
  const cheatEngine = new CheatEngine(vue);

  // @ts-expect-error
  window.breakTheCodeCheatEngine = cheatEngine;

  const isModded = window.localStorage.getItem("breakTheCodeCodeBreakerInstalled");

  // Notify the user of the game modification
  cheatEngine.startBlackScreen(`Your game has been modified by the CodeBreaker browser extension.
  Please let the CodeBreaker team know if you experience any issues because of this.
  We are not responsible if you get banned from BreakTheCode by using this extension.
  However, this extension will not work in season 3.
  We will start developing a version for season 3 after the competition ended.
  Thank you for using CodeBreaker!`, isModded === "true");

  window.localStorage.setItem("breakTheCodeCodeBreakerInstalled", "true");

  // Fixes oversights by the dev team
  cheatEngine.addDrive4ToMainUi();

  // Adds new content
  cheatEngine.enableFlowers();
  cheatEngine.enableBonusFolder();

  // Other stuff
  cheatEngine.interceptRes("/stats", (res: AxiosResponse<UserStats>) => {
    res.data.achievements.push({
      "id": "run",
      "stat": "Modded",
      "desc": "with CodeBreaker",
      "type": "egg",
      "attr_int": 1000000000,
      "title": "CodeBreaker"
    });
    return res;
  })

  // Open FlowerHacker
  cheatEngine.vue.$store.dispatch("addToWindowDock", "flowers");
  // Close FlowerHacker again, we just need it to load some webpack functions
  // The user probably on't notice this, the black screen should still be open at this point
  window.setTimeout(() => { 
    cheatEngine.vue.$store.dispatch("removeFromWindowDock", "flowers");
  }, 3000);

  cheatEngine.addCommand("clippySpeak", "Make clippy say something", (input) => {
    cheatEngine.clippySpeak(input.join(" "));
    return "";
  });
});
