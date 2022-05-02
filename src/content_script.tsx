import type __Vue from "vue";
import type { Store } from "vuex";

type GameStore = {
  assetsCDN: string;
  blackScreen: {
    solved: boolean;
    val: string | null;
  };
  dns: Array<
    | {
        file: string;
        url: string;
        game?: boolean;
      }
    | {
        redirect: string;
        url: string;
      }
  >;
  mineleaped: boolean;
  runhacx: {
    cloned: boolean;
    installed: boolean;
  };
};

function sleep(milliseconds: number) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
}

window.onload = async () => {
  type _Vue = __Vue & {
    $store: Store<GameStore>;
  };
  await sleep(30000);
  console.log(document.querySelectorAll("*"));
  // @ts-expect-error
  const Vue = Array.from(document.querySelectorAll("*")).find((e) => e.__vue__)
    // @ts-expect-error
    .__vue__ as _Vue;

  Vue.$root.$emit("clippy-speak", "CodeBreaker extension activated!");

  const $store = Vue.$store;

  // @ts-expect-error
  window.breakTheCode = {
    vue: Vue,
    isModded: true,
  };
};
