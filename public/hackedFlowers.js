window.webpackChunk.push([
  [355],
  {
    437: (t, i, e) => {
      e.d(i, { Z: () => s });
      var n = e(3645),
        a = e.n(n)()(function (t) {
          return t[1];
        });
      a.push([
        t.id,
        ".window-wrapper[data-v-e9a940da] .handle{pointer-events:none!important}.game-flower[data-v-e9a940da]{height:100%;overflow:auto}.game-flower div[data-v-e9a940da]{align-items:center;display:flex;height:100%;justify-content:center;min-height:0}.game-flower img[data-v-e9a940da]{margin:auto;width:100%}",
        "",
      ]);
      const s = a;
    },
    1355: (t, i, e) => {
      window.webpackAccessHelper = e;
      e.r(i), e.d(i, { default: () => d });
      const n = {
        name: "Flowers",
        props: {
          name: { type: String, default: Date.now().toString() },
          icon: { type: String, default: "icons/game.png" },
          program: { type: Object, default: function () {} },
          active: { type: Boolean, default: !1 },
          width: { type: [Number, String], default: 500 },
          height: { type: [Number, String], default: 257.05 },
        },
        data: function () {
          return {
            zIndex: 1,
            isMaximized: !1,
            isMinimized: !1,
            initX: 0,
            initY: 0,
            initPosition: !1,
          };
        },
        computed: {
          deviceWidth: function () {
            return this.$store.state.deviceWidth;
          },
          initW: function () {
            return "auto" == this.width ? "auto" : parseInt(this.width);
          },
          initH: function () {
            return "auto" == this.height ? "auto" : parseInt(this.height);
          },
          windowLayerRef: function () {
            return "window-layer-".concat(this.convertToSlug(this.name));
          },
          windowRef: function () {
            return "window-".concat(this.convertToSlug(this.name));
          },
          windowComponent: function () {
            return this.deviceWidth < 992 ? "div" : "vue-draggable-resizable";
          },
        },
        watch: {
          deviceWidth: function () {
            this.setStartPosition();
          },
          active: function (t) {
            t && this.setZIndex();
          },
        },
        methods: {
          setStartPosition: function () {
            (this.initX = Math.max(
              0,
              Math.round(
                this.$refs[this.windowLayerRef].offsetWidth / 2 -
                  this.$refs[this.windowRef].offsetWidth / 2
              )
            )),
              (this.initY = Math.max(
                0,
                Math.round(
                  this.$refs[this.windowLayerRef].offsetHeight / 2 -
                    this.$refs[this.windowRef].offsetHeight / 2
                )
              )),
              this.deviceWidth < 992 && (this.isMaximized = !0),
              (this.initPosition = !0);
          },
          toggleActiveProgram: function () {
            this.$store.dispatch("hideProgramWindow", this.program.slug);
          },
          setZIndex: function () {
            (this.zIndex = this.$store.state.windowZIndex + 1),
              this.$store.dispatch("incrementWindowZIndex");
          },
          focusActiveProgram: function () {
            this.$store.dispatch(
              "activateProgramInWindowDock",
              this.program.slug
            );
          },
          closeActiveProgram: function () {
            this.$store.dispatch("removeFromWindowDock", this.program.slug);
          },
          toggleMaximize: function () {
            this.deviceWidth >= 992 &&
              ((this.isMaximized = !this.isMaximized),
              this.$root.$emit("toggle-maximized", this.isMaximized));
          },
        },
        activated: function () {
          this.active && this.setZIndex();
        },
        mounted: function () {
          var t = this;
          setTimeout(function () {
            t.setStartPosition();
          }, 100);
        },
      };
      var a = e(3379),
        s = e.n(a),
        o = e(437),
        r = { insert: "head", singleton: !1 };
      s()(o.Z, r);
      o.Z.locals;
      const d = (0, e(1900).Z)(
        n,
        function () {
          var t = this,
            i = t.$createElement,
            e = t._self._c || i;
          return e(
            "div",
            {
              ref: t.windowLayerRef,
              staticClass: "window-layer",
              class: { "window-layer--highlighted": t.program.active },
              style: { zIndex: t.zIndex },
            },
            [
              e(
                "div",
                {
                  staticClass: "window-wrapper",
                  class: {
                    "window-wrapper--visible": t.initPosition,
                    "window-wrapper--maximized": t.isMaximized,
                  },
                },
                [
                  e(
                    t.windowComponent,
                    {
                      tag: "component",
                      class: {
                        "responsive-draggable-resizable":
                          "div" == t.windowComponent,
                      },
                      attrs: {
                        w: t.initW,
                        h: t.initH,
                        y: t.initY,
                        x: t.initX,
                        "min-width": parseInt(t.width),
                        "min-height": 200,
                        parent: !0,
                        "drag-handle": ".title-bar",
                      },
                    },
                    [
                      e(
                        "div",
                        {
                          ref: t.windowRef,
                          staticClass: "window",
                          on: {
                            mousedown: function (i) {
                              return t.focusActiveProgram();
                            },
                          },
                        },
                        [
                          e("div", { staticClass: "title-bar" }, [
                            e("div", { staticClass: "title-bar-text" }, [
                              e("img", {
                                attrs: {
                                  src:
                                    t.$store.state.imageCDN +
                                    "images/" +
                                    t.icon,
                                },
                              }),
                              e("span", [t._v("Flowers")]),
                            ]),
                            t._v(" "),
                            e("div", { staticClass: "title-bar-controls" }, [
                              e("button", {
                                attrs: { "aria-label": "Minimize" },
                                on: {
                                  click: function (i) {
                                    return t.toggleActiveProgram();
                                  },
                                },
                              }),
                              t._v(" "),
                              e("button", {
                                attrs: { "aria-label": "Maximize" },
                                on: {
                                  click: function (i) {
                                    return t.toggleMaximize();
                                  },
                                },
                              }),
                              t._v(" "),
                              e("button", {
                                attrs: { "aria-label": "Close" },
                                on: {
                                  click: function (i) {
                                    return t.closeActiveProgram();
                                  },
                                },
                              }),
                            ]),
                          ]),
                          t._v(" "),
                          e("div", { staticClass: "window-body" }, [
                            e("div", { staticClass: "game-flower" }, [
                              e("div", [
                                e("img", {
                                  attrs: {
                                    src:
                                      t.$store.state.imageCDN +
                                      "games/flowers.svg",
                                    alt: "Flowers",
                                  },
                                }),
                              ]),
                            ]),
                          ]),
                        ]
                      ),
                    ]
                  ),
                ],
                1
              ),
            ]
          );
        },
        [],
        !1,
        null,
        "e9a940da",
        null
      ).exports;
    },
  },
]);
