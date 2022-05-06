import type { UserStats, Vue } from "./types";
import CheatEngine from "./cheatEngine";
import { AxiosResponse } from "axios";

const initWallpapers = [{
  "name": "Default",
  "value": "default"
},
{
  "name": "Coder Blue",
  "value": "coder-blue",
  "image": "https://cdn.btc2.tech/v0/images/bg/coder-blue.jpg"
},
{
  "name": "Superhero Fan",
  "value": "superhero",
  "image": "https://cdn.btc2.tech/v0/images/bg/superhero-fan.jpg"
},
{
  "name": "GitHub - Octocat",
  "value": "octocat",
  "image": "https://cdn.btc2.tech/partners/octocat.png"
},
{
  "name": "DEV.to wallpaper",
  "value": "sloan",
  "image": "https://cdn.btc2.tech/partners/DEVto.png"
},
{
  "name": "Digital Ocean - Sammy the Shark",
  "value": "sammy",
  "image": "https://cdn.btc2.tech/partners/sammy.png"
},
{
  "name": "MLH wallpaper",
  "value": "learnbuildshare",
  "image": "https://cdn.btc2.tech/partners/MLH.png"
},
{
  "name": "HackerNoon wallpaper",
  "value": "hackedthenoon",
  "image": "https://cdn.btc2.tech/partners/HackerNoon.png"
},
{
  "name": "Namecheap wallpaper",
  "value": "i<3nc",
  "image": "https://cdn.btc2.tech/partners/Namecheap.png"
},
{
  "name": "Horza wallpaper",
  "value": "forizonfever<3",
  "image": "https://cdn.btc2.tech/extras/Forizon-8da3a52336a2.jpg"
},
{
  "name": "Clumsy wallpaper",
  "value": "birdman<batman",
  "image": "https://cdn.btc2.tech/extras/Clumsy-640769e354e6.png"
},
{
  "name": "Prince wallpaper",
  "value": "thesilentkiller",
  "image": "https://cdn.btc2.tech/extras/Prince-10e17e297014.png"
}];
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
  });

  cheatEngine.interceptReq("/update/settings", (req) => {
    window.localStorage.setItem("overwriteWallpaper", JSON.stringify(req.data.settings.wallpapers.selected));
    if (!initWallpapers.includes(req.data.settings.wallpapers.selected)) {
      req.data.settings.wallpapers.selected = initWallpapers[0];
    }
    return req;
  });

  cheatEngine.interceptReq("/runhacx", (req) => {
    if (req.data.code.toLowerCase().trim().replace(" ", "") === "bindsomepaperstogether") {
      cheatEngine.vue.$store.state.settings.wallpapers.init.push({
        name: "Clippy",
        value: "bindsomepaperstogether",
        image: "https://www.microsoft.com/en-us/microsoft-365/blog/uploads/prod/sites/2/2021/06/Msft_Nostalgia_Clippy.jpg",
      });
      alert("Unlocked the CodeBreaker secret wallpaper.");
      cheatEngine.vue.$store.dispatch("removeFromWindowDock", "runhacx");
      throw new Error("Not an actual error, cheat code intercepted!");
    }
    return req;
  });

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
  const newWallpaper = window.localStorage.getItem("overwriteWallpaper");
  if (newWallpaper) {
    cheatEngine.vue.$store.state.settings.wallpapers.selected = JSON.parse(newWallpaper);
  }
});
