"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var isWindow = typeof window !== "undefined";
var useIsomorphicLayoutEffect = isWindow ? react_1.useLayoutEffect : react_1.useEffect;
/**
 *
 * @param ref any
 * @param cb Function
 * @returns dimension [number | undefined, number | undefined]
 */
var useElementResize = function (ref, cb) {
    var _a = react_1.useState([
        undefined,
        undefined,
    ]), dimension = _a[0], setDimension = _a[1];
    var refHandler = react_1.useRef(null);
    useIsomorphicLayoutEffect(function () {
        refHandler.current = (ref && ref.current) || (isWindow && window);
        if (refHandler.current) {
            var setWindowDimensions_1 = function () {
                var _a, _b, _c, _d;
                return setDimension([
                    ((_a = refHandler === null || refHandler === void 0 ? void 0 : refHandler.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || ((_b = refHandler === null || refHandler === void 0 ? void 0 : refHandler.current) === null || _b === void 0 ? void 0 : _b.innerHeight),
                    ((_c = refHandler === null || refHandler === void 0 ? void 0 : refHandler.current) === null || _c === void 0 ? void 0 : _c.clientWidth) || ((_d = refHandler === null || refHandler === void 0 ? void 0 : refHandler.current) === null || _d === void 0 ? void 0 : _d.innerWidth),
                ]);
            };
            setWindowDimensions_1();
            var windowResizeHandler_1 = function () {
                setWindowDimensions_1();
                if (cb) {
                    if (typeof cb === "function") {
                        cb();
                    }
                    else {
                        console.error("Callback passed to useElementResize hook is not of type function");
                    }
                }
            };
            window.addEventListener("resize", windowResizeHandler_1);
            return function () { return window.removeEventListener("resize", windowResizeHandler_1); };
        }
    }, [ref]);
    return dimension;
};
exports.default = useElementResize;
