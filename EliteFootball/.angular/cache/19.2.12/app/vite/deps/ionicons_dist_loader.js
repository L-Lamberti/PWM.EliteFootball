import {
  bootstrapLazy,
  setNonce
} from "./chunk-W34DMPSL.js";
import "./chunk-ZVATTXSA.js";

// node_modules/ionicons/dist/esm/polyfills/index.js
function applyPolyfills() {
  var promises = [];
  if (typeof window !== "undefined") {
    var win = window;
    if (!win.customElements || win.Element && (!win.Element.prototype.closest || !win.Element.prototype.matches || !win.Element.prototype.remove || !win.Element.prototype.getRootNode)) {
      promises.push(import(
        /* webpackChunkName: "polyfills-dom" */
        "./dom-IEA3LENK.js"
      ));
    }
    var checkIfURLIsSupported = function() {
      try {
        var u = new URL("b", "http://a");
        u.pathname = "c%20d";
        return u.href === "http://a/c%20d" && u.searchParams;
      } catch (e) {
        return false;
      }
    };
    if ("function" !== typeof Object.assign || !Object.entries || !Array.prototype.find || !Array.prototype.includes || !String.prototype.startsWith || !String.prototype.endsWith || win.NodeList && !win.NodeList.prototype.forEach || !win.fetch || !checkIfURLIsSupported() || typeof WeakMap == "undefined") {
      promises.push(import(
        /* webpackChunkName: "polyfills-core-js" */
        "./core-js-WD7EBID7.js"
      ));
    }
  }
  return Promise.all(promises);
}

// node_modules/ionicons/dist/esm-es5/loader.js
var defineCustomElements = function(e, n) {
  if (typeof window === "undefined") return void 0;
  return bootstrapLazy([["ion-icon", [[1, "ion-icon", {
    mode: [1025],
    color: [1],
    ios: [1],
    md: [1],
    flipRtl: [4, "flip-rtl"],
    name: [513],
    src: [1],
    icon: [8],
    size: [1],
    lazy: [4],
    sanitize: [4],
    svgContent: [32],
    isVisible: [32]
  }]]]], n);
};

// node_modules/ionicons/dist/loader/index.js
(function() {
  if ("undefined" !== typeof window && void 0 !== window.Reflect && void 0 !== window.customElements) {
    var a = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(a, [], this.constructor);
    };
    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
  }
})();
export {
  applyPolyfills,
  defineCustomElements,
  setNonce
};
//# sourceMappingURL=ionicons_dist_loader.js.map
