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


cheatEngine.clippySpeak("CodeBreaker extension activated!");

cheatEngine.addWebPage("www.example.com", "https://google.com")

cheatEngine.enableFlowers();

