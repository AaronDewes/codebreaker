import type __Vue from "vue";
import type { Store } from "vuex";

export type GameStore = {
    assetsCDN: string;
    blackScreen: {
      solved: boolean;
      val: string | null;
    };
    desktop: string[];
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
    systemWindows: Array<{
        component?: string;
        dynamic: boolean;
        icon: string;
        name: string;
        slug: string;
        type: string;
    }>;
    user: {
      email: string;
      name: string;
      username: string;
      clock: {
        date: string;
        time: string;
      }
    }
  };
  
export type _Vue = __Vue & {
    $store: Store<GameStore>;
  };