"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * useIsomorphicLayoutEffect is a useLayoutEffect that does not show warning when server-side rendering.
 * Conditionally renders useEffect on server side where it's execution is skipped,
 * and useLayoutEffect while on client for a synchronous effect which run after browser paints.
 *
 * Reference - https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * Reference - https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */
var isWindow = typeof window !== "undefined";
var useIsomorphicLayoutEffect = isWindow ? _react.useLayoutEffect : _react.useEffect;
/**
 *
 * @param ref - reference of the element of which dimensions are needed
 * @param cb - a callback function to be executed when a window is resized
 * @returns [number, number]
 *
 */

var useElementResize = function useElementResize(ref, cb) {
  var _useState = (0, _react.useState)([undefined, undefined]),
      _useState2 = _slicedToArray(_useState, 2),
      dimension = _useState2[0],
      setDimension = _useState2[1];

  var refHandler = (0, _react.useRef)();
  useIsomorphicLayoutEffect(function () {
    refHandler.current = ref && ref.current || isWindow && window;

    if (refHandler.current) {
      var setWindowDimensions = function setWindowDimensions() {
        return setDimension([refHandler.current.clientHeight || refHandler.current.innerHeight, refHandler.current.clientWidth || refHandler.current.innerWidth]);
      };

      setWindowDimensions();

      var windowResizeHandler = function windowResizeHandler() {
        setWindowDimensions();

        if (cb) {
          if (typeof cb === "function") {
            cb();
          } else {
            console.error("Callback passed to useElementResize hook is not of type function");
          }
        }
      };

      window.addEventListener("resize", windowResizeHandler);
      return function () {
        return window.removeEventListener("resize", windowResizeHandler);
      };
    }
  }, [ref]);
  return dimension;
};

var _default = useElementResize;
exports.default = _default;