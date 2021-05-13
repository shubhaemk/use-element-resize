import { useState, useEffect, useRef, useLayoutEffect } from "react";

/**
 * useIsomorphicLayoutEffect is a useLayoutEffect that does not show warning when server-side rendering.
 * Conditionally renders useEffect on server side where it's execution is skipped,
 * and useLayoutEffect while on client for a synchronous effect which run after browser paints.
 *
 * Reference - https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * Reference - https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */

type DimensionType = [number | undefined, number | undefined];
type ResizeElementType = { current: HTMLElement & Window | null };

const isWindow = typeof window !== "undefined";

const useIsomorphicLayoutEffect = isWindow ? useLayoutEffect : useEffect;

/**
 * 
 * @param ref any
 * @param cb Function
 * @returns dimension [number | undefined, number | undefined]
 */

const useElementResize = (ref?: any, cb?: Function): DimensionType => {
  const [dimension, setDimension] = useState<DimensionType>([
    undefined,
    undefined,
  ]);

  const refHandler: ResizeElementType = useRef(null);

  useIsomorphicLayoutEffect(() => {
    refHandler.current = (ref && ref.current) || (isWindow && window);

    if (refHandler.current) {
      const setWindowDimensions = () =>
        setDimension([
          refHandler?.current?.clientHeight || (refHandler?.current?.innerHeight),
          refHandler?.current?.clientWidth || refHandler?.current?.innerWidth,
        ]);

      setWindowDimensions();

      const windowResizeHandler = () => {
        setWindowDimensions();
        if (cb) {
          if (typeof cb === "function") {
            cb();
          } else {
            console.error(
              `Callback passed to useElementResize hook is not of type function`
            );
          }
        }
      };

      window.addEventListener("resize", windowResizeHandler);

      return () => window.removeEventListener("resize", windowResizeHandler);
    }
  }, [ref]);

  return dimension;
};

export default useElementResize;
