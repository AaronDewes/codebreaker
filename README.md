# CodeBreaker

An open source browser extension for modifying Season 2 of BreakTheCode. This includes raw access to the vuex store, as well as a lot of convenience helper functions. It also includes type definitions.

It fixes a few bugs/oversights, enables unused/hidden content, and will probably even add some new codes in the future.

### Components

- Content script (`src/content_script.ts`): Injects CodeBreaker and FlowerHacker
- CodeBreaker (`src/injected.ts`): The main code of this mod, hooks into the existing Vue app.
- FlowerHacker (`public/hackedFlowers.js`): Replaces the unused Flowers game with a patched version to give us access to some more webpack resources.

### Project goal

This project tries to build a usable API to modify various parts of BreakTheCode 2. It can be used to give players hints if they are stuck, fix bugs in the game, and later allow adding custom drives and custom games.


### Possible ideas

- Drive 5?
- More cheat codes? (=> More backgrounds/screensavers/games)
- Theme chooser (Windows 98/XP/7)?
- Option to prevent "Server Defense" during drive 4 by validating code client-side
- Allow showing care board for server control in-game?
- Unlock hints without hint points?

