# CodeBreaker

An open source browser extension for modifying Season 2 of BreakTheCode. This includes raw access to the vuex store, as well as a lot of convenience helper functions. It also includes type definitions.

It fixes a few bugs/oversights, enables unused/hidden content, and will probably even add some new codes in the future.

### Components

- Content script (`src/content_script.ts`): Injects CodeBreaker and FlowerHacker
- CodeBreaker (`src/injected.ts`): The main code of this mod, hooks into the existing Vue app.
- FlowerHacker (`public/hackedFlowers.js`): Replaces the unused Flowers game with a patched version to give us access to some more webpack resources.
