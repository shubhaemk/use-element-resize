/**
 * useIsomorphicLayoutEffect is a useLayoutEffect that does not show warning when server-side rendering.
 * Conditionally renders useEffect on server side where it's execution is skipped,
 * and useLayoutEffect while on client for a synchronous effect which run after browser paints.
 *
 * Reference - https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * Reference - https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */
declare type DimensionType = [number | undefined, number | undefined];
/**
 *
 * @param ref any
 * @param cb Function
 * @returns dimension [number | undefined, number | undefined]
 */
declare const useElementResize: (ref?: any, cb?: Function | undefined) => DimensionType;
export default useElementResize;
