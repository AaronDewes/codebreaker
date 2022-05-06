import { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Vue, GameStore } from "./types";

const originalHelp = "Available Commands:<br>\n\t\t\t\t\t&nbsp;hello<br>\n\t\t\t\t\t&nbsp;norris<br>\n\t\t\t\t\t&nbsp;timenet [address] [port]<br>\n\t\t\t\t\t&nbsp;ping [address]<br>\n\t\t\t\t\t&nbsp;reverse [text]<br>\n\t\t\t\t\t&nbsp;clippy<br>\n\t\t\t\t\t&nbsp;gh repo clone [repopath]<br>\n\t\t\t\t\t&nbsp;octoclippy<br>\n\t\t\t\t\t&nbsp;install [plugin]<br>\n\t\t\t\t\t&nbsp;clear<br>\n\t\t\t\t";

export default class CheatEngine {
  #interceptors: {
    requests: Record<string, Array<(req: AxiosRequestConfig<any>) => AxiosRequestConfig<any>>>;
    response: Record<string, Array<(res: AxiosResponse<any>) => AxiosResponse<any>>>;
  }

  constructor(public vue: Vue) {
    // @ts-expect-error
    if (window.breakTheCodeCheatEngineEnabled) throw new Error("Already set up!");
    // Init Axios interceptors
    this.vue.$axios.interceptors.request.use((req) => {
      if (this.#interceptors.requests[req.url as string]?.length > 0) {
        for (const interceptor of this.#interceptors.requests[req.url as string]) {
          req = interceptor(req);
        }
      }
      return req;
    });
    this.vue.$axios.interceptors.response.use((res) => {
      if (this.#interceptors.response[res.config.url as string]?.length > 0) {
        for (const interceptor of this.#interceptors.response[res.config.url as string]) {
          res = interceptor(res);
        }
      }
      return res;
    });
    this.#interceptors = {
      requests: {},
      response: {},
    };

    const observer = new MutationObserver(() => {
      this.#terminalHook();
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true
    });

    // @ts-expect-error
    window.breakTheCodeCheatEngineEnabled = true;
  };

  /**
   * Make clippy say something immediately
   * 
   * To add something to the queue instead, use {@link clippyQueue}
   * @param text The text Clippy should say
   */
  clippySpeak(text: string) {
    this.stopCurrentClippyAction();
    this.vue.$root.$emit("clippy-speak", text);
  }

  /**
   * Make a URL from the real web accessible in the in-game browser
   * @param inGameUrl The URL in-game, has to start with www.
   * @param realUrl The real URL of the page
   */
  addWebPage(inGameUrl: string, realUrl: string) {
    this.vue.$store.state.dns.push({
      file: realUrl,
      url: inGameUrl,
    });
  }

  /**
   * Creates a new /bonus files
   */
  enableBonusFolder() {
    this.vue.$store.state.systemWindows.push({
      "name": "Modded content",
      "slug": "modded-content",
      "icon": "icons/game.png",
      "type": "window",
      "path": "/bonus/",
      "back": "my-computer",
      "grid": [
        "flowers"
      ]
    });
    this.findPath("/")?.grid?.push("modded-content");
  }

  /**
   * Enables the unused "Flowers" window from BTC1 as systemWindow
   */
  enableFlowers() {
    this.vue.$store.state.systemWindows.push({
      component: "Flowers.vue",
      dynamic: true,
      name: "Flowers.svg",
      slug: "flowers",
      type: "flowers",
      icon: "icons/file-types/image.png"
    });
  }

  /**
   * This stops the current clippy action.
   */
  stopCurrentClippyAction() {
    this.vue.$root.$emit("clippy-killswitch");
  }

  /**
   * This removes clippy completely. You can't add him back after this.
   */
  removeClippy() {
    this.vue.$root.$emit("clippy-destroy");
  }

  setTime(time: string) {
    this.vue.$store.state.user.clock.time = time;
  }

  #easterEgg() {
    console.log("You found the XP theme hidden within CodeBreaker!");
    const cssUrl = (document.querySelector("#break-the-code-xp-css") as HTMLInputElement).value;
    (Array.from(document.querySelectorAll("link")).find(elem => elem.type === "text/css" && elem.href.endsWith("98.css")) as HTMLLinkElement).href = cssUrl;
  }

  setDate(day: number, month: number, year: number) {
    if ((year === 2003 && month > 10 && day > 20) || year > 2003)
      this.#easterEgg();
    this.vue.$store.state.user.clock.date = `${day}-${month}-${year}`;
  }

  /**
    * Shows a system update as available. Enables the start menu update button (which just reloads the page) and makes Clippy inform the player.
    */
  makeUpdateAvailable() {
    this.vue.$store.dispatch("systemUpdateAvailable");
  }

  /**
   * Prevents the player from moving Clippy
   */
  lockClippy() {
    this.vue.$store.dispatch("lockClippy");
  }

  /**
   * Allows the player to move Clippy again
   */
  unlockClippy() {
    this.vue.$store.dispatch("unlockClippy");
  }

  /**
   * Queue message so clippy will say it next
   * 
   * To make Clippy say something without delay instead, use {@link clippySpeak}
   * @param text The text Clippy should say
   */
  clippyQueue(text: string) {
    this.vue.$store.dispatch("queueClippy", text);
  }

  /**
   * Remove the first message from the Clippy queue
   */
  clippyUnqueue(text: string) {
    this.vue.$store.dispatch("unqueueClippy");
  }

  /**
   * Make Clippy say random hints from the current game clippy list
   */
  clippySetRandom() {
    this.vue.$store.dispatch("setClippyRandom");
  }
  /**
   * Make Clippy stop saying random hints from the current game clippy list
   */
  clippyUnsetRandom() {
    this.vue.$store.dispatch("unsetClippyRandom");
  }

  /**
   * Shows an "Incoming Transmission From DotGang" screen
   * @param text The text to display
   * @param staticScreen If true, the "Typewriter" effect is disabled
   */
  startBlackScreen(text: string, staticScreen: boolean = false) {
    if (staticScreen) {
      this.vue.$store.dispatch("updateBlackScreen", text);
    } else {
      this.vue.$store.dispatch("initBlackScreen");
      this.vue.$store.state.blackScreen.val = text;
    }
  }

  /**
   * Add drive 4 to the "My Computer" view, which the original devs probably forgot
   */
  addDrive4ToMainUi() {
    const myComputer = this.findPath("/") as GameStore["systemWindows"][number];
    const g3Drive = myComputer.grid?.indexOf("g3-drive") || myComputer.grid?.length || 0;
    myComputer.grid?.splice(g3Drive + 1, 0, "g4-drive");
  }

  /**
   * Finds the file explorer window responsible for viewing a certain path
   */
  findPath(path: string) {
    return this.vue.$store.state.systemWindows.find((elem) => elem.path === path);
  }

  interceptReq(url: string, interceptor: (req: AxiosRequestConfig<any>) => AxiosRequestConfig<any>) {
    if (!this.#interceptors.requests[url]) this.#interceptors.requests[url] = [];
    this.#interceptors.requests[url].push(interceptor);
  }

  interceptRes(url: string, interceptor: (res: AxiosResponse<any>) => AxiosResponse<any>) {
    if (!this.#interceptors.response[url]) this.#interceptors.response[url] = [];
    this.#interceptors.response[url].push(interceptor);
  }

  #terminalCommandWrapper(input: string[], commandFunc: (args: string[]) => string | void): () => unknown {
    // @ts-expect-error
    const stdOut: (text: string) => unknown = window.webpackAccessHelper(2998).createStdout;
    return () => {
      return stdOut(commandFunc(input) || "");
    };
  }

  #injectedCommands: Record<string, {
    callback: (args: string[]) => string | void,
    helpText: string;
  }> = {};
  #terminal: Vue & {
    commands: Record<string, () => unknown>;
    stdin: string;
    isModded?: boolean;
  } | null = null;

  #modifyHelp() {
    if (!this.#terminal) throw new Error("Failed to get Terminal!");

    this.#terminal.commands["help"] = this.#terminalCommandWrapper([], (stdin) => {
      let helpAddition = `<br><br>
Added by CodeBreaker<br>
====================<br>`
      for (const command in this.#injectedCommands) {
        helpAddition += `&nbsp; ${command} ${this.#injectedCommands[command].helpText}<br>`
      }

      return originalHelp + helpAddition;
    });
  }

  #terminalHook() {
    // @ts-expect-error
    this.#terminal = document.querySelector(".vue-command")?.__vue__ as Vue & {
      commands: Record<string, () => unknown>;
      stdin: string;
      isModded?: boolean;
    };
    if (!this.#terminal || (this.#terminal.isModded)) return;

    this.#terminal.isModded = true;

    this.#modifyHelp();

    for (const command in this.#injectedCommands) {
      this.#terminal.commands[command] = () => {
        return this.#terminalCommandWrapper(
          this.#terminal?.stdin.substring(command.length + 1).split(" ") || [],
          this.#injectedCommands[command].callback
        )();
      }
    }
  }

  addCommand(name: string, helpText: string, callback: (args: string[]) => string | void) {
    if (this.#injectedCommands[name] || ["help", "ping", "timenet"].includes(name)) throw new Error("Command already defined!");
    this.#injectedCommands[name] = {
      helpText,
      callback
    };
    if (this.#terminal) {
      this.#terminal.commands[name] = () => {
        return this.#terminalCommandWrapper(
          this.#terminal?.stdin.trim().substring(name.length + 1).split(" ") || [],
          this.#injectedCommands[name].callback
        )();
      }

      this.#modifyHelp();
    }
  }
}
