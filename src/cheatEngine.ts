import type { _Vue } from "./types";

export default class CheatEngine {
    constructor(public vue: _Vue) {};

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
     * Enables the unused "flowers" window
     */
    enableFlowers() {
        this.vue.$store.state.systemWindows.push({
            component: "Flowers.vue",
            dynamic: true,
            name: "Flowers",
            slug: "flowers",
            type: "flowers",
            icon: "icons/red-button.png"
        });
        this.vue.$store.state.desktop.push("flowers");
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
      this.vue.$store.dispatch("updateBlackScreen", text);
    }
}