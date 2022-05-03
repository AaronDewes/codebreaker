import type { _Vue, GameStore } from "./types";

export default class CheatEngine {
  constructor(public vue: _Vue) { };

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

  setDate(date: string) {
    this.vue.$store.state.user.clock.date = date;
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
  clippySetRandom(text: string) {
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
   */
  startBlackScreen(text: string) {
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        this.vue.$store.dispatch("updateBlackScreen", text.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    typeWriter();
  }

  /**
   * Add drive 4 to the "My Computer" view, which the original devs probably forgot
   */
  addDrive4ToMainUi() {
    const myComputer = this.findPath("/") as GameStore["systemWindows"][number];
    const g3Drive = myComputer.grid?.indexOf("g3-drive") || myComputer.grid?.length || 0;
    myComputer.grid?.splice(g3Drive, 0, "g4-drive");
  }

  /**
   * Finds the file explorer window responsible for viewing a certain path
   */
  findPath(path: string) {
    return this.vue.$store.state.systemWindows.find((elem) => elem.path === path);
  }
}