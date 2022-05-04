import type __Vue from "vue";
import type { Store } from "vuex";
import { Axios } from "axios";

export type Game = {
  name: string
  slug: string
  id: string
  info: string
  status: string
  connection?: {
    address: string
    port: string
  };
  win?: {
    clippy:string | string[];
    success: string;
    neo?: string;
    choice?: string;
    message?: string;
    image?: string;
  }
  brief?: string;
  random?: string[];
  achievement?: {
    code: string;
    title: string;
  }
  server?: {
    monitors: string[][];
    export_monitors: string | false;
    load_balancer: {
      servers: number;
      requests: number;
    }
    app_server: {
      downtime: number;
      trouble: number;
      /** Typo in the game, not mine */
      maintence: number;
      critical: number;
    }
    db_server: {
      downtime: number;
      trouble: number;
      /** Typo in the game, not mine */
      maintence: number;
      critical: number;
    }
    process_count: number;
    server_log: {
      top: string[];
      content?: string;
    },
    app_log: {
      top: string[];
      content?: string;
    },
    load_avg: number;
  }
  fifty?: {
    message: string;
    exclaim: string;
    clippy: string;
  }
  server_processes?: string;
}

export type Wallpaper = {
  name: string;
  value: string;
  /** Defined for all except the default one */
  image?: string;
};

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
    dynamic?: boolean;
    icon: string;
    name: string;
    slug: string;
    type: string;
    back?: string | false;
    grid?: string[];
    path?: string;
    data?: unknown;
    application?: boolean;
    url?: string;
    game?: boolean;
    comms?: string;
  }>;
  user: {
    email: string;
    name: string;
    username: string;
    clock: {
      date: string;
      time: string;
    }
  };
  imageCDN: string;
  deviceWidth: number;
  referral?: {
    points: number;
    url: string;
  };
  update: boolean;
  settings: {
    "hidden-files": boolean;
    "file-extensions": boolean;
    "show-option": boolean;
    wallpapers: {
      selected: Wallpaper;
      init: Wallpaper[];
    };
    screensavers: {
      selected: Wallpaper;
      init: Wallpaper[];
    };
  };
  help: string;
  games: Game[];
  share: {
    id: string;
    attr_int: string;
    title: string;
    stat: string;
    desc: string;
    type: string;
  };
  clippy: {
    lock: boolean;
    queue: string[];
  },
  clippyRandom: boolean;
  startMenu: {
    programs: string[];
    documents: string[];
  };
  activeProgram: {
    current: string | null;
    prev: string | null;
  },
  windowZIndex: number;
  windowDock: Array<
    {
      slug: string;
      open: boolean;
      active: boolean;
    }
  >;
  idleVue: {
    isIdle: boolean;
  }
};

export type _Vue = Omit<__Vue, "$store"> & {
    $store: Store<GameStore>;
    $axios: Axios;
  };
