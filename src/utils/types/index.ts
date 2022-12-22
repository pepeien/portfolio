/**
 * @description A method that return a React component.
 */
export type ComponentGetter = () => React.ReactNode;

/**
 * @description A common prop that both accepts a standalone React component
 * or a method that must be run in other to retrieve a React component.
 */
export type ComponentAsProp = React.ReactNode | ComponentGetter;

/**
 * @description A Three.JS Object hover handler callback.
 */
export type ObjectHoverCallBack = (hoverEvent: MouseEvent, hoverIntersection: THREE.Intersection[]) => void;
