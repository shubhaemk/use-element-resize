# use-element-resize

A small hook to check dimension of a DOM ELement or Window when a browser window is resized.

## Playground :running:

Coming Soon!

## Install :floppy_disk:

Using `npm`

```bash
$ npm install @shubhaemk/use-element-resize
```

Using `yarn`

```bash
$ yarn add @shubhaemk/use-element-resize
```

## Features :white_check_mark:

- Get Height and Width of a DOM Element when browser window is resized.
- Execute a function when browser window is resized. (Do not use it to set Height and Width of element in state, use useEffect hook instead till it gets option to be throttled)
- Server Side Rendering support. (Needs to be tested)
- Throttling of Callback function. (Comming Soon!)

## Usage :fire:

```js
const [height, width] = useElementResize(ref, callback);
```

- `height` (Default: undefined): Height of given Element reference or window in `px`, `undefined` till Element is completely painted.
- `width` (Default: undefined): Width if given Element reference or window in `px`, `undefined` till Element is completely painted.
- `ref` (Default: window): Ref of element to whose height and width are required after window resize.
- `callback`: Callback function to be executed after each window resize. (Throttling comming soon)

## Example :computer:

```jsx harmony
import { useRef } from "react";
import useElementResize from "use-element-resize";

const ElementSizeExample = () => {
  const ElementRef = useRef();

  // height and width of browser window
  const [windowHeight, windowWidth] = useElementResize();

  // height and width of browser window with execution of a callback
  const [windowHeightCallback, windowWidthCallback] = useElementResize(
    null,
    () => {
      console.log("Browser Window is getting resized");
    }
  );

  // height and width of DOM Element reffered by ElementRef
  const [elementHeight, elementWidth] = useElementResize(ElementRef);

  // height and width of DOM Element reffered by ElementRef with execution of a callback
  const [elementHeightCallback, elementWidthCallback] = useElementResize(
    ElementRef,
    () => {
      console.log("Element is getting resized");
    }
  );

  return <div style={{ width: "100%", height: "50px" }} ref={ElementRef}></div>;
};
```

## Features Comming soon :eyes:

- Throttling of callback function.
- TypeScript implementation

## Referrences :memo:

- [useWindowResize](https://github.com/beautifulinteractions/beautiful-react-hooks/blob/master/docs/useWindowResize.md)
- [useLayoutEffect for SSR](https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a)

[Like it? Give this repo a :star:](https://github.com/shubhaemk/use-element-resize)
